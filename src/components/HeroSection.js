import React, { useRef, useState } from "react";
// import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
  const [click, setClick] = useState(false);

  const bgVidRef = useRef(null);
  const handlePlayVideo = () => {
    bgVidRef.current.paused
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
    setClick(!click);
    bgVidRef.current.pause();
    bgVidRef.current.muted = !bgVidRef.current.muted;
  };

  return (
    <div
      className="hero-container"
      onClick={handlePlayVideo}
      ref={heroContainerStyle}
    >
      <div className="bgVid-container">
        <video
          ref={bgVidRef}
          src="/videos/video-2.mp4"
          type="video/mp4"
          autoPlay
          muted
          loop
        />
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
              click ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"
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
      </div>
    </div>
  );
}

export default HeroSection;
