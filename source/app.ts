import {
  Application,
  Loader,
  Texture,
  AnimatedSprite,
  Graphics,
  Container,
  Text,
  Sprite,
} from "pixi.js";

const game = new Application({ backgroundColor: 0x1099bb });
const rect = new Graphics().beginFill(0xff0000).drawRect(-50, -50, 100, 100);
const bunny = new Sprite(Texture.from("assets/examples/bunny.png"));
bunny.anchor.set(0.5);
bunny.x = 200;
bunny.y = 120;

const basicText = new Text("12:00");
basicText.x = 50;
basicText.y = 100;

// Add it to the stage
game.stage.addChild(rect);
game.stage.addChild(bunny);
game.stage.addChild(basicText);

//Rotate bunny a little
game.ticker.add(() => {
  bunny.rotation += 0.1;
});

// Listen for window resize events
window.addEventListener("resize", resize);

// Resize function window
function resize() {
  // Resize the renderer
  game.renderer.resize(window.innerWidth, window.innerHeight);
  rect.position.set(game.screen.width / 2, game.screen.height / 2);
}

resize();

export const App = () => game.view;
