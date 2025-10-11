// HTMLContent.js
// Throw all the raw HTML content here. This is all rendered above the context of the canvas,
// so don't try to do anything fancy with Three.js.

// This is great for any kind of extra debugging screens (connect them with Zustand to read app data)
// or for any kind of game UI or menus that we want on fixed positions (HUDs, modals, etc) that we
// might need outside the 3D scene.

import SceneSelect from './SceneSelect';
import useSceneStore from "../stores/sceneStore";

export default function HTMLContent() {
    const getOverlay = useSceneStore(state => state.getCurrentOverlayComponent)
    const OverlayComponent = getOverlay()

    return (
        <>
            <SceneSelect />
            {OverlayComponent && <OverlayComponent />}
        </>
    )
}
