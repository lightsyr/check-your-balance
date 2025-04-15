import Phaser from "phaser";
import createItemBox from "../objects/ui/itemBox";
import createMoneyWindow from "../objects/ui/moneyWindow";
import createInventoryWindow from "../objects/ui/inventoryWindow";
import Link from "../objects/ui/link";
import createNewInventoryWindow from "../objects/ui/newInventoryWindow";
import createNewShowCaseWindow from "../objects/ui/createNewShowCaseWindow";
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

    // const itemBox = createItemBox(this, inventoryWindow);

   // inventoryWindow.setItemBox(itemBox);

    // Renderiza os dois arrays globais (ordem correta agora!)
    // itemBox.mount(); // showCase vem para cá
    // inventoryWindow.mount(); // e inventory aqui

    const moneyWindow = createMoneyWindow(this);

    const goGameLink = new Link(this, 640, 120, "Confirm and to Menu", {}, () => {
      this.scene.start("Menu");
    });
  }

  update() {}
}
