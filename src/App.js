import React, { useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";
import Boid from "./Boid";
import "./App.css";
import Edges from "./flocking/edges";
import Flocking from "./flocking/flock";

// const emojis = ["🎨", "🐧", "🌐", "💾", "🖱", "⌨"];
// const emojis = ["😂", "🤬", "😯", "😭", "❤", "🤙"];
// const emojis = ["✒", "🎓", "🎙", "🏛", "💬", "📜"];
// const emojis = ["🎤", "🎧", "🎼", "🎶", "🎹", "🎸"];
// const emojis = ["👔","🧰","👷","🚚","🛠","🧱"];
const emojis = ["🛡", "⚔", "🔫", "🎮", "🕹", "🎫"];
// const emojis = [️"🍩","🍪","☕","🍵","😊","📖"];

const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

function App() {
  const [flock, setFlock] = useState(() => {
    /*
      dynamically determine how many boids to create 
      based on browser window size on component mount. 
      Note, this is not the kind of dynamic where the 
      number of boids changes if the user resizes 
      window later during the animation.
    */
    const w = Math.floor(width / 120);
    const h = Math.floor(height / 120);
    const res = w * h;
    // generate same startig pos for each emoji
    const xcoord = Math.random() * Math.floor(width - 20);
    const ycoord = Math.random() * Math.floor(height - 20);
    /*
     Now let's dynamically generate the flock of 
     emojis
   */
    let newFlock = Array.from({ length: res }, x => {
      // randomly select an emoji from the constant above
      const emojind = Math.floor(Math.random() * Math.floor(5));
      const emoji = emojis[emojind];
      return [emoji, emojind];
    }).map(el => {
      // pick random x and y starting coords for the emoji
      const posx =
        Math.random() > 0.5 ? xcoord + Math.random() : xcoord - Math.random();
      const posy =
        Math.random() > 0.5 ? ycoord + Math.random() : ycoord - Math.random();
      // set random x and y start velocities as well
      const velx = Math.random() > 0.5 ? Math.random() * 3 : Math.random() * -3;
      const vely = Math.random() > 0.5 ? Math.random() * 3 : Math.random() * -3;
      // set x and y accel vals to 0 at start
      const accx = 0;
      const accy = 0;
      return {
        emoji: el[0],
        groupnum: el[1],
        posx,
        posy,
        velx,
        vely,
        accx,
        accy
      };
    });
    return newFlock;
  });

  // animation loop
  useAnimationFrame(dt => {
    if (flock.length) {
      setFlock(ps => {
        let newFlock = ps.map((boid, ind) => {
          // handle edge detection
          boid = Edges(boid, width, height);
          // simulate flocking behaviors so we can mutate position appropriately.
          boid = Flocking(ps, boid, ind);
          // increment velocity by new acceleration
          boid.velx += boid.accx;
          boid.vely += boid.accx;
          // increment position by velocity
          boid.posx += boid.velx;
          boid.posy += boid.vely;
          // let's limit the magnitude of the velocity vector to 6
          const velmag = Math.sqrt(
            boid.velx * boid.velx + boid.vely * boid.vely
          );
          if (velmag > 6) {
            boid.velx /= velmag;
            boid.vely /= velmag;
            boid.velx *= 6;
            boid.vely *= 6;
          }
          boid.accx = 0;
          boid.accy = 0;
          return boid;
        });
        return newFlock;
      });
    } else {
      return flock;
    }
  });

  return (
    <div
      className="App"
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "ivory",
        overflow: "hidden"
      }}
    >
      {flock &&
        flock.map((x, y) => {
          return (
            <Boid
              key={y}
              emoji={x.emoji}
              posx={x.posx}
              posy={x.posy}
              velx={x.velx}
              vely={x.vely}
            />
          );
        })}
    </div>
  );
}

export default App;
