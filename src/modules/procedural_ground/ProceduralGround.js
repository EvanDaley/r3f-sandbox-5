import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import TileGrid from "./components/TileGrid";
import { startCameraLogger } from "../../utils/logCamera";
import SimpleLighting from "../../components/environment/SimpleLighting";
import OrthoZoomOnly from "../../components/controls/OrthoZoomOnly";

export default function ProceduralGround() {
  // const { camera } = useThree();

  // useEffect(() => {
  //   const stopLogging = startCameraLogger(camera, 1000);
  //   return stopLogging;
  // }, [camera]);

  return (
    <>
      <OrthoZoomOnly/>
      <SimpleLighting/>
      <TileGrid />


    </>
  );
}
