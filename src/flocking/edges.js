// called directly in main app animation loop,
// once for each boid.
// receives one boid, returns one boid.
// also receives width and height as injected dependencies

export default function Edges(boid, width, height) {
  // reset position if on boundary
  if (boid.posx > width) {
    boid.posx = 0;
  } else if (boid.posx < 0) {
    boid.posx = width;
  }
  if (boid.posy > height) {
    boid.posy = 0;
  } else if (boid.posy < 0) {
    boid.posy = height;
  }
  return boid;
}
