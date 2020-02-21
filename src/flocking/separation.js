// called in flock.js
export default function Separation(flock, boid, ind) {
  const perceptionRadius = 50;
  let steering = [0, 0];
  let numPeers = 0;
  flock.forEach((other, idx) => {
    let d = Math.sqrt(
      Math.pow(boid.posx - other.posx, 2) + Math.pow(boid.posy - other.posy, 2)
    );
    if (ind !== idx && d < perceptionRadius) {
      // new vector via subtract other position vector from this position vector
      // also divide new vector by scalar that = d squared
      let diff = [0, 0];
      diff[0] = (boid.posx - other.posx) / Math.pow(d, 2);
      diff[1] = (boid.posy - other.posy) / Math.pow(d, 2);
      // add new diff vector to steering
      steering[0] += diff[0];
      steering[1] += diff[1];
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
    // limit steering vector magnitude to maxforce of1
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
