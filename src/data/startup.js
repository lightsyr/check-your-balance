// startup.js
import inventory from "./inventory";
import showCase from "./showcase";
import { gameDificulty } from "../data/globals";
import items from "../data/items.json"; // todos os itens disponíveis

let initialized = false;

export function initializeGameState() {
  if (initialized) return;

  // Define tamanhos do inventário por dificuldade
  const inventorySizes = {
    easy: 15,
    normal: 10,
    hard: 5,
  };

  const maxInventory = inventorySizes[gameDificulty] || 10;

  // Limpa a vitrine e inventário
  inventory.clear();
  showCase.clear();

  // Cria uma cópia dos itens para evitar duplicações e sortear
  const shuffledItems = [...items].sort(() => 0.5 - Math.random());

  // Adiciona os primeiros `maxInventory` itens ao inventário
  for (let i = 0; i < maxInventory; i++) {
    const item = shuffledItems[i];
    if (item) {
      inventory.addItem(item);
    }
  }

  initialized = true;
}