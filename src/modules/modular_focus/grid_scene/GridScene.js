import React from "react";
import OrthoZoomOnly from "../../../components/controls/OrthoZoomOnly";
import SimpleLighting2 from "../../../components/environment/SimpleLighting2";
import EffectsV2 from "../../../components/effects/EffectsV2";
import { usePaletteStore } from "../../dynamic_colors/stores/paletteStore";
import { useGridSceneStore, gridToWorld } from "./stores/gridSceneStore";
import Desk1 from "../../dynamic_colors/objects/Desk1";
import Wall1 from "./objects/Wall1";
import WallX from "./objects/WallX";
import WallZ from "./objects/WallZ";
import CornerWall from "./objects/CornerWall";
import GridInteraction from "./components/GridInteraction";
import GridVisualization from "./components/GridVisualization";
import OrthoV2 from "../../../components/controls/OrthoV2";

export default function GridScene() {
  const activePalette = usePaletteStore((s) => s.activePalette);
  const objects = useGridSceneStore((s) => s.objects);

  return (
    <>
      <color attach="background" args={["#3c2828"]} />
      {/* <OrthoZoomOnly /> */}
      <OrthoV2/>
      <SimpleLighting2 />
      <EffectsV2 />
      
      {/* Visual grid helper */}
      <GridVisualization size={50} showGrid={true} />
      
      {/* Grid interaction layer for placing objects */}
      <GridInteraction />
      
      {/* Render all placed objects */}
      {Object.entries(objects).map(([id, obj]) => {
        const worldPos = gridToWorld(obj.gridX, obj.gridZ);
        
        if (obj.type === 'desk') {
          return (
            <Desk1
              key={id}
              materials={activePalette}
              position={[worldPos.x, worldPos.y, worldPos.z]}
              rotation={[0, obj.rotation || 0, 0]}
            />
          );
        } else if (obj.type === 'wall') {
          return (
            <Wall1
              key={id}
              materials={activePalette}
              position={[worldPos.x, worldPos.y, worldPos.z]}
              rotation={obj.rotation || 0}
            />
          );
        } else if (obj.type === 'wallX') {
          return (
            <WallX
              key={id}
              materials={activePalette}
              position={[worldPos.x, worldPos.y, worldPos.z]}
            />
          );
        } else if (obj.type === 'wallZ') {
          return (
            <WallZ
              key={id}
              materials={activePalette}
              position={[worldPos.x, worldPos.y, worldPos.z]}
            />
          );
        } else if (obj.type === 'cornerWall') {
          return (
            <CornerWall
              key={id}
              materials={activePalette}
              position={[worldPos.x, worldPos.y, worldPos.z]}
              rotation={obj.rotation || 0}
            />
          );
        }
        return null;
      })}
    </>
  );
}

