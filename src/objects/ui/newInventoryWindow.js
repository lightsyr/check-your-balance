import Phaser from "phaser";
import inventory from "../../data/inventory";
import { createVisualItem } from "../../utils/createVisualItem";
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components";
import { moveItemContainer } from "../../utils/moveItemContainer";

export default class InventoryWindow {
  /**
   * Creates an inventory window for the game.
   * @param {Phaser.Scene} scene - The scene to which the inventory window belongs.
   * @param {number} x - The x position of the inventory window.
   * @param {number} y - The y position of the inventory window.
   */
  constructor(scene, x, y) {
    this.scene = scene;
    this.showCase = null;

    this.mainContainer = new Sizer(scene, {
      x,
      y,
      width: 600,
      height: 200,
      orientation: "vertical",
      space: { item: 10 },
    });

    this.itemsContainer = new Sizer(scene, {
      width: 600,
      height: 160,
      orientation: "horizontal",
      anchor: "center",
      space: { item: 10 },
    });

    const background = scene.add.rectangle(
      0,
      0,
      this.mainContainer.width,
      this.mainContainer.height,
      0x000000,
      0.5
    );
    this.mainContainer.addBackground(background);

    this.titleLabel = scene.add.text(0, 0, "Inventory", {
      fontSize: "20px",
      color: "#ffffff",
    });

    this.mainContainer.add(this.titleLabel);
    this.mainContainer.add(this.itemsContainer);

    scene.add.existing(this.mainContainer);

    this.render();
  }

  setShowCase(showCase) {
    this.showCase = showCase;
    this.populateItems();
  }

  populateItems() {
    this.itemsContainer.clear(true);
    inventory.getItems().forEach((item) => {
      const itemContainer = createVisualItem(this.scene, item, (container) => {
        moveItemContainer(container, this.itemsContainer, this.showCase.itemsContainer);
        inventory.removeItem(item);
        this.showCase.addItem(item);
      });
      this.itemsContainer.add(itemContainer);
    });
    this.render();
  }

  render() {
    this.mainContainer.layout();
  }
}
