import React from "react";

function InputOption({ Icon, title, color, feature, showModal }) {
  return (
    <>
      {feature ? (
        <div className="feed-option" onClick={feature}>
          <Icon className="feed-icon" style={{ color: color }} />
          <h3>{title}</h3>
        </div>
      ) : (
        <div className="feed-option">
          <Icon className="feed-icon" style={{ color: color }} />
          <h3>{title}</h3>
        </div>
      )}
    </>
  );
}

export default InputOption;
