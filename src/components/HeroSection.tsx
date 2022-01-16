import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import "./HeroSection.css";
import skillsData from "./skillsData.json";
import * as assets from "../assets/index";
import { calculateAge } from "./Utils";

const bgVids = skillsData.bgVids;

const videos = [
  assets.zombsHighlights,
  assets.tarikCereal,
  assets.tarikOverpass,
  assets.twistzzSitDown,
];

function HeroSection() {
  const [count, setCount] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(true);

  const bgVidRef = useRef<HTMLVideoElement>(null);

  const mainImgRef = useRef<HTMLImageElement>(null);

  const heroContainerStyle = useRef<HTMLDivElement>(null);

  const handlePlayVideo = () => {
    if (bgVidRef.current) {
      bgVidRef.current.paused && bgVidRef.current.style.display !== "none"
        ? bgVidRef.current.play()
        : bgVidRef.current.pause();
    }
  };

  const handleToggleVideo = () => {
    if (bgVidRef.current && heroContainerStyle.current) {
      bgVidRef.current.style.display === "none"
        ? (bgVidRef.current.style.display = "initial")
        : (bgVidRef.current.style.display = "none");

      heroContainerStyle.current.style.backgroundColor === "lightblue"
        ? (heroContainerStyle.current.style.backgroundColor = "initial")
        : (heroContainerStyle.current.style.backgroundColor = "lightblue");
    }
  };

  const handleToggleMute = () => {
    if (bgVidRef.current) {
      bgVidRef.current.pause();
      setMuted(!muted);
    }
  };

  useEffect(() => {
    if (bgVidRef.current) {
      bgVidRef.current.muted = muted;
    }
  });

  const handleChangeVideo = () => {
    if (count >= videos.length - 1) setCount(0);
    else setCount(count + 1);
  };

  const handleImgClick = () => {
    if (mainImgRef.current) {
      mainImgRef.current.style.opacity > "0.01"
        ? (mainImgRef.current.style.opacity = "0.01")
        : (mainImgRef.current.style.opacity = "1");
    }
  };

  return (
    <div
      onClick={handlePlayVideo}
      className="hero-container"
      ref={heroContainerStyle}
    >
      <div className="bgVid-container">
        <video
          key={String(videos[count])}
          ref={bgVidRef}
          poster={assets.alhamdulillah}
          autoPlay
          loop
          playsInline
        >
          <source src={videos[count]} type="video/mp4" />
        </video>
      </div>
      <h1>About me</h1>
      <p>
        I am a programming student who loves solving problems and learning
        through trying new things and testing myself on what I already know.
      </p>
      <img
        className="hero-img"
        ref={mainImgRef}
        src={assets.tarikKids}
        alt="placeholder for myself"
        width="460"
        height="460"
        title="Click To Toggle"
        onClick={handleImgClick}
      />
      <p>
        <strong>Name: </strong>
        Sarry <br />
        <strong>Age: </strong> {calculateAge("September 5, 2001")} <br />
        <strong>Location: </strong>
        Toronto, Canada
      </p>
      <div className="hero-btns">
        <Button
          title="Toggle Mute"
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
          title="Toggle Video"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={handleToggleVideo}
        >
          Toggle Video
        </Button>
        <Button
          title="Change Video"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={handleChangeVideo}
        >
          Change Video
        </Button>
      </div>
      <details>
        <summary title="Expand to read more about the video">
          {JSON.stringify(bgVids[count].sum).replace(/"/g, "")}
        </summary>
        {JSON.stringify(bgVids[count].desc).replace(/"/g, "")}
      </details>
    </div>
  );
}

export default HeroSection;
