import itemCategories from "../data/itemCategories.json";
import items from "../data/items.json";
import inventory from "../data/inventory";
import { gameDificulty, startMoney } from "../data/globals";
import Window from "../objects/ui/window";
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import createItemBox from "../objects/ui/itemBox";
import createMoneyWindow from "../objects/ui/moneyWindow";
import createInventoryWindow from "../objects/ui/inventoryWindow";
import Link from "../objects/ui/link";

export default class Pregame extends Phaser.Scene {
  constructor() {
    super({ key: "Pregame" });
  }

  preload() {
    this.load.image("close", "assets/images/ui/close.png");
    this.load.image("coin", "assets/images/ui/coin.png");
    this.load.image("item", "assets/images/items/Shirt_00.png");
  }

  create() {
   

    const inventoryWindow = createInventoryWindow(this, 640, 320);
    const itemBox = createItemBox(this, inventoryWindow);

    inventoryWindow.setItemBox(itemBox);

    // Renderiza os dois arrays globais (ordem correta agora!)
    itemBox.mount(); // showCase vem para cá
    inventoryWindow.mount(); // e inventory aqui

    const moneyWindow = createMoneyWindow(this);

    const goGameLink = new Link(this, 640, 120, "Confirm and to Menu", {}, () => {
      this.scene.start("Menu");
    });
  }

  update() {}
}
