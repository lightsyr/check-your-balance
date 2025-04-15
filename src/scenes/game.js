import Phaser from "phaser";
import Queue from "../objects/system/queue";
import showcase from "../data/showcase";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    // Load assets here
    this.load.image("costumer", "assets/images/characters/costumer.png");
  }

  create() {
    // Create the game scene here
    this.add.text(100, 100, "Game Scene", { fontSize: "32px", fill: "#fff" });

    // adiciona o trade manager e a queue de clientes
    this.queue = new Queue(this, showcase.getItems().length);
    // gera a posição inicial dos clientes na fila
    this.queue.updateQueue();
  }
}
