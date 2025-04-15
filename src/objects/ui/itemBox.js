import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import inventory from "../../data/inventory";
import { moveItemContainer } from "../../utils/moveItemContainer";

/** 
* Cria uma caixa de itens para gerenciar a vitrine do inventário
* @param {Phaser.Scene} scene 
* @param {Sizer} inventoryWindowSizer 
*/
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

  inventory.items.forEach((item) => {
    const itemContainer = scene.add.container(0, 0);

    const itemImage = scene.add.image(0, 0, "item");
    itemImage.setInteractive({ useHandCursor: true });

    // Borda de hover (invisível por padrão)
    const hoverBorder = scene.add.rectangle(0, 0, itemImage.width + 4, itemImage.height + 4);
    hoverBorder.setStrokeStyle(2, 0xffffff); // 2px branco
    hoverBorder.setVisible(false);

    // Tooltip (invisível por padrão)
    const tooltip = scene.add.text(0, 0, item.name, {
      fontSize: "16px",
      fill: "#fff",
      backgroundColor: "#000",
      padding: { x: 5, y: 5 },
    }).setOrigin(0.5, 0).setVisible(false); // Inicialmente invisível

    itemContainer.add([hoverBorder, itemImage, tooltip]);
    itemContainer.setSize(itemImage.width, itemImage.height);

    // Certifique-se de que a tooltip está acima da imagem e da borda
    tooltip.setDepth(1);  // A profundidade da tooltip será maior que a da imagem e da borda
    hoverBorder.setDepth(0); // A borda de hover fica abaixo da imagem
    itemImage.setDepth(0);   // A imagem também fica abaixo da tooltip

    itemsBoxSizer.add(itemContainer);

    // Lógica para mover os itens entre sizers
    itemImage.on("pointerdown", () => {
      moveItemContainer(itemContainer, itemsBoxSizer, inventoryWindowSizer);
    });

    // Lógica para exibir a tooltip ao passar o mouse
    itemImage.on("pointerover", () => {
      hoverBorder.setVisible(true);
      tooltip.setVisible(true);
      tooltip.setPosition(itemImage.x, itemImage.y - itemImage.height / 2 - 10); // Posiciona a tooltip acima da imagem
    });

    // Lógica para ocultar a tooltip quando o mouse sair
    itemImage.on("pointerout", () => {
      hoverBorder.setVisible(false);
      tooltip.setVisible(false);
    });
  });

  itemsBoxSizer.layout();

  return itemsBoxSizer;
}
