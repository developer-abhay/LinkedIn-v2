import React from "react";

function InputOption({ Icon, title, color, feature }) {
  return (
    <button className="feed-option" onClick={feature}>
      <Icon className="feed-icon" style={{ color: color }} />
      <h3>{title}</h3>
    </button>
  );
}

export default InputOption;
