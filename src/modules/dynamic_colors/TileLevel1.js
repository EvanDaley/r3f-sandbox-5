import OrthoV2 from "../controls/OrthoV2";
import SimpleLighting from "../environment/SimpleLighting";

export default function TileLevel1() {
    console.log('here')
    return (
        <>
            <color attach="background" args={['#181818']} />
            <OrthoV2/>
            <SimpleLighting
                directionalIntensity={3}
            />
            <mesh>
                <sphereGeometry args={[1, 10, 10]} />
                <meshToonMaterial  color="green" />
            </mesh>
        </>
    );
}
