// import usePeerConnection from '../hooks/usePeerConnection';
import useSceneStore from "../stores/sceneStore";

export default function SceneSwitcher() {
    // const { connections, isHost, handleSceneChange } = usePeerConnection();
    const { scenes, currentSceneId, setSceneId } = useSceneStore();

    // if (!isHost || Object.keys(connections).length === 0) {
    //     return null;
    // }

    // return null;

    return (
        <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'rgba(0, 100, 200, 0.9)',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            color: 'white',
            zIndex: 9999,
            pointerEvents: 'auto',
        }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                SCENE CONTROLS
            </div>
            <div style={{ marginBottom: '4px' }}>
                Current Scene: {currentSceneId}
            </div>
            <div>
                {scenes.map(scene => (
                    <button
                        key={scene.id}
                        onClick={() => {
                            return setSceneId(scene.id);
                        }}
                        style={{
                            margin: '2px',
                            padding: '4px 8px',
                            backgroundColor: currentSceneId === scene.id ? '#fff' : 'rgba(255,255,255,0.2)',
                            color: currentSceneId === scene.id ? '#000' : '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '10px'
                        }}
                    >
                        {scene.id}
                    </button>
                ))}
            </div>
        </div>
    );
}