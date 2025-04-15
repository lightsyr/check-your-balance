import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components";
import showCase from "../../data/showcase";
import inventory from "../../data/inventory";
import { moveItemContainer } from "../../utils/moveItemContainer";
import { createVisualItem } from "../../utils/createVisualItem";


export default function createItemBox(scene, inventoryWindowSizer) {
  const itemsBoxSizer = new Sizer(scene, {
    x: 1280 / 2,
    y: 720 - 60,
    anchor: "left",
    orientation: "horizontal",
    space: {
      item: 20,
    },
  });

  scene.add.existing(itemsBoxSizer);

  itemsBoxSizer.mount = () => {
    itemsBoxSizer.removeAll(true);

    showCase.getItems().forEach((item) => {
      const itemContainer = createVisualItem(scene, item, (container) => {
        moveItemContainer(container, itemsBoxSizer, inventoryWindowSizer);
        showCase.removeItem(item); // crie esse método se não existir
        inventory.addItem(item);
      });

      itemsBoxSizer.add(itemContainer);
    });

    itemsBoxSizer.layout();
  };

  return itemsBoxSizer;
}