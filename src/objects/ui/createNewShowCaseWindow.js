import Phaser from "phaser";
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components";

/**
 * Create a new show case window
 * @param {Phaser.Scene} scene - The scene to which the show case window belongs.
 * @param {number} x - The x position of the show case window.
 * @param {number} y - The y position of the show case window.
 * @return {Sizer}
 */
export default function createNewShowCaseWindow(scene, x, y) {
  const mainContainer = new Sizer(scene, {
    x,
    y,
    width: 480,
    height: 120,
    orientation: "vertical",
    anchor: "center",
    space: {
      item: 10,
    },
  });

  const itemsContainer = new Sizer(scene, {
    x,
    y,
    width: 480,
    height: 96,
    orientation: "vertical",
    anchor: "center",
    space: {
      item: 10,
    },
  });

  const titleLabel = scene.add.text(0, 0, "Show Case", {
    fontSize: "20px",
    color: "#ffffff",
  });

  titleLabel.setDepth(1);

  const mainBackground = scene.add.rectangle(
    0,
    0,
    mainContainer.width,
    mainContainer.height,
    0x000000,
    0.5
  );

  mainContainer.addBackground(mainBackground);
  mainContainer.add(titleLabel);
  mainContainer.add(itemsContainer);

  scene.add.existing(mainContainer);
  mainContainer.layout();

  return mainContainer;
}
