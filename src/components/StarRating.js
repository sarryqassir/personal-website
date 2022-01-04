import React from "react";
import "./StarRating.css";

function StarRating() {
  // value
  // totalSymbols
  const totalSymbols = 5;
  const stars = Array(totalSymbols).fill(<i className="fa-solid fa-star" />);
  const containerStyle = {
    background: "#0000ff",
    overflow: "auto",
    position: "relative",
  };

  const bgStyle = { left: "0", top: "0", color: "aliceblue" };

  const mainStyle = {
    position: "absolute",
    width: "70%",
    left: "0",
    top: "0",
    overflow: "hidden",
    color: "gold",
    display: "inline-block",
  };

  return (
    <div className="big-container">
      <span className="star-container" style={containerStyle}>
        <span className="bg-star" style={bgStyle}>
          {stars}
        </span>
        <span className="main-star">
          <span style={mainStyle}>{stars}</span>
        </span>
      </span>
    </div>
  );
}

export default StarRating;
