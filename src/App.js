import React from "react";
import { useAnimationFrame } from "./useAnimationFrame";
import Boid from "./Boid";
import "./App.css";
import Edges from "./flocking/edges";
import Flocking from "./flocking/flock";

const emojis = ["🎨", "🐧", "🌐", "💾", "🖱", "⌨"];
// const emojis = ["😂","🤬","😯","😭","❤","🤙"];
// const emojis = ["✒", "🎓", "🎙", "🏛", "💬", "📜"];
// const emojis = ["🎤","🎧","🎼","🎶","🎹","🎸"];
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
  const [flock, setFlock] = React.useState();

  // generate the flock on mount
  React.useEffect(() => {
    /*
      dynamically determine how many boids to create 
      based on browser window size on component mount. 
      Note, this is not the kind of dynamic where the 
      number of boids changes if the user resizes 
      window later during the animation.
    */
    const w = Math.floor(width / 80);
    const h = Math.floor(height / 80);
    const res = w * h;
    /*
      Now let's dynamically generate the flock of 
      emojis
    */
    const newFlock = Array.from({ length: res }, x => {
      // randomly select an emoji from the constant above
      const emojind = Math.floor(Math.random() * Math.floor(5));
      const emoji = emojis[emojind];
      return [emoji, emojind];
    }).map(el => {
      // pick random x and y starting coords for the emoji
      const posx = Math.random() * Math.floor(width - 20);
      const posy = Math.random() * Math.floor(height - 20);
      // set random x and y start velocities as well
      const velx = Math.random() * 4;
      const vely = Math.random() * 4;
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
    setFlock(ps => newFlock);
  }, []);

  // animation loop
  useAnimationFrame(dt => {
    setFlock(ps => {
      return ps.map(boid => {
        // handle edge detection
        boid = Edges(boid, width, height);
        // simulate flocking behaviors so we can mutate position appropriately.
        boid = Flocking(ps, boid);
        // increment position by velocity
        boid.posx += boid.velx;
        boid.posy += boid.vely;
        // increment velocity by new acceleration
        boid.velx += boid.accx;
        boid.vely += boid.accx;
        // let's limit the magnitude of the velocity vector to 4
        const velmag = Math.sqrt(boid.velx * boid.velx + boid.vely * boid.vely);
        if (velmag > 4) {
          boid.velx /= velmag;
          boid.vely /= velmag;
          boid.velx *= 4;
          boid.vely *= 4;
        }
        boid.accx = 0;
        boid.accx = 0;
        return boid;
      });
    });
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
              velx={x.elx}
              vely={x.vely}
              accx={x.accx}
              accy={x.accy}
            />
          );
        })}
    </div>
  );
}

export default App;
