import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { Label } from "phaser3-rex-plugins/templates/ui/ui-components";
import showCase from "../../data/showcase";
import inventory from "../../data/inventory";
import { moveItemContainer } from "../../utils/moveItemContainer";
import { createVisualItem } from "../../utils/createVisualItem";


export default function createItemBox(scene, inventoryWindowSizer) {
  
  const mainContainer = new Sizer(scene, {
    x: 1280 / 2,
    y: 720 / 2 + 200,
    width: 600,
    height: 200,
    orientation: 1, // Use 1 ao invés de "vertical"
    anchor: "center",
    space: {
      item: 10
    }
  });
  
  const itemsBoxSizer = new Sizer(scene, {
    x: 1280 / 2,
    y: 720 - 60,
    anchor: "left",
    orientation: "horizontal",
    space: {
      item: 20,
    },
  });
  
  const titleLabel = new Label(scene, {
    align: "center",
    text: scene.add.text(0, 0, "Showcase", {
      fontSize: "20px",
      color: "#ffffff",
    }),
  });
  
  mainContainer.add(titleLabel)
  mainContainer.add(itemsBoxSizer)

  scene.add.existing(mainContainer);

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

    mainContainer.layout();
  };

  return itemsBoxSizer;
}