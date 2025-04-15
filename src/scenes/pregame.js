import itemCategories from "../data/itemCategories.json";
import items from "../data/items.json";
import inventory from "../data/inventory";
import { gameDificulty, startMoney } from "../data/globals";
import Window from "../objects/ui/window";
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import createItemBox from "../objects/ui/itemBox";
import createMoneyWindow from "../objects/ui/moneyWindow";
import createInventoryWindow from "../objects/ui/inventoryWindow";

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
    const inventorySizes = {
      easy: 15,
      normal: 10,
      hard: 5,
    };

    const maxInventory = inventorySizes[gameDificulty] || 10;

    for (let i = 1; i <= maxInventory; i++) {
      let randomCategory =
        itemCategories[Math.floor(Math.random() * itemCategories.length)];

      let randomItem = items.find(
        (item) => item.category === randomCategory.name
      );

      if (randomItem) {
        inventory.addItem(randomItem);
      }
    }

    const inventoryWindow = createInventoryWindow(this, 640, 320);
    const moneyWindow = createMoneyWindow(this);
    const itemBox = createItemBox(this, inventoryWindow);

    
  }

  update() {}
}
