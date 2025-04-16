import Card from "./card";

export default class Deck {
  /**
   * @param {Object[]} cardsData - Array de objetos representando as cartas.
   */
  constructor(cardsData) {
    this.cards = [];

    // Adiciona 4 cópias de cada carta ao deck
    cardsData.forEach((cardData) => {
      for (let i = 0; i < 4; i++) {
        this.cards.push({ ...cardData }); // Cria uma cópia da carta
      }
    });
  }

  addCard(card) {
    this.cards.push(card);
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawCard() {
    return this.cards.pop();
  }

  remainingCards() {
    return this.cards.length;
  }

  reset(initialCards) {
    this.cards = [...initialCards];
    this.shuffle();
  }

  dealHand(handSize) {
    if (handSize > this.remainingCards()) {
      throw new Error("Not enough cards to deal the requested hand size.");
    }
    const hand = [];
    for (let i = 0; i < handSize; i++) {
      hand.push(this.drawCard());
    }
    return hand;
  }
}
