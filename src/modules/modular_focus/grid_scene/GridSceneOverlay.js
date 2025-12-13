import PlayerGuide from "../../../components/overlays/PlayerGuide";
import { useGridSceneStore } from "./stores/gridSceneStore";

export default function GridSceneOverlay() {
  const selectedObjectType = useGridSceneStore((s) => s.selectedObjectType);
  const setSelectedObjectType = useGridSceneStore((s) => s.setSelectedObjectType);
  const deleteMode = useGridSceneStore((s) => s.deleteMode);
  const setDeleteMode = useGridSceneStore((s) => s.setDeleteMode);
  const clearAll = useGridSceneStore((s) => s.clearAll);
  const serialize = useGridSceneStore((s) => s.serialize);

  const handleSelectType = (type) => {
    // Toggle selection: if already selected, deselect
    if (selectedObjectType === type) {
      setSelectedObjectType(null);
    } else {
      setSelectedObjectType(type);
    }
  };

  const handleToggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const handleSave = () => {
    const json = serialize();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid-scene.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all objects?')) {
      clearAll();
    }
  };

  const deserialize = useGridSceneStore((s) => s.deserialize);

  const handleLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            deserialize(event.target.result);
          } catch (error) {
            console.error('Failed to load scene:', error);
            alert('Failed to load scene. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <>
      <PlayerGuide
        lines={[
        //   <>This is a <span style={{color: "#06d6a0"}}>grid-based scene</span> for modular object placement</>,
        //   <>Objects in the <span style={{color: "#ffd166"}}>objects</span> folder are designed to fit on a grid</>,
        ]}
      />

      {/* Scene Builder Controls */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "15px",
          borderRadius: "8px",
          color: "white",
        }}
      >
        <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>
          Scene Builder
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "12px", opacity: 0.8 }}>Select object to place:</div>
          
          <button
            onClick={() => handleSelectType('desk')}
            style={{
              padding: "8px 16px",
              backgroundColor: selectedObjectType === 'desk' ? "#06d6a0" : "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: selectedObjectType === 'desk' ? "bold" : "normal",
            }}
          >
            {selectedObjectType === 'desk' ? '✓ Desk' : 'Desk'}
          </button>
          
          <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "5px", marginBottom: "3px" }}>
            Walls:
          </div>
          
          <button
            onClick={() => handleSelectType('wallX')}
            style={{
              padding: "8px 16px",
              backgroundColor: selectedObjectType === 'wallX' ? "#06d6a0" : "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: selectedObjectType === 'wallX' ? "bold" : "normal",
            }}
          >
            {selectedObjectType === 'wallX' ? '✓ Wall X' : 'Wall X'}
          </button>
          
          <button
            onClick={() => handleSelectType('wallZ')}
            style={{
              padding: "8px 16px",
              backgroundColor: selectedObjectType === 'wallZ' ? "#06d6a0" : "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: selectedObjectType === 'wallZ' ? "bold" : "normal",
            }}
          >
            {selectedObjectType === 'wallZ' ? '✓ Wall Z' : 'Wall Z'}
          </button>
          
          <button
            onClick={() => handleSelectType('cornerWall')}
            style={{
              padding: "8px 16px",
              backgroundColor: selectedObjectType === 'cornerWall' ? "#06d6a0" : "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: selectedObjectType === 'cornerWall' ? "bold" : "normal",
            }}
          >
            {selectedObjectType === 'cornerWall' ? '✓ Corner' : 'Corner'}
          </button>

          {selectedObjectType && (
            <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "5px" }}>
              Click on the grid to place
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", marginTop: "10px", paddingTop: "10px" }}>
          <button
            onClick={handleToggleDeleteMode}
            style={{
              padding: "8px 16px",
              backgroundColor: deleteMode ? "#ef476f" : "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
              fontWeight: deleteMode ? "bold" : "normal",
            }}
          >
            {deleteMode ? '✓ Delete Tool' : 'Delete Tool'}
          </button>
          
          {deleteMode && (
            <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "5px" }}>
              Click on objects to delete
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", marginTop: "10px", paddingTop: "10px" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ffd166",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Save Scene
          </button>
          
          <button
            onClick={handleLoad}
            style={{
              padding: "8px 16px",
              backgroundColor: "#118ab2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
              marginTop: "8px",
            }}
          >
            Load Scene
          </button>
          
          <button
            onClick={handleClear}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ef476f",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
              marginTop: "8px",
            }}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}

