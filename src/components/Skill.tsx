import React from "react";
import Rating from "react-rating";
// import { useSpring, animated } from "react-spring";
import "./Skill.css";

function Skill(props: {
  className?: string;
  style?: React.CSSProperties;
  name: string;
  rating: number;
}) {
  const empty = <i className="fa-solid fa-star" style={{ color: "grey" }} />;

  const full = <i className="fa-solid fa-star" style={{ color: "gold" }} />;

  return (
    <li className={props.className} style={props.style}>
      <span className="skill-name">{props.name}</span>
      <div className="skill-rating">
        <Rating
          className="star-rating"
          readonly={true}
          initialRating={props.rating}
          emptySymbol={empty}
          fullSymbol={full}
          quiet={false}
        />
        <span className="num-rating">{props.rating}</span>
      </div>
    </li>
  );
}

export default Skill;
