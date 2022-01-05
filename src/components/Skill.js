import React from "react";
import Rating from "react-rating";
import "./Skill.css";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";

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
  // id like to achieve a transition like this https://www.cssscript.com/demo/animated-list-filtering-searching-search-filter/
  return (
    // pretty sure in is supposed to be only the ones i want a transition on?
    // the ones that will be filtered out/ hidden
    <CSSTransition key={uuidv4()} classNames="glom" in={true} timeout={200}>
      <li className={props.className}>
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
    </CSSTransition>
  );
}

export default Skill;
