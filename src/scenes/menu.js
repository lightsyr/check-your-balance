import Phaser from "phaser";
import Link from "../objects/ui/link";

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu" });
  }

  preload() {}

  create() {
    // add a text to the center of the screen
    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, "Menu", {
        fontSize: "64px",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5);

    // add a link on the screen
    const link = new Link(
      this,
      this.cameras.main.centerX,
      this.cameras.main.centerY + 100,
      "Play",
      {
        fontSize: "32px",
        fill: "#fff",
        align: "center",
        backgroundColor: "#000",
      },
      () => {
        this.scene.start("Pregame");
      }
    );
  }

  update() {}
}
