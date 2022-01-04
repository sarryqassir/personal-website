import React from "react";
import Skill from "./Skill";
import "./Skills.css";
import skills from "./skills.json";

function Skills() {
  skills.skills.sort((a, b) => {
    return b.rating - a.rating;
  });

  return (
    <div className="skills-container">
      <h1>Skills</h1>
      <hr />
      <ul>
        {skills.skills.map((skill) => {
          return <Skill name={skill.name} rating={skill.rating} />;
        })}
      </ul>
      <p>this project was made using React</p>
      <a
        href="https://github.com/sarryqassir/personal-website"
        target="_blank"
        rel="noreferrer noopener"
        className="fa-solid fa-star"
      >
        Github
      </a>
    </div>
  );
}

export default Skills;
