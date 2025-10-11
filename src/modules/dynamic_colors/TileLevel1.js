import OrthoV2 from "../controls/OrthoV2";
import SimpleLighting from "../environment/SimpleLighting";

export default function TileLevel1() {
    console.log('here')
    return (
        <>
            {/*<color attach="background" args={['red']} />*/}

            <OrthoV2/>
            <SimpleLighting/>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="green" />
            </mesh>
        </>
    );
}
