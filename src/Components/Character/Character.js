import React from "react";
import "./character.scss";

function Character({ char, cClass, timerClass }) {
  return <span className={`${cClass} ${timerClass}`}>{char}</span>;
}

export default Character;
