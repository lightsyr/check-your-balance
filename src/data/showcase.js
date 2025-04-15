const showCase = [];

export default {
  addItem(item) {
    showCase.push(item);
  },
  clear() {
    showCase.length = 0;
  },
  getItems() {
    return [...showCase];
  },
  removeItem(index) {
    showCase.splice(index, 1);
  },
};