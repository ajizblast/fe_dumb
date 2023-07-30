import React from "react";
import ReactAudioPlayer from "react-audio-player";

const MusicPlayer = ({ music }) => {
  return (
    <ReactAudioPlayer
      className="w-full fixed left-0 right-0 bottom-0"
      src={music}
      autoPlay
      controls
    />
  );
};

export default MusicPlayer;
