import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { startMoney } from "../../data/globals";

export default function createMoneyWindows(scene) {
  let moneyWindowSizer = new Sizer(scene, {
    anchor: "left",
    x: 1280 - 180,
    y: 60,
    orientation: "x",
    space: {
      item: 10,
    },
  });

  moneyWindowSizer.addBackground(
    scene.add.rectangle(
      0,
      0,
      moneyWindowSizer.width + 10,
      moneyWindowSizer.height + 10,
      0x222222,
      0.95
    )
  );

  const moneyIcon = scene.add.image(0, 0, "coin").setScale(0.2);

  moneyWindowSizer.add(moneyIcon);

  const moneyText = scene.add.text(0, 0, "$Money:" + startMoney, {
    color: "#fff",
    fontSize: "32px",
  });

  moneyWindowSizer.add(moneyText);

  scene.add.existing(moneyWindowSizer);

  moneyWindowSizer.layout();

  return moneyWindowSizer
}
