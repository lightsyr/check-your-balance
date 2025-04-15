import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components";

/**
 * Move an item container between two sizers.
 * @param {Phaser.GameObjects.Container} itemContainer - The container wrapping the item.
 * @param {Sizer} fromSizer - The source sizer.
 * @param {Sizer} toSizer - The target sizer.
 */
export function moveItemContainer(itemContainer, fromSizer, toSizer) {
  if (fromSizer.contains(itemContainer)) {
    fromSizer.remove(itemContainer);
    toSizer.add(itemContainer);
  } else if (toSizer.contains(itemContainer)) {
    toSizer.remove(itemContainer);
    fromSizer.add(itemContainer);
  }

  fromSizer.layout();
  toSizer.layout();
}
