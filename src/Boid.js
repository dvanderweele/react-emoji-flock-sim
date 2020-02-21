import React from "react";

export default function Boid(props) {
  const { emoji, posx, posy, velx, vely } = props;

  const rad = Math.atan(vely / velx);
  const deg = (rad * 180) / Math.PI + 90;

  return (
    <span
      style={{
        position: "absolute",
        top: posy,
        left: posx,
        fontSize: "1.5rem",
        transform: `rotate(${deg}deg)`
      }}
    >
      {emoji}
    </span>
  );
}
