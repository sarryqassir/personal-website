import React, { useRef, useState, useEffect } from "react";
// import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import skills from "./skills.json";

function HeroSection() {
  const [count, setCount] = useState(0);
  const [muted, setMuted] = useState(true);
  const [srcVid, setSrcVid] = useState(skills.bgVids[0].vid);

  const bgVidRef = useRef(null);

  const handlePlayVideo = () => {
    bgVidRef.current.paused && bgVidRef.current.style.display !== "none"
      ? bgVidRef.current.play()
      : bgVidRef.current.pause();
  };

  const heroContainerStyle = useRef(null);
  const handleToggleVideo = () => {
    bgVidRef.current.style.display === "none"
      ? (bgVidRef.current.style.display = "initial")
      : (bgVidRef.current.style.display = "none");

    heroContainerStyle.current.style.backgroundColor === "lightblue"
      ? (heroContainerStyle.current.style.backgroundColor = "initial")
      : (heroContainerStyle.current.style.backgroundColor = "lightblue");
  };

  const handleToggleMute = () => {
    bgVidRef.current.pause();
    setMuted(!muted);
  };

  useEffect(() => {
    bgVidRef.current.muted = muted;
  });

  const handleChangeVideo = () => {
    if (count >= skills.bgVids.length - 1) setCount(0);
    else setCount(count + 1);
  };

  useEffect(() => {
    setSrcVid(skills.bgVids[count].vid);
  }, [count]);

  return (
    <div
      onClick={handlePlayVideo}
      className="hero-container"
      ref={heroContainerStyle}
    >
      <div className="bgVid-container">
        <video key={srcVid} ref={bgVidRef} autoPlay loop>
          <source src={srcVid} type="video/mp4" />
        </video>
      </div>
      <h1>About me</h1>
      <p>
        I am a programming student who loves solving problems and learning
        through trying new things and testing myself on what I already know.
      </p>
      <img
        src="/images/img-1.jpg"
        alt="placeholder for myself"
        width="460"
        height="460"
      />
      <p>
        <strong>Name: </strong>
        Sarry <br />
        <strong>Age: </strong> 20 <br />
        <strong>Location: </strong>
        Toronto, Canada
      </p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={handleToggleMute}
        >
          <i
            className={
              muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"
            }
          />
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={handleToggleVideo}
        >
          Toggle Video
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={handleChangeVideo}
        >
          Change Video
        </Button>
      </div>
      <details>
        <summary>
          {JSON.stringify(skills.bgVids[count].sum).replace(/"/g, "")}
        </summary>
        {JSON.stringify(skills.bgVids[count].desc).replace(/"/g, "")}
      </details>
    </div>
  );
}

export default HeroSection;
