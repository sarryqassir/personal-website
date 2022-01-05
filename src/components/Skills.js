import React, { useState } from "react";
import Skill from "./Skill";
import "./Skills.css";
import skills from "./skills.json";
import { v4 as uuidv4 } from "uuid";
import { TransitionGroup } from "react-transition-group";

function Skills() {
  const [search, setSearch] = useState();
  const [sortOrder, setSortOrder] = useState("descending");
  const [sorting, setSorting] = useState("rating");

  console.log(search);
  // filterSkills = (e) => {
  //   let keyword = e.target.value;
  //   setSearch(keyword);
  // };

  skills.skills.sort((a, b) =>
    a[sorting] > b[sorting]
      ? sortOrder === "ascending"
        ? 1
        : -1
      : sortOrder === "descending"
      ? 1
      : -1
  );

  function handleSortStars() {
    if (sorting !== "rating") {
      setSorting("rating");
      setSortOrder("descending");
    } else
      setSortOrder(sortOrder === "descending" ? "ascending" : "descending");
  }

  function handleSortNames() {
    if (sorting !== "name") {
      setSorting("name");
      setSortOrder("descending");
    } else
      setSortOrder(sortOrder === "descending" ? "ascending" : "descending");
  }

  return (
    <div className="skills-container">
      <h1>Skills</h1>
      <hr />
      {/* filter bar, maybe make items selectable/ favourites
      filter how many stars
      drop down menu to sort by type (program/language, idea/theory, etc)
      */}
      <div className="filters">
        <button
          id="name-sort-btn"
          className={
            sorting === "name"
              ? sortOrder === "descending"
                ? "fa-solid fa-sort-down"
                : sortOrder === "ascending"
                ? "fa-solid fa-sort-up"
                : "fa-solid fa-sort"
              : "fa-solid fa-sort"
          }
          type="button"
          onClick={handleSortNames}
        />
        <input
          className="filter-bar"
          type="text"
          placeholder="Filter through skills"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* if its clicked a lot, ask user if third option (no sort) is good or should be removed */}
        <button
          id="star-sort-btn"
          className={
            sorting === "rating"
              ? sortOrder === "descending"
                ? "fa-solid fa-sort-down"
                : sortOrder === "ascending"
                ? "fa-solid fa-sort-up"
                : "fa-solid fa-sort"
              : "fa-solid fa-sort"
          }
          type="button"
          onClick={handleSortStars}
        />
      </div>
      <TransitionGroup>
        <ul className="skills-list">
          {/* maybe dynamically order the list by number to see what needs to be moved */}
          {skills.skills
            .filter((skill) => {
              if (!search) return skill;
              else if (skill.name.toLowerCase().includes(search.toLowerCase()))
                return skill;
            })
            .map((skill) => {
              // move csstransition here
              // or refactor inProp based on whos leaving here
              return (
                <Skill
                  className="skill-item"
                  key={uuidv4()}
                  name={skill.name}
                  rating={skill.rating}
                  // inProp={inProp}
                />
              );
            })}
        </ul>
      </TransitionGroup>
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
