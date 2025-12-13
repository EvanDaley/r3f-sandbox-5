import React, { useRef } from "react";
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
  const addObject = useGridSceneStore((s) => s.addObject);
  const objects = useGridSceneStore((s) => s.objects);
  const removeObject = useGridSceneStore((s) => s.removeObject);

  const handlePointerDown = (event) => {
    // Only handle left-click (button 0)
    // Ignore middle-click (button 1) and right-click (button 2) for panning/rotating
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
      
      // Placement mode - place object
      if (selectedObjectType) {
        // Check if there's already an object at this position
        const objectAtPosition = Object.values(objects).find(
          (obj) => obj.gridX === gridX && obj.gridZ === gridZ
        );
        
        // Only place if position is empty
        if (!objectAtPosition) {
          addObject(selectedObjectType, gridX, gridZ, 0);
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

