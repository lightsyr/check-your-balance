import Phaser from "phaser";

export default class Item extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, id, value, category, rarity, description) {
    super(scene, x, y, texture, frame);

    // add the sprite to the scene
    scene.add.existing(this);

    this.id = id;
    this.value = value;
    this.category = category;
    this.rarity = rarity;
    this.description = description
  }

  
}
