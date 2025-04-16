import Phaser from "phaser";

export default class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, name, description) {
    super(scene, x, y, texture);
    this.name = name;
    this.description = description;

    scene.add.existing(this);

    this.setInteractive({ useHandCursor: true });

    this.on("pointerover", () => {
      scene.tweens.add({
        targets: this,
        scale: 0.7, // Aumenta o scale
        duration: 200, // Duração do tween em milissegundos
        ease: "Power2",
      });
      this.setDepth(100);
    });

    this.on("pointerout", () => {
      scene.tweens.add({
        targets: this,
        scale: 0.5, // Retorna ao scale original
        duration: 200, // Duração do tween em milissegundos
        ease: "Power2",
      });

      this.setDepth(1);
    });

    this.on("pointerdown", () => {
      this.applyEffect(); // Chama a função applyEffect
      this.removeFromHand(scene); // Remove a carta da mão
    });
  }

  removeFromHand(scene) {
    // Remove o sprite da cena e do array de cartas na mão
    scene.handSprites = scene.handSprites.filter((sprite) => sprite !== this);
    this.destroy(); // Remove o sprite da cena
    scene.updateHandLayout(); // Atualiza o layout da mão
    scene.drawCard(); // Compra uma nova carta
  }

  applyEffect() {
    console.log(`${this.name} effect applied!`);
    // Implementação do efeito da carta
  }
}
