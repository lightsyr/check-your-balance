const inventory = [];

export default {
  addItem(item) {
    inventory.push(item);
  },
  clear() {
    inventory.length = 0;
  },
  getItems() {
    return [...inventory];
  },
  removeItem(index) {
    inventory.splice(index, 1);
  },
};
