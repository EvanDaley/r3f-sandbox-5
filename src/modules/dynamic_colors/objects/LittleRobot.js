import React, { forwardRef } from "react";
import PaletteModel from "./PaletteModel";

const LittleRobot = forwardRef(({ materials, ...props }, ref) => {
  // If PaletteModel is a custom mesh-like object that expects props but not a ref,
  // wrap it in a <group> that can safely receive a ref.
  return (
    <group ref={ref}>
      <PaletteModel
        file="palette_testing/littleRobot.glb"
        materials={materials}
        outline
        castShadow
        receiveShadow
        {...props}
      />
    </group>
  );
});

export default LittleRobot;
