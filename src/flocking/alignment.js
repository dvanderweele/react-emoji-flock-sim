// called in flock.js
// returns alignment vector
export default function Alignment(flock, boid, ind) {
  const perceptionRadius = 50;
  let steering = [0, 0];
  let numPeers = 0;
  flock.forEach((other, idx) => {
    let d = Math.sqrt(
      Math.pow(boid.posx - other.posx, 2) + Math.pow(boid.posy - other.posy, 2)
    );
    if (ind !== idx && d < perceptionRadius) {
      steering[0] += other.velx;
      steering[1] += other.vely;
      numPeers++;
    }
  });
  if (numPeers > 0) {
    // divide steering vector by numPeers
    steering = steering.map(x => x / numPeers);
    // set magnitude of steering vector to 5
    let stmag = Math.sqrt(
      steering[0] * steering[0] + steering[1] * steering[1]
    );
    steering[0] /= stmag;
    steering[1] /= stmag;
    steering[0] *= 5;
    steering[1] *= 5;
    // subtract velocity vector from steering vector
    steering[0] -= boid.velx;
    steering[1] -= boid.vely;
    // limit steering vector magnitude to maxforce of 1
    stmag = Math.sqrt(steering[0] * steering[0] + steering[1] * steering[1]);
    if (stmag > 1) {
      steering[0] /= stmag;
      steering[1] /= stmag;
      steering[0] *= 1;
      steering[1] *= 1;
    }
  }
  return steering;
}
