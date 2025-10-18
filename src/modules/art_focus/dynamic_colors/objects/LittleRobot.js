import React from "react"
import PaletteModel from "./PaletteModel"

export default function LittleRobot({ materials, ...props }) {
  return (
    <PaletteModel
      file="palette_testing/littleRobot.glb"
      materials={materials}
      outline
      castShadow
      receiveShadow
      {...props}
    />
  )
}
