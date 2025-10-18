import create from "zustand"
import { createToonPalette } from "../utils/createToonPalette"

export const usePaletteStore = create((set, get) => {
    const palettes = {
        default: createToonPalette({
            p: "#ffffff",
            e: "#ff2222",
            s: "#ffaa33",
            t: "#009e9e",
            d: "#4e4848",
        }),
        night: createToonPalette({
            p: "#d1d1d1",
            e: "#ff0055",
            s: "#4455ff",
            t: "#22cccc",
            d: "#4e4848",
        }),
        desert: createToonPalette({
            p: "#f8e3a1",
            e: "#ff8822",
            s: "#d27b41",
            t: "#b4a47a",
            d: "#4e4848",
        }),
    }

    const activeKey = "default"

    return {
        palettes,
        activeKey,
        activePalette: palettes[activeKey], // ✅ initialize here
        setPalette: (key) => {
            if (!palettes[key]) {
                console.warn(`No palette named '${key}'`)
                return
            }
            set({
                activeKey: key,
                activePalette: palettes[key],
            })
        },
    }
})
