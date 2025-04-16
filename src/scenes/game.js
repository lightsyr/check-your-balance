import Phaser from "phaser";
import Queue from "../objects/system/queue";
import showcase from "../data/showcase";
import cards from "../data/cards";
import Card from "../objects/system/card";
import Deck from "../objects/system/deck";
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    // Load assets here
    this.load.image("costumer", "assets/images/characters/costumer.png");
    this.load.image("game_stage", "assets/images/backgrounds/game_stage.png");
    this.load.image("player", "assets/images/characters/player.png");
    this.load.image("card", "assets/images/ui/card.png");
  }

  create() {
    this.add.image(1280 / 2, 720 / 2, "game_stage").setOrigin(0.5);
    this.add.image(180, 400, "player").setOrigin(0.5);

    this.deckOfCards = new Deck(cards); // Armazena o baralho na cena
    this.deckOfCards.shuffle();

    const hand = this.deckOfCards.dealHand(5); // Compra 5 cartas para a mão

    this.handSprites = []; // Array para armazenar os sprites das cartas na mão

    const centerX = 1280 / 2; // Centro da tela
    const centerY = 600; // Posição vertical da mão

    // Adiciona o trade manager e a fila de clientes
    this.queue = new Queue(this, showcase.getItems().length);
    this.queue.updateQueue();

    // cria um sizer para representar a mão de cartas
    const handSizer = new Sizer(this, {
      x: centerX, // Centraliza o Sizer horizontalmente
      y: centerY, // Define a posição vertical do Sizer
      orientation: "horizontal", // Orientação horizontal
      space: {
        item: 10, // Espaçamento entre os itens
      }
    });

    hand.forEach((card) => {
      const cardSprite = new Card(
        this,
        0, // A posição será gerenciada pelo Sizer
        0,
        "card",
        card.name,
        card.description
      );
      cardSprite.setScale(0.5);
      cardSprite.setOrigin(0.5);

      handSizer.add(cardSprite, {
        proportion: 0, // Proporção de redimensionamento (0 para manter o tamanho fixo)
        align: "center", // Alinha o item ao centro
        padding: { left: 10, right: 10 }, // Espaçamento interno opcional
      });

      this.handSprites.push(cardSprite); // Adiciona o sprite ao array
    });

    handSizer.layout(); // Atualiza o layout do Sizer
  }

  updateHandLayout() {
    const cardSpacing = 200; // Espaçamento fixo entre as cartas
    const startX = 1280 / 2 - ((this.handSprites.length - 1) * cardSpacing) / 2; // Recalcula a posição inicial

    this.handSprites.forEach((cardSprite, index) => {
      const x = startX + index * cardSpacing; // Recalcula a posição x de cada carta
      const y = 600; // Mantém a posição vertical fixa

      this.tweens.add({
        targets: cardSprite,
        x: x,
        y: y,
        duration: 300, // Animação suave ao reposicionar as cartas
        ease: "Power2",
      });
    });
  }

  drawCard() {
    if (this.deckOfCards.remainingCards() > 0) {
      const newCard = this.deckOfCards.drawCard(); // Compra uma carta do baralho

      const cardSprite = new Card(
        this,
        0, // A posição será ajustada pelo layout
        0,
        "card",
        newCard.name,
        newCard.description
      );
      cardSprite.setScale(0.5);
      cardSprite.setOrigin(0.5);

      this.handSprites.push(cardSprite); // Adiciona a nova carta ao array de sprites
      this.updateHandLayout(); // Atualiza o layout da mão
    } else {
      console.log("O baralho está vazio!"); // Mensagem caso o baralho esteja vazio
    }
  }
}
