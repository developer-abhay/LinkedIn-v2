import React from "react";
import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import { FiberManualRecord } from "@mui/icons-material";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets-article">
      <div className="widgets-article-left">
        <FiberManualRecord />
      </div>
      <div className="widgets-article-right">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widgets">
      <div className="widgets-header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle(
        "Top Salaries in WEB 3.0",
        "You will be shocked when you'll get to know"
      )}
      {newsArticle(
        "Google Just started recruiting",
        "Good news for college students"
      )}
      {newsArticle(
        "Google laid of 3000 employees",
        "Recession has made it worse"
      )}
    </div>
  );
}

export default Widgets;
