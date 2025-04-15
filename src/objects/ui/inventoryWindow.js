import { GridSizer, Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components";
import inventory from "../../data/inventory";
import showCase from "../../data/showcase";
import { moveItemContainer } from "../../utils/moveItemContainer";
import { createVisualItem } from "../../utils/createVisualItem";

/**
 * Creates an inventory window for the game.
 * 
 * @param {Phaser.Scene} scene - The scene to which the inventory window belongs.
 * @param {number} x - The x position of the inventory window.
 * @param {number} y - The y position of the inventory window.
 * @return {GridSizer & { setItemBox: Function, mount: Function }} The created inventory window with added methods.
 */
export default function createInventoryWindow(scene, x, y) {
  const mainContainer = new Sizer(scene, {
    x,
    y,
    width: 600,
    height: 200,
    orientation: 1, // Use 1 ao invés de "vertical"
    anchor: "center",
    space: {
      item: 10
    }
  });

  const titleLabel = new Label(scene, {
    align: "center",
    text: scene.add.text(0, 0, "Inventory", {
      fontSize: "20px",
      color: "#ffffff",
    }),
  });

  const inventoryGrid = new GridSizer(scene, {
    x: 0,
    y: 0,
    anchor: "center",
    column: 5,
    row: 1,
    space: { column: 5, row: 5 },
  });

  const background = scene.add.rectangle(0, 0, 600, 200, 0x222222)
    .setStrokeStyle(2, 0xffffff); // opcional: borda branca

  mainContainer.addBackground(background);

  // Métodos adicionados ao GridSizer
  let itemsBoxSizer = null;

  inventoryGrid.setItemBox = (itemBox) => {
    itemsBoxSizer = itemBox;
  };

  inventoryGrid.mount = () => {
    inventoryGrid.removeAll(true);

    inventory.getItems().forEach((item) => {
      const itemContainer = createVisualItem(scene, item, (container) => {
        moveItemContainer(container, inventoryGrid, itemsBoxSizer);
        inventory.removeItem(item);
        showCase.addItem(item); // Certifique-se de que esse método existe
        itemsBoxSizer.mount(); // Re-renderiza vitrine após movimento
      });

      inventoryGrid.add(itemContainer);
    });

    inventoryGrid.layout();
  };

  mainContainer.add(titleLabel, { expand: false });
  mainContainer.add(inventoryGrid, { expand: true });
  mainContainer.layout();

  scene.add.existing(mainContainer);
  return inventoryGrid;
}
