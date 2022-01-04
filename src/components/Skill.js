import React from "react";
import Rating from "react-rating";
import "./Skill.css";

function Skill(props) {
  // allow function to accept many values, maybe from a json
  // read skills from json? or from some kind of object
  const empty = <i className="fa-solid fa-star" style={{ color: "grey" }} />;

  const full = <i className="fa-solid fa-star" style={{ color: "gold" }} />;

  const ratingStyle = {
    position: "absolute",
    right: "0",
    transition: "all 0.3s linear",
  };

  return (
    <li>
      <p className="skill-name">{props.name}</p>
      <Rating
        readonly={true}
        initialRating={props.rating}
        emptySymbol={empty}
        fullSymbol={full}
        quiet={false}
        style={ratingStyle}
      />
      <p className="rating-num">{props.rating}</p>
    </li>
  );
}

export default Skill;
