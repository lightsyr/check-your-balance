import inventory from "../data/inventory";

/**
 * Mover o contêiner de um item de um sizer para outro, e vice-versa
 * @param {Phaser.GameObjects.Container} itemContainer - O contêiner que envolve o item.
 * @param {Sizer} fromSizer - O sizer original.
 * @param {Sizer} toSizer - O sizer para o qual o item será movido.
 */
export function moveItemContainer(itemContainer, fromSizer, toSizer) {
  // Verifica se o item está no sizer de origem ou destino
  if (fromSizer.contains(itemContainer)) {
    // Se estiver no sizer de origem, mova para o sizer de destino
    fromSizer.remove(itemContainer);
    toSizer.add(itemContainer);
  } else if (toSizer.contains(itemContainer)) {
    // Se estiver no sizer de destino, mova de volta para o sizer de origem
    toSizer.remove(itemContainer);
    fromSizer.add(itemContainer);
  }

 

  // Atualiza os layouts de ambos os sizers após mover o item
  fromSizer.layout();
  toSizer.layout();
}
