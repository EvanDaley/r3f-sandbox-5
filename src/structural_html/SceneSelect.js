import useSceneStore from "../stores/sceneStore"
import usePeerConnection from "../modules/networking_focus/general_connection_tooling/hooks/usePeerConnection";

export default function SceneSelect() {
  const {
    scenes,
    currentSceneId,
  } = useSceneStore()

  const {handleSceneChange} = usePeerConnection();

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 100,
        background: "#222",
        padding: "6px 10px",
        borderRadius: "6px",
        boxShadow: "0 0 6px rgba(0,0,0,0.4)",
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <label>Scene:</label>
      <select
        value={currentSceneId}
        onChange={(e) => handleSceneChange(e.target.value)}
        style={{
          background: "#333",
          color: "#fff",
          border: "1px solid #555",
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
        }}
      >
        {scenes.map((scene) => (
          <option key={scene.id} value={scene.id}>
            {scene.name || scene.id}
          </option>
        ))}
      </select>
    </div>
  )
}
