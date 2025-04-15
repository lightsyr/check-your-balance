import Phaser from "phaser";
import createMoneyWindow from "../objects/ui/moneyWindow";
import Link from "../objects/ui/link";
import InventoryWindow from "../objects/ui/newInventoryWindow";
import ShowCaseWindow from "../objects/ui/newShowCaseWidnow";
import { dayCounter } from "../data/globals";
import showcase from "../data/showcase";

export default class Pregame extends Phaser.Scene {
  constructor() {
    super({ key: "Pregame" });
  }

  preload() {
    this.load.image("close", "assets/images/ui/close.png");
    this.load.image("coin", "assets/images/ui/coin.png");
    this.load.image("item", "assets/images/items/Shirt_00.png");
    this.load.image("store_bg", "assets/images/backgrounds/store.png");
  }

  create() {
    // add background image
    this.add.image(0, 0, "store_bg").setOrigin(0, 0).setScale(1);

    

    this.showCaseWindow = new ShowCaseWindow(this, 640, 640);
    this.inventoryWindow = new InventoryWindow(this, 640, 320);

    this.inventoryWindow.setShowCase(this.showCaseWindow);

    const moneyWindow = createMoneyWindow(this);

    const goGameLink = new Link(
      this,
      640,
      120,
      "Confirm",
      {},
      () => {
        if(showcase.getItems().length > 0){
          this.scene.start("GameScene")
        }else{
          alert("Escolha itens do inventário")
        }
      }
    );

    if (dayCounter == 1) {
      console.log("Tutorial iniciado");
      this.tutorial();
    }
  }

  tutorial() {
    const tutorialText = this.add
      .text(
        640,
        400,
        "Welcome to the store! \nHere you can buy and sell items.\n\nClick on an item to add it to your inventory.\n\nClick on the 'Confirm and to Menu' button to start the game.",
        { fontSize: "20px", color: "#ffffff" , backgroundColor: "#000000"}
      )
      .setOrigin(0.5, 0.5);

    // aguarda alguns segundos e deixa o texto invisivel
    this.time.delayedCall(5000, () => {
      tutorialText.setVisible(false);
    });
  }

  update() {}
}
