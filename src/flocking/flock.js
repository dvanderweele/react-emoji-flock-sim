// called directly in main app animation loop,
// once for each boid.
// on each call, function receives, entire flock array
// and the current boid

import Cohesion from "./cohesion";
import Alignment from "./cohesion";
import Separation from "./separation";

export default function Flocking(flock, boid) {
  const alignment = Alignment(flock, boid);
  const cohesion = Cohesion(flock, boid);
  const separation = Separation(flock, boid);
  boid.accx += alignment.x;
  boid.accy += alignment.y;
  boid.accx += cohesion.x;
  boid.accy += cohesion.y;
  boid.accx += separation.x;
  boid.accx += separation.y;
  return boid;
}
