import Phaser from "phaser";
import createMoneyWindow from "../objects/ui/moneyWindow";
import Link from "../objects/ui/link";
import InventoryWindow from "../objects/ui/newInventoryWindow";
import ShowCaseWindow from "../objects/ui/newShowCaseWidnow";

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

    this.showCaseWindow = new ShowCaseWindow(this, 640, 640)
    this.inventoryWindow = new InventoryWindow(this, 640, 320)

    this.inventoryWindow.setShowCase(this.showCaseWindow)

    const moneyWindow = createMoneyWindow(this);

    const goGameLink = new Link(this, 640, 120, "Confirm and to Menu", {}, () => {
      this.scene.start("Menu");
    });
  }

  update() {}
}
