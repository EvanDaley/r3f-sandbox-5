import PlayerGuide from "../../components/overlays/PlayerGuide";
import PaletteSelect from "../dynamic_colors/color_controls/PaletteSelect";

export default function ProceduralGroundOverlay() {
  return (
    <>
      <PlayerGuide
        lines={[
          <>The procedural ground is generated from perlin noise.</>,
          <>Use the <span style={{color: "#06d6a0"}}>Debug Controls</span> to switch between debug and terrain.</>,
          <>Then use the <span style={{color: "#ffd166"}}>Scene Switcher</span> to pick another scene.</>,
        ]}
      />

      {/*<div*/}
      {/*  style={{*/}
      {/*    position: "absolute",*/}
      {/*    top: 20,*/}
      {/*    right: 20,*/}
      {/*    zIndex: 100,*/}
      {/*    display: "flex",*/}
      {/*    flexDirection: "column",*/}
      {/*    gap: "10px",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <PaletteSelect/>*/}
      {/*</div>*/}
    </>
  )
}