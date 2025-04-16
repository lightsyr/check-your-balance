import Phaser from "phaser";
import Queue from "../objects/system/queue";
import showcase from "../data/showcase";
import cards from "../data/cards";
import Card from "../objects/system/card";
import Deck from "../objects/system/deck";
import { Sizer, GridSizer } from "phaser3-rex-plugins/templates/ui/ui-components";
import TradeManager from "../objects/system/tradeManager";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.playerMoney = 0; // Dinheiro inicial do jogador
    this.timer = 300; // Tempo inicial do dia (5 minutos)
  }

  preload() {
    // Carrega os recursos necessários
    this.load.image("costumer", "assets/images/characters/costumer.png");
    this.load.image("game_stage", "assets/images/backgrounds/game_stage.png");
    this.load.image("player", "assets/images/characters/player.png");
    this.load.image("card", "assets/images/ui/card.png");
    this.load.audio("cardClick", "assets/sounds/card.mp3");
  }

  create() {
    // Configura o cenário
    this.add.image(1280 / 2, 720 / 2, "game_stage").setOrigin(0.5);
    this.add.image(180, 400, "player").setOrigin(0.5);

    // Inicializa o baralho e embaralha
    this.deckOfCards = new Deck(cards);
    this.deckOfCards.shuffle();

    // Compra as cartas iniciais
    const hand = this.deckOfCards.dealHand(5);
    this.handSprites = [];

    // Configura o layout da mão
    const centerX = 1280 / 2;
    const centerY = 600;
    const handSizer = new Sizer(this, {
      x: centerX,
      y: centerY,
      orientation: "horizontal",
      space: { item: 10 },
    });

    hand.forEach((card) => {
      const cardSprite = new Card(
        this,
        0,
        0,
        "card",
        card.name,
        card.description
      );
      cardSprite.effect = card.effect;
      cardSprite.setScale(0.5);
      cardSprite.setOrigin(0.5);

      handSizer.add(cardSprite, {
        proportion: 0,
        align: "center",
        padding: { left: 10, right: 10 },
      });

      this.handSprites.push(cardSprite);
    });

    handSizer.layout();

    // Inicializa a fila de clientes
    this.queue = new Queue(this, showcase.getItems().length);
    this.queue.updateQueue(); // Atualiza a posição inicial da fila

    // Inicializa o gerenciador de trade
    this.tradeManager = new TradeManager(this, this.queue, "normal", 100, showcase);

    // Inicia a negociação com o primeiro cliente e item
    this.tradeManager.startTrade();

    // Botão "Make Deal"
    this.add
      .text(200, 200, "Make Deal", {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#007bff",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.tradeManager.finishTrade(true); // Finaliza a negociação com sucesso
        this.tradeManager.startTrade(); // Inicia a próxima negociação
      });

    // Texto do cronômetro
    this.timerText = this.add.text(640, 50, this.formatTime(this.timer), {
      fontSize: "32px",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5);

    // Configura o cronômetro do dia
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timer--;
        this.timerText.setText(this.formatTime(this.timer)); // Atualiza o texto do cronômetro
        if (this.timer <= 0) {
          this.endDay();
        }
      },
      callbackScope: this,
      loop: true,
    });

    // Configura o layout da vitrine (showcase)
    this.showcaseGrid = new GridSizer(this, {
      x: 640, // Posição central na tela
      y: 200, // Posição vertical
      column: 3, // Número de colunas
      row: Math.ceil(showcase.getItems().length / 3), // Calcula o número de linhas com base nos itens
      space: {
        column: 2, // Espaçamento entre colunas
        row: 2, // Espaçamento entre linhas
      },
    });

    // Adiciona os itens da vitrine à grade
    showcase.getItems().forEach((item, index) => {
      const itemText = this.add.text(0, 0, `${item.name}\n$${item.value}`, {
        fontSize: "20px",
        color: "#ffffff",
        backgroundColor: "#333333",
        padding: { x: 10, y: 5 },
        align: "center",
      }).setOrigin(0.5);

      this.showcaseGrid.add(itemText, {
        column: index % 3, // Calcula a coluna com base no índice
        row: Math.floor(index / 3), // Calcula a linha com base no índice
        align: "center",
      });
    });

    this.showcaseGrid.layout(); // Atualiza o layout da grade
  }

  updateHandLayout() {
    const cardSpacing = 200;
    const startX =
      1280 / 2 - ((this.handSprites.length - 1) * cardSpacing) / 2;

    this.handSprites.forEach((cardSprite, index) => {
      const x = startX + index * cardSpacing;
      const y = 600;

      this.tweens.add({
        targets: cardSprite,
        x: x,
        y: y,
        duration: 300,
        ease: "Power2",
      });
    });
  }

  drawCard() {
    if (this.deckOfCards.remainingCards() > 0) {
      const newCard = this.deckOfCards.drawCard();

      const cardSprite = new Card(
        this,
        0,
        0,
        "card",
        newCard.name,
        newCard.description
      );
      cardSprite.effect = newCard.effect;
      cardSprite.setScale(0.5);
      cardSprite.setOrigin(0.5);

      this.handSprites.push(cardSprite);
      this.updateHandLayout();
    } else {
      console.log("O baralho está vazio!");
    }
  }

  makeDeal() {
    const currentCostumer = this.queue.getCurrentCostumer();
    if (currentCostumer && this.tradeManager.currentItem) {
      // Remove o cliente da fila
      this.queue.remove(currentCostumer);
      this.queue.updateQueue();

      // Remove o item da GridSizer
      const currentItemIndex = showcase.getItems().indexOf(this.tradeManager.currentItem);
      if (currentItemIndex !== -1) {
        const itemText = this.showcaseGrid.getChildByIndex(currentItemIndex);
        this.showcaseGrid.remove(itemText, true); // Remove o texto da GridSizer
        showcase.removeItem(currentItemIndex); // Remove o item da vitrine
      }

      // Adiciona o lucro ao jogador
      this.playerMoney += this.tradeManager.currentItem.value;
      console.log(`Deal made! Current money: ${this.playerMoney}`);

      // Atualiza a negociação
      this.tradeManager.finishTrade(true);
      this.tradeManager.startTrade();
    }
  }

  endDay() {
    console.log("The day is over! Total money earned:", this.playerMoney);
    // Adicione lógica para exibir uma tela de resumo ou reiniciar o jogo
  }

  // Método para formatar o tempo em hh:mm:ss
  formatTime(seconds) {
    if (isNaN(seconds)) {
      console.error("Invalid timer value:", seconds);
      return "00:00:00"; // Retorna um valor padrão em caso de erro
    }
    const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  }
}