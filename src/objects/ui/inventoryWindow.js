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
 * @return {GridSizer} The created inventory window.
*/
export default function createInventoryWindow(scene, x, y) {

  const mainContainer = new Sizer(scene, {
    x,
    y,
    width: 600, // Define uma largura fixa (ajuste como quiser)
    height: 200, // Define uma altura mínima
    orientation: "vertical",
    anchor: "center",
    space: {
      item: 10
    }
  });

  const titleLabel = new Label(scene, {
    align: "center",
    text: scene.add.text(0, 0, "Inventory",{
      fontSize: "20px",
      color: "#ffffff",
    }),
  })

  const inventoryGrid = new GridSizer(scene, {
    x, y,
    anchor: "left-top",
    column: 5,
    row: 1,
    space: { column: 5, row: 5 },
  });

 

  let itemsBoxSizer;

  inventoryGrid.setItemBox = (itemBox) => {
    itemsBoxSizer = itemBox;
  };

  inventoryGrid.mount = () => {
    inventoryGrid.removeAll(true);

    inventory.getItems().forEach((item) => {
      const itemContainer = createVisualItem(scene, item, (container) => {
        moveItemContainer(container, inventoryGrid, itemsBoxSizer);
        inventory.removeItem(item);
        showCase.addItem(item); // crie esse método se não existir
      });

      inventoryGrid.add(itemContainer);
    });

    inventoryGrid.layout();
  };

  mainContainer.add(titleLabel, { expand: false, proportion: 0 });
  mainContainer.add(inventoryGrid, { expand: true, proportion: 1 });
  mainContainer.layout();
  scene.add.existing(mainContainer);
  return inventoryGrid;
}