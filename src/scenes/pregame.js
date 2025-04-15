import itensCategories from "../data/itemCategories.json";
import items from "../data/items.json";
import inventory from "../data/inventory";
import { gameDificulty } from "../data/globals";

export default class Pregame extends Phaser.Scene {
    constructor() {
        super({ key: "Pregame" });
    }

    preload() {

        let maxInventory = 0

        if(gameDificulty == "easy"){
            maxInventory = 15
        }else if(gameDificulty == "normal"){
            maxInventory = 10
        }else if(gameDificulty == "hard"){
            maxInventory = 5
        }

        for(let i = 1; i <= maxInventory; i++){

            
            // get a random item from the itensCategories array
            let randomCategory = itensCategories[Math.floor(Math.random() * itensCategories.length)];

            console.log(randomCategory)

            // get a random item from itens list based on category
            let randomItem = items.find(item => item.category == randomCategory.name)

            inventory.addItem(randomItem)
        }

    }

    create() {
        
    }

    update() {

    }
 }