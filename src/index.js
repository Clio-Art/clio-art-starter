// these are the variables you can use as inputs to your algorithms
console.log(clioHash); // the 64 chars hex number fed to your algorithm
console.log(rand()); // deterministic PRNG function, use it instead of Math.random()

function setup() {
  // draw code goes here

  // should be in the end of the function
  postArt(get().canvas);
}
