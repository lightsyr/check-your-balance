import { GridSizer } from "phaser3-rex-plugins/templates/ui/ui-components";
import inventory from "../../data/inventory";

export default function createInventoryWindow(scene, x, y) {
  // Cria o GridSizer para o inventário
  const inventoryGrid = new GridSizer(scene, {
    x: x,
    y: y,
    anchor: "left-top",
    column: 5,  // 5 colunas por linha
    row: 1,     // Começa com 1 linha (vai aumentar conforme adiciona itens)
    space: {
      column: 5, // Espaçamento entre as colunas
      row: 5,    // Espaçamento entre as linhas
    },
  });

  // Adiciona o GridSizer na cena
  scene.add.existing(inventoryGrid);

  // Cria o background do inventário, ajustando o tamanho
  const background = scene.add.rectangle(
    0, 0,
    700, 300, // Defina o tamanho de acordo com o seu layout
    0x222222,  // Cor de fundo
    1          // Opacidade
  );

  // Adiciona o background corretamente ao GridSizer
  inventoryGrid.addBackground(background);

  // Atualiza o layout do GridSizer após adicionar o background
  inventoryGrid.layout();

  return inventoryGrid;
}
