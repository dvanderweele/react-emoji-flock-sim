// called directly in main app animation loop,
// once for each boid.
// on each call, function receives, entire flock array
// and the current boid

import Cohesion from "./cohesion";
import Alignment from "./alignment";
import Separation from "./separation";

export default function Flocking(flock, boid, ind) {
  let alignment = Alignment(flock, boid, ind);
  let cohesion = Cohesion(flock, boid, ind);
  let separation = Separation(flock, boid, ind);
  boid.accx += alignment[0];
  boid.accy += alignment[1];
  boid.accx += cohesion[0];
  boid.accy += cohesion[1];
  boid.accx += separation[0];
  boid.accy += separation[1];
  return boid;
}
