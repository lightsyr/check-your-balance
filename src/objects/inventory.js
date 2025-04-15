export default class Inventory {
    constructor(items, maxItems){
        this.items = []; // array of items
        this.maxItems = maxItems; // maximum number of items in the inventory
        this.currentItems = 0; // current number of items in the inventory
    }   

    addItem(item) {
        // add the item to the inventory
        this.items.push(item)
    }
    removeItem(item) {
        // remove the item from the inventory
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
}