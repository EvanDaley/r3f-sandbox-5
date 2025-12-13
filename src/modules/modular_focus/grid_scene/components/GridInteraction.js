import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGridSceneStore, worldToGrid } from "../stores/gridSceneStore";

/**
 * GridInteraction
 * 
 * Handles clicking on the grid to place objects.
 * Creates an invisible plane at y=0 for raycasting.
 */
export default function GridInteraction() {
  const planeRef = useRef();
  const { camera, mouse } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const selectedObjectType = useGridSceneStore((s) => s.selectedObjectType);
  const deleteMode = useGridSceneStore((s) => s.deleteMode);
  const rotationMode = useGridSceneStore((s) => s.rotationMode);
  const selectionMode = useGridSceneStore((s) => s.selectionMode);
  const moveMode = useGridSceneStore((s) => s.moveMode);
  const previewRotation = useGridSceneStore((s) => s.previewRotation);
  const overwrite = useGridSceneStore((s) => s.overwrite);
  const setSelectedObjectType = useGridSceneStore((s) => s.setSelectedObjectType);
  const rotatePreview = useGridSceneStore((s) => s.rotatePreview);
  const addObject = useGridSceneStore((s) => s.addObject);
  const objects = useGridSceneStore((s) => s.objects);
  const removeObject = useGridSceneStore((s) => s.removeObject);
  const rotateObject = useGridSceneStore((s) => s.rotateObject);

  // Keyboard listener for 'r' key to rotate preview
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only handle 'r' key when an object type is selected
      if (event.key === 'r' || event.key === 'R') {
        if (selectedObjectType) {
          event.preventDefault();
          rotatePreview();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObjectType, rotatePreview]);

  const handlePointerDown = (event) => {
    // Don't interfere with selection mode or move mode
    if (selectionMode || moveMode) return;

    // Right-click (button 2) - unset the tool
    if (event.button === 2) {
      event.stopPropagation();
      setSelectedObjectType(null);
      return;
    }

    // Only handle left-click (button 0)
    // Ignore middle-click (button 1) for panning/rotating
    if (event.button !== 0) return;

    event.stopPropagation();

    // Update raycaster with current mouse position
    raycaster.current.setFromCamera(mouse, camera);

    // Raycast against the ground plane
    const intersects = raycaster.current.intersectObject(planeRef.current);
    
    if (intersects.length > 0) {
      const point = intersects[0].point;
      const { gridX, gridZ } = worldToGrid(point.x, point.z);
      
      // Delete mode - remove object at this grid position
      if (deleteMode) {
        // Find object at this grid position
        const objectAtPosition = Object.entries(objects).find(
          ([id, obj]) => obj.gridX === gridX && obj.gridZ === gridZ
        );
        
        if (objectAtPosition) {
          removeObject(objectAtPosition[0]);
        }
        return;
      }
      
      // Rotation mode - rotate object at this grid position by 90 degrees
      if (rotationMode) {
        // Find object at this grid position
        const objectAtPosition = Object.entries(objects).find(
          ([id, obj]) => obj.gridX === gridX && obj.gridZ === gridZ
        );
        
        if (objectAtPosition) {
          rotateObject(objectAtPosition[0]);
        }
        return;
      }
      
      // Placement mode - place object
      if (selectedObjectType) {
        // Check if there's already an object at this position
        const objectAtPosition = Object.entries(objects).find(
          ([id, obj]) => obj.gridX === gridX && obj.gridZ === gridZ
        );
        
        // If overwrite is enabled and there's an existing object, remove it first
        if (overwrite && objectAtPosition) {
          removeObject(objectAtPosition[0]);
        }
        
        // Only place if position is empty or overwrite is enabled
        if (!objectAtPosition || overwrite) {
          console.log(`Placing ${selectedObjectType} at:`);
          console.log(`  Grid coordinates: (${gridX}, ${gridZ})`);
          console.log(`  World coordinates: (${point.x.toFixed(2)}, ${point.y.toFixed(2)}, ${point.z.toFixed(2)})`);
          addObject(selectedObjectType, gridX, gridZ, previewRotation);
        }
      }
    }
  };

  return (
    <mesh
      ref={planeRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
    >
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}

