import { Html } from "@react-three/drei"
import {usePaletteStore} from "../stores/paletteStore";

export default function PaletteControls() {
    const { palettes, activeKey, setPalette } = usePaletteStore((s) => ({
        palettes: s.palettes,
        activeKey: s.activeKey,
        setPalette: s.setPalette,
    }))

    const paletteKeys = Object.keys(palettes)

    return (
        <Html position={[0, 0, 0]} style={{ pointerEvents: "auto" }}>
            <div style={{
                position: "absolute",
                top: 20,
                left: 20,
                display: "flex",
                gap: "8px",
                zIndex: 10
            }}>
                {paletteKeys.map((key) => (
                    <button
                        key={key}
                        onClick={() => setPalette(key)}
                        style={{
                            padding: "4px 8px",
                            background: activeKey === key ? "#555" : "#222",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        {key}
                    </button>
                ))}
            </div>
        </Html>
    )
}
