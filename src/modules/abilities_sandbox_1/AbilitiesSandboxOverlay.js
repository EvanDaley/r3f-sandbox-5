import PlayerGuide from "../../components/overlays/PlayerGuide";

export default function AbilitiesSandboxOverlay() {
  return (
    <>
      <PlayerGuide
        lines={[
          <>When finished, use the <span style={{color: "#ffd166"}}>Scene Switcher</span> to pick another scene.</>,
        ]}
      />

    </>
  )
}
