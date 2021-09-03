import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";

import "./ColorBox.css";

function ColorBox({
  backgroundColor,
  name,
  paletteId,
  colorId,
  showLink = true,
}) {
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  const isDark = chroma(backgroundColor).luminance() < 0.1;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={backgroundColor} onCopy={handleCopy}>
      <div className="ColorBox" style={{ backgroundColor }}>
        <div
          style={{ backgroundColor }}
          className={`copy-overlay ${copied && "copy-overlay-copied"}`}
        />
        <div className={`copy-msg ${copied && "copy-msg-copied"}`}>
          <h1 className={isDark ? "light-text" : "dark-text"}>Copied</h1>
          <p className={isDark ? "light-text" : "dark-text"}>
            {backgroundColor}
          </p>
        </div>

        <div className="copy-container">
          <div className="box-content">
            <span className={isDark && "light-text"}>{name}</span>
          </div>

          <button
            className={
              isDark ? "light-text copy-button" : "dark-text copy-button"
            }
          >
            {" "}
            {copied ? "Copied" : "Copy"}{" "}
          </button>
        </div>
        {showLink && (
          <span
            className={`${
              isDark ? "light-text see-more" : "see-more dark-text"
            }`}
            onClick={(e) => {
              history.push(`/palette/${paletteId}/${colorId}`);
              e.stopPropagation();
            }}
          >
            {" "}
            MORE{" "}
          </span>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
