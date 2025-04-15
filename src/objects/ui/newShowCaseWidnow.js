import Phaser from "phaser";
import showcase from "../../data/showcase";
import inventory from "../../data/inventory";
import { createVisualItem } from "../../utils/createVisualItem";
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components";
import { moveItemContainer } from "../../utils/moveItemContainer";

export default class ShowCaseWindow {
  /**
   * Creates a new show case window.
   * @param {Phaser.Scene} scene - The scene to which the show case window belongs.
   * @param {number} x - The x position of the show case window.
   * @param {number} y - The y position of the show case window.
   */
  constructor(scene, x, y) {
    this.scene = scene;

    this.mainContainer = new Sizer(scene, {
      x,
      y,
      width: 480,
      height: 120,
      orientation: "vertical",
      anchor: "center",
      space: { item: 10 },
    });

    this.itemsContainer = new Sizer(scene, {
      width: 480,
      height: 96,
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

    this.titleLabel = scene.add.text(0, 0, "Show Case", {
      fontSize: "20px",
      color: "#ffffff",
    });

    this.mainContainer.add(this.titleLabel);
    this.mainContainer.add(this.itemsContainer);

    scene.add.existing(this.mainContainer);

    this.populateItems();
    this.render();
  }


  populateItems() {
    this.itemsContainer.clear(true);
    showcase.getItems().forEach((item) => {
      const itemContainer = createVisualItem(this.scene, item, (container) => {
        moveItemContainer(container, this.itemsContainer, this.scene.inventoryWindow.itemsContainer);
        showcase.removeItem(item);
        inventory.addItem(item);
        this.scene.inventoryWindow.populateItems();
      });

      this.itemsContainer.add(itemContainer);
    });
    this.render();
  }

  addItem(item) {
    showcase.addItem(item);
    this.populateItems();
  }

  render() {
    this.mainContainer.layout();
  }
}
