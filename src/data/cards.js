import Costumer from "../objects/characters/costumer";

const cards = [
  {
    name: "Increase Patience",
    description: "Increases the patience of the current customer by 20.",
    effect: (costumer) => {
      costumer.paciencie += 20;
      console.log(`${costumer.name}'s patience increased to ${costumer.paciencie}`);
    },
  },
  {
    name: "Raise Price",
    description: "Increases the price of the item by 50.",
    effect: (tradeManager) => {
      if (tradeManager.currentItem) {
        tradeManager.currentItem.value += 50; // Atualiza o valor do item atual
        console.log(`Price increased to ${tradeManager.currentItem.value}`);
      } else {
        console.log("No item is currently being negotiated.");
      }
    },
  },
  {
    name: "Extra Time",
    description: "Adds 10 seconds to the negotiation timer.",
    effect: (scene) => {
      scene.timer += 10;
      console.log(`Time increased to ${scene.timer} seconds`);
    },
  },
];

export default cards;