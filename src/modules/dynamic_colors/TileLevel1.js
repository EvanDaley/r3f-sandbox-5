import OrthoV2 from "../controls/OrthoV2";
import SimpleLighting from "../environment/SimpleLighting";
import {MeshTransmissionMaterial} from "@react-three/drei";

export default function TileLevel1() {
    console.log('here')
    return (
        <>
            <color attach="background" args={['#181818']} />

            <OrthoV2/>
            <SimpleLighting/>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                < color="green" />
            </mesh>
        </>
    );
}
