import OrthoZoomOnly from "../../../components/controls/OrthoZoomOnly";
import EffectsV2 from "../../../components/effects/EffectsV2";
import SimpleLighting2 from "../../../components/environment/SimpleLighting2";
import TileGrid from "../../procedural_ground/components/TileGrid";

export default function Forest1() {
    return (
        <>
            {/* <PerspectiveFollow targetRef={localPlayerRef} /> */}
            <SimpleLighting2 />
            <EffectsV2 />
            <TileGrid />
            <OrthoZoomOnly/>
        </>
    )
}