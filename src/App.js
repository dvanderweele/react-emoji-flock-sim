import React, { useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";
import Boid from "./Boid";
import "./App.css";
import Edges from "./flocking/edges";
import Flocking from "./flocking/flock";

// const emojis = ["🎨", "🐧", "🌐", "💾", "🖱", "⌨"];
// const emojis = ["😂", "🤬", "😯", "😭", "❤", "🤙"];
// const emojis = ["✒", "🎓", "🎙", "🏛", "💬", "📜"];
const emojis = ["🎤", "🎧", "🎼", "🎶", "🎹", "🎸"];
// const emojis = ["👔","🧰","👷","🚚","🛠","🧱"];
// const emojis = ["🛡", "⚔", "🔫", "🎮", "🕹", "🎫"];
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
      const velx = Math.random() > 0.5 ? Math.random() * 5 : Math.random() * -5;
      const vely = Math.random() > 0.5 ? Math.random() * 5 : Math.random() * -5;
      // set x and y accel vals to 0 at start
      const accx = 0;
      const accy = 0;
      console.log(posx, posy, velx, vely, accx, accy);
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
    console.log(newFlock);
    return newFlock;
  });

  const [alignval, setAlignval] = useState(1);
  const [cohesionval, setCohesionval] = useState(1);
  const [separationval, setSeparationval] = useState(1);

  const handleSlider = e => {
    const { name, value } = e.target;
    switch (name) {
      case "align":
        setAlignval(value);
        break;
      case "cohesion":
        setCohesionval(value);
        break;
      case "separation":
        setSeparationval(value);
        break;
      default:
        return undefined;
    }
  };

  // animation loop
  useAnimationFrame(dt => {
    if (flock.length) {
      setFlock(ps => {
        let newFlock = ps.map((boid, ind) => {
          // handle edge detection
          boid = Edges(boid, width, height);
          // simulate flocking behaviors so we can mutate position appropriately.
          boid = Flocking(ps, boid, ind, alignval, cohesionval, separationval);
          // increment position by velocity
          boid.posx += boid.velx;
          boid.posy += boid.vely;
          // increment velocity by new acceleration
          boid.velx += boid.accx;
          boid.vely += boid.accx;
          // let's limit the magnitude of the velocity vector to 8
          const velmag = Math.sqrt(
            boid.velx * boid.velx + boid.vely * boid.vely
          );
          if (velmag > 8) {
            boid.velx /= velmag;
            boid.vely /= velmag;
            boid.velx *= 8;
            boid.vely *= 8;
          }
          boid.accx = 0;
          boid.accx = 0;
          return boid;
        });
        return newFlock;
      });
    } else {
      return flock;
    }
  });

  return (
    <>
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
      <div
        className="sliders"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "80vw",
          marginLeft: "10vw",
          marginRight: "10vw"
        }}
      >
        <p>Alignment</p>
        <input
          type="range"
          name="align"
          min={0}
          max={2}
          value={alignval}
          step={0.1}
          onChange={e => handleSlider(e)}
        />
        <p>Cohesion</p>
        <input
          type="range"
          name="cohesion"
          min={0}
          max={2}
          value={cohesionval}
          step={0.1}
          onChange={e => handleSlider(e)}
        />
        <p>Separation</p>
        <input
          type="range"
          name="separation"
          min={0}
          max={2}
          value={separationval}
          step={0.1}
          onChange={e => handleSlider(e)}
        />
      </div>
    </>
  );
}

export default App;
