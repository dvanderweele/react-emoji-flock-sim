import React, { useState, useEffect } from "react";

export default function Boid(props) {
  const { emoji, posx, posy, velx, vely, accx, accy } = props;
  const maxForce = 1;
  const maxSpeed = 4;

  return (
    <span style={{ position: "absolute", top: posy, left: posx }}>{emoji}</span>
  );
}
