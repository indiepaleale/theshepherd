//p5 canvas setup
let cnv;
let root;
let player;
//matter-js engine setup
const {
  Engine,
  World,
  Bodies,
  Composite,
  Constraint,
  Mouse,
  MouseConstraint
} = Matter;

let herd = [];
let backgroundGrass;

const engine = Engine.create();
engine.gravity.scale = 0;
const world = engine.world;

let mConstraint;

function preload(){
  backgroundGrass = loadImage("grass.png");
}

function setup() {
  //create canvas
  root = createDiv();
  root.id('root');
  cnv = createCanvas(800, 600);
  cnv.parent(root);
  root.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  //CENTER mode is used with matter-js
  rectMode(CENTER)
  player = new Shepherd(width/2, height/2, world);
  for (let i = 0; i < 100; i++) {
    const sheep = new Sheep(random(0, width), random(0, height), world);
    herd.push(sheep);
  }
  let canvasMouse = Mouse.create(cnv.elt);
    let options = {
        mouse: canvasMouse,
        constraint: {
          stiffness: 1
      }
    }
    console.log()
    pixelDensity(4);
    canvasMouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint)
}

function draw() {
  Engine.update(engine);
  image(backgroundGrass, 0, 0, 800, 600)
  for (let sheep of herd) {
    sheep.run(herd);
  };
  player.update();
  player.draw();
}
