import Phaser from "phaser";
import Menu from "./scenes/menu";
import Pregame from "./scenes/pregame";

// phaser game config
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Menu, Pregame],
}

const game = new Phaser.Game(config);