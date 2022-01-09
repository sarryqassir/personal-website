import React, { useState, useMemo } from "react";
import Skill from "./Skill";
import "./Skills.css";
import skills from "./skills.json";
import { v4 as uuidv4 } from "uuid";
import { useTransition, animated } from "react-spring";
import ReactTooltip from "react-tooltip";
import { capitalizeFirst } from "./Utils.js";

function Skills() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(false);
  const [sorting, setSorting] = useState("rating");

  useMemo(
    () =>
      skills.skills.sort((a, b) =>
        (sortOrder ? a[sorting] > b[sorting] : a[sorting] < b[sorting]) ? 1 : -1
      ),
    [sortOrder, sorting]
  );

  function handleSort(item) {
    if (sorting !== item) {
      setSorting(item);
      setSortOrder(false);
    } else setSortOrder(!sortOrder);
  }

  const dynamicSortIcon = (name) =>
    sorting === name
      ? sortOrder
        ? "fa-solid fa-sort-up"
        : "fa-solid fa-sort-down"
      : "fa-solid fa-sort";

  const dynamicTooltip = (name) =>
    sorting === name
      ? sortOrder
        ? "Ascending"
        : "Descending"
      : "Sort by " + capitalizeFirst(name);

  const filteredSkills = skills.skills.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  let height = 0;
  const transition = useTransition(
    filteredSkills.map((data) => ({
      ...data,
      y: (height += 33) - 33,
    })),
    {
      key: (item) => item.name,
      from: { height: 0, opacity: 0, y: 0 },
      leave: { height: 0, opacity: 0, y: 0 },
      enter: ({ y }) => ({ y, height: 0, opacity: 1 }),
      update: ({ y }) => ({ y, height: 0 }),
    }
  );

  const fadeInListSkills = transition((style, item, t, index) => {
    return (
      <animated.ul
        style={{ zIndex: skills.skills.length - index, ...style }}
        className="skills-list"
      >
        <Skill
          className="skill-item"
          key={uuidv4()}
          name={item.name}
          rating={item.rating}
          data={item}
        />
      </animated.ul>
    );
  });

  return (
    <div className="skills-container">
      <h1>Skills</h1>
      <hr />
      <div className="skill-filters">
        {/* make mini button compontent */}
        <div className="name-sort-btn-div">
          <button
            id="name-sort-btn"
            key="name-sort-btn"
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
          onChange={(e) => setSearch(e.target.value.trim())}
        />
        <div className="rating-sort-btn-div">
          <button
            id="rating-sort-btn"
            key="rating-sort-btn"
            className={dynamicSortIcon("rating")}
            type="button"
            data-tip={dynamicTooltip("rating")}
            data-for="rating-btn"
            onClick={() => handleSort("rating")}
          />
          <ReactTooltip
            id="rating-btn"
            key="rating-btn-tooltip"
            effect="solid"
          />
        </div>
      </div>
      <div style={{ height }}>{fadeInListSkills}</div>
      <span className="skills-madeby-text">
        <p>This project was made using React</p>
      </span>
      <a
        href="https://github.com/sarryqassir/personal-website"
        target="_blank"
        rel="noreferrer noopener"
        className="fa-brands fa-github"
      >
        <p>Github</p>
      </a>
    </div>
  );
}

export default Skills;
