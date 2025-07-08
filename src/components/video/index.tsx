"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface PropsVideo {
  className?: string;
  width: string;
  height: string;
  url: string;
}
export default function CustomPlayer({
  className,
  width,
  height,
  url,
}: PropsVideo) {
  const playerRef = useRef(null); // Referencia para acceder a los métodos del reproductor
  const [isPlaying, setIsPlaying] = useState(false); // Estado para manejar si está reproduciendo
 
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnd = () => setIsPlaying(false);

  const classNameMerge = cn("group relative w-auto h-auto  rounded-[13px]", className);
  return (
    <div className={classNameMerge}>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        controls={false}
        width={width}
        height={height}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnd}
        style={{ 
            borderRadius: "10px", 
          }}
      /> 
      {!isPlaying ? (
        <div className="w-full h-full bg-black/40 absolute top-0 left-0 rounded-[13px]">
           <button
          onClick={handlePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", 
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          {isPlaying ? "❚❚" : "▶"}  
        </button>
        </div>
      ) : null}

      {isPlaying ? (
        <button
          onClick={handlePause}
          className="hidden group-hover:block"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", 
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          {isPlaying ? "❚❚" : "▶"} {/* Icono dinámico según el estado */}
        </button>
      ) : null}
    </div>
  );
}
