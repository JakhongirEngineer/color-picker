import React from "react";
import { useParams } from "react-router-dom";

function SingleColorPalette() {
  const { paletteId, colorId } = useParams();
  return (
    <div>
      SingleColorPalette paletteId: {paletteId}
      colorId: {colorId}
    </div>
  );
}

export default SingleColorPalette;
