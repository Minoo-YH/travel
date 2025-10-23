import React, { useEffect, useRef, useState } from "react";
import XSound from "../assets/XSound.wav";

const NatureSounds = () => {
  const [isPlaying, setIsPlaying] = useState(false); 
  const audioRef = useRef(null); 

  useEffect(() => {
    
    audioRef.current = new Audio(XSound);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); 
      } else {
        audioRef.current.play(); 
      }
      setIsPlaying(!isPlaying); 
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      
      <toggle
        onClick={toggleSound}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        {isPlaying ? "cloese " : " open"}
      </toggle>
    </div>
  );
};

export default NatureSounds;



