import Phaser from "phaser";

export default class Card extends Phaser.GameObjects.Sprite {
  /**
   * @param {Phaser.Scene} Scene
   * @param {Number} x
   * @param {Number} y
   * @param {String} texture
   * @param {String} name
   * @param {String} description
   * */
  constructor(scene, x, y, texture, name, description) {
    super(scene, x, y, texture);
    this.name = name;
    this.description = description;

    scene.add.existing(this);

    this.setInteractive({ useHandCursor: true });

    // Cria a tooltip, mas deixa invisível inicialmente
    this.tooltip = scene.add.text(x, y - 50, this.description, {
      fontSize: "16px",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 5, y: 5 },
      align: "center",
    });
    this.tooltip.setOrigin(0.5);
    this.tooltip.setVisible(false);
    this.tooltip.setDepth(1000);

    this.on("pointerover", () => {
      scene.tweens.add({
        targets: this,
        scale: 0.7, // Aumenta o scale
        duration: 200, // Duração do tween em milissegundos
        ease: "Power2",
      });
      this.setDepth(100);

      // Exibe a tooltip e posiciona acima da carta
      this.tooltip.setPosition(this.x, this.y - 50);
      this.tooltip.setVisible(true);
    });

    this.on("pointerout", () => {
      scene.tweens.add({
        targets: this,
        scale: 0.5, // Retorna ao scale original
        duration: 200, // Duração do tween em milissegundos
        ease: "Power2",
      });

      this.setDepth(1);

      // Esconde a tooltip
      this.tooltip.setVisible(false);
    });

    this.on("pointerdown", () => {
      scene.sound.play("cardClick"); // Reproduz o som ao clicar na carta

      const currentCostumer = scene.queue.getCurrentCostumer();
      if (this.effect) {
        this.effect(scene.tradeManager || scene); // Passa o tradeManager ou a cena
      }

      this.removeFromHand(scene); // Remove a carta da mão
    });
  }

  removeFromHand(scene) {
    // Remove o sprite da cena e do array de cartas na mão
    scene.handSprites = scene.handSprites.filter((sprite) => sprite !== this);
    this.tooltip.destroy(); // Remove a tooltip
    this.destroy(); // Remove o sprite da cena
    scene.updateHandLayout(); // Atualiza o layout da mão
    scene.drawCard(); // Compra uma nova carta
  }

  /**
   * @param {Costumer} costumer
   */
  applyEffect(costumer) {
    console.log(`${this.name} effect applied!`);
    // Implementação do efeito da carta
  }
}
