export default class TradeManager {
  constructor(scene, queue, gameDifficulty, startMoney, showcase) {
    this.scene = scene;
    this.queue = queue;
    this.gameDifficulty = gameDifficulty;
    this.money = startMoney;
    this.currentCostumer = null;
    this.currentItem = null; // Item atualmente em negociação
    this.showcase = showcase; // Referência à vitrine
    this.state = "startingTrade";
  }

  startTrade() {
    if (this.queue.getCurrentCostumer() && this.showcase.getItems().length > 0) {
      this.currentCostumer = this.queue.getCurrentCostumer();
      this.currentItem = this.showcase.getItems()[0]; // Seleciona o primeiro item da vitrine
      console.log(`Negotiating item: ${this.currentItem.name} with price ${this.currentItem.value}`);
      this.currentCostumer.tradeOffer();
    } else {
      console.log("No customers or items available for trade.");
    }
  }

  finishTrade(success) {
    if (success) {
      this.money += this.currentItem.value; // Adiciona o preço do item ao dinheiro do jogador
      console.log(`Trade successful! Earned ${this.currentItem.value}. Total money: ${this.money}`);
      this.showcase.removeItem(0); // Remove o item negociado da vitrine
      this.queue.remove(this.currentCostumer); // Remove o cliente atual da fila
      this.currentCostumer = null;
      this.currentItem = null; // Limpa o item atual
    } else {
      console.log("Trade failed. Customer left.");
      this.queue.remove(this.currentCostumer); // Remove o cliente atual da fila
      this.currentCostumer = null;
    }
  }
}