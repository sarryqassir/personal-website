import React, { useState } from "react";
import Skill from "./Skill";
import "./Skills.css";
import skills from "./skills.json";
import { v4 as uuidv4 } from "uuid";
import { TransitionGroup } from "react-transition-group";
import ReactTooltip from "react-tooltip";
import { capitalizeFirst } from "./Utils.js";

function Skills() {
  const [search, setSearch] = useState();
  const [sortOrder, setSortOrder] = useState("descending");
  const [sorting, setSorting] = useState("rating");
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

  function handleSort(item) {
    if (sorting !== item) {
      setSorting(item);
      setSortOrder("descending");
    } else
      setSortOrder(sortOrder === "descending" ? "ascending" : "descending");
  }

  const dynamicSortIcon = (type) =>
    sorting === type
      ? sortOrder === "descending"
        ? "fa-solid fa-sort-down"
        : sortOrder === "ascending"
        ? "fa-solid fa-sort-up"
        : "fa-solid fa-sort"
      : "fa-solid fa-sort";

  const dynamicTooltip = (type) =>
    sorting === type
      ? sortOrder === "descending" || sortOrder === "ascending"
        ? capitalizeFirst(sortOrder)
        : "Sort by " + capitalizeFirst(type)
      : "Sort by " + capitalizeFirst(type);

  return (
    <div className="skills-container">
      <h1>Skills</h1>
      <hr />
      {/* maybe make items selectable/ favourites
      filter how many stars
      drop down menu to sort by type (program/language, idea/theory, etc)
      */}
      <div className="skill-filters">
        {/* make mini button compontent */}
        <div className="name-sort-btn-div">
          <button
            key="name-sort-btn"
            id="name-sort-btn"
            className={dynamicSortIcon("name")}
            type="button"
            data-tip={dynamicTooltip("name")}
            data-for="name-btn"
            onClick={() => handleSort("name")}
          />
          <ReactTooltip key={"name-btn-tooltip"} id="name-btn" effect="solid" />
        </div>
        <input
          className="filter-bar"
          type="text"
          placeholder="Filter skills"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* if its clicked a lot, ask user if third option (no sort) is good or should be removed */}
        <div className="rating-sort-btn-div">
          <button
            key="rating-sort-btn"
            id="rating-sort-btn"
            className={dynamicSortIcon("rating")}
            type="button"
            data-tip={dynamicTooltip("rating")}
            data-for="rating-btn"
            onClick={() => handleSort("rating")}
          />
          <ReactTooltip
            key="rating-btn-tooltip"
            id="rating-btn"
            effect="solid"
          />
        </div>
      </div>
      <TransitionGroup>
        <ul className="skills-list">
          {/* maybe dynamically order the list by number to see what needs to be moved */}
          {skills.skills
            .filter((skill) => {
              if (!search) return skill;
              else if (skill.name.toLowerCase().includes(search.toLowerCase()))
                return skill;
              return false;
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
      <p>This project was made using React</p>
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
