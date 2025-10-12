import OrthoV2 from "../../components/controls/OrthoV2"
import SimpleLighting from "../../components/environment/SimpleLighting"

export default function ProceduralGround() {
    return (
        <>
            <color attach="background" args={["#181818"]} />
            <OrthoV2 />
            <SimpleLighting directionalIntensity={3} />
        </>
    )
}
