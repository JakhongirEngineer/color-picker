import React from "react";

function Footer({ paletteName, emoji }) {
  return (
    <footer className="Palette-footer">
      {paletteName}
      <span className="Palette-footer-emoji">{emoji}</span>
    </footer>
  );
}

export default Footer;
