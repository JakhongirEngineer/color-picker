import React, { useState } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useHistory } from "react-router-dom";

function ColorBox({ backgroundColor, name }) {
  const [copied, setCopied] = useState(false);
  const history = useHistory();

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
          <h1>Copied</h1>
          <p>{backgroundColor}</p>
        </div>

        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>

          <button className="copy-button">
            {" "}
            {copied ? "Copied" : "Copy"}{" "}
          </button>
        </div>
        <span
          className="see-more"
          onClick={(e) => {
            history.push("/");
            e.stopPropagation();
          }}
        >
          {" "}
          MORE{" "}
        </span>
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
