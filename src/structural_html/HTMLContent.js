// HTMLContent.js
// Throw all the raw HTML content here. This is all rendered above the context of the canvas,
// so don't try to do anything fancy with Three.js.

// This is great for any kind of extra debugging screens (connect them with Zustand to read app data)
// or for any kind of game UI or menus that we want on fixed positions (HUDs, modals, etc) that we
// might need outside the 3D scene.

// import usePeerConnection from '../hooks/usePeerConnection';
import SceneSwitcher from './SceneSwitcher';

export default function HTMLContent() {
    // const { peerId } = usePeerConnection();

    return (
        <>
            {/* Peer ID Display */}
            {/*<div style={{*/}
            {/*    position: 'absolute',*/}
            {/*    top: 10,*/}
            {/*    right: 10,*/}
            {/*    backgroundColor: 'rgba(128, 128, 128, 0.2)',*/}
            {/*    padding: '4px 8px',*/}
            {/*    borderRadius: '4px',*/}
            {/*    fontSize: '10px',*/}
            {/*    color: '#666',*/}
            {/*    zIndex: 9999,*/}
            {/*    userSelect: 'text',*/}
            {/*    pointerEvents: 'auto',*/}
            {/*}}>*/}
            {/*    {peerId}*/}
            {/*</div>*/}

            <SceneSwitcher />

        </>
    )
}
