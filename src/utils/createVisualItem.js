// utils/createVisualItem.js
/** 
 * Creates a visual representation of an item in the game.
 * * @param {Phaser.Scene} scene - The scene to which the item belongs.
 * * @param {Object} item - The item to be represented.
 * * @param {Function} onClick - The function to be called when the item is clicked.
 * * @return {Phaser.GameObjects.Container} The created visual item container.
*/
export function createVisualItem(scene, item, onClick) {
    const container = scene.add.container(0, 0);
  
    const itemImage = scene.add.image(0, 0, "item");
    itemImage.setInteractive({ useHandCursor: true });
  
    const hoverBorder = scene.add.rectangle(0, 0, itemImage.width + 4, itemImage.height + 4);
    hoverBorder.setStrokeStyle(2, 0xffffff);
    hoverBorder.setVisible(false);
  
    const tooltip = scene.add
      .text(0, 0, item?.name || "Item sem nome", {
        fontSize: "16px",
        fill: "#fff",
        backgroundColor: "#000",
        padding: { x: 5, y: 5 },
      })
      .setOrigin(0.5, 0)
      .setVisible(false)
      .setScrollFactor(0);
  
    container.add([hoverBorder, itemImage, tooltip]);
    container.setSize(itemImage.width, itemImage.height);
  
    tooltip.setDepth(1);
    hoverBorder.setDepth(0);
    itemImage.setDepth(0);
  
    itemImage.on("pointerdown", () => onClick(container));
    itemImage.on("pointerover", () => {
      hoverBorder.setVisible(true);
      tooltip.setVisible(true);
      tooltip.setPosition(itemImage.x, itemImage.y - itemImage.height / 2 - 10);
    });
    itemImage.on("pointerout", () => {
      hoverBorder.setVisible(false);
      tooltip.setVisible(false);
    });

  
    return container;
  }