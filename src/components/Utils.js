// import React from "react";

// https://keycode.info/
// idk this doesn't work
// this functionality may be built into submit types, but only for forms? not sure, couldn't get it to work
export const submitOnEnter = (e) => {
  if (e.key === "Enter") {
    console.log("sumbitOnEnter");
    e.preventDefault();
    e.SubmitEvent();
  }
};

// pretty cool answers: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export const capitalizeFirst = (s) =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";