import { GridSizer } from "phaser3-rex-plugins/templates/ui/ui-components";
import inventory from "../../data/inventory";
import showCase from "../../data/showcase";
import { moveItemContainer } from "../../utils/moveItemContainer";
import { createVisualItem } from "../../utils/createVisualItem";

export default function createInventoryWindow(scene, x, y) {
  const inventoryGrid = new GridSizer(scene, {
    x, y,
    anchor: "left-top",
    column: 5,
    row: 1,
    space: { column: 5, row: 5 },
  });

  scene.add.existing(inventoryGrid);

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

  return inventoryGrid;
}