import React from "react";
import Rating from "react-rating";
// import { useSpring, animated } from "react-spring";
import "./Skill.css";

function Skill(props) {
  const empty = <i className="fa-solid fa-star" style={{ color: "grey" }} />;

  const full = <i className="fa-solid fa-star" style={{ color: "gold" }} />;

  const ratingStyle = {
    position: "absolute",
    right: "0",
  };

  return (
    <li className={props.className} key={props.data.key} style={props.style}>
      <span className="skill-name">{props.name}</span>
      <Rating
        className="star-rating"
        readonly={true}
        initialRating={props.rating}
        emptySymbol={empty}
        fullSymbol={full}
        quiet={false}
        style={ratingStyle}
      />
      <span className="num-rating">{props.rating}</span>
    </li>
  );
}

export default Skill;
