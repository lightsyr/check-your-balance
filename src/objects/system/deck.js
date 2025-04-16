import Card from "./card";

// Deck Class
export default class Deck {
  /**
   * @param {Card[]} cards
   */
  constructor(cards) {
    this.cards = cards;
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
