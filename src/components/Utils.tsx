import { /*React*/ useLayoutEffect, useState } from "react";

// pretty cool answers: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
/** Capitalizes the first character of a given string */
export const capitalizeFirst = (s: string) =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";

// https://stackoverflow.com/a/19014495
export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

/** Calculate age based on date string */
export function calculateAge(dateString: string): number {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}
