
import EffectsV2 from "../../../components/effects/EffectsV2";
import SimpleLighting2 from "../../../components/environment/SimpleLighting2";
import TileGridV2 from "./components/TileGridV2";
import OrthoV2 from "../../../components/controls/OrthoV2";

export default function Forest1() {
    return (
        <>
            {/* <PerspectiveFollow targetRef={localPlayerRef} /> */}
            <SimpleLighting2 />
            <EffectsV2 />
            <TileGridV2 />
            <OrthoV2/>
        </>
    )
}