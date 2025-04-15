import itensCategories from "../data/itemCategories.json";
import items from "../data/items.json";
import inventory from "../data/inventory";
import { gameDificulty, startMoney } from "../data/globals";
import Window from "../objects/ui/window";
import MoneyWindow from "../objects/ui/moneyWindow";
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import createItemBox from "../objects/ui/itemBox";
import createMoneyWindows from "../objects/ui/moneyWindow";

export default class Pregame extends Phaser.Scene {
    constructor() {
        super({ key: "Pregame" });
    }

    preload() {
        // load the close button image
        this.load.image("close", "assets/images/ui/close.png");
        this.load.image("coin", "assets/images/ui/coin.png");
        this.load.image("item", "assets/images/items/Shirt_00.png");
    }

    create() {

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

            // get a random item from itens list based on category
            let randomItem = items.find(item => item.category == randomCategory.name)

            inventory.addItem(randomItem)
        }

        
        createMoneyWindows(this)

        createItemBox(this)

       /*  // add a text to the center of the screen
        const introText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 200, "Welcome to your first day, this is your inventory, choose 5 items to sell this day, this items gonna be your selling options for your next negotiations, click on the items to add them to your store showcase", {
                fontSize: "32px",
                fill: "#fff",
                backgroundColor: "#000",
                // set the wraping 
                wordWrap: { width: 1000, useAdvancedWrap: true },
            })
            .setOrigin(0.5, 0.5);


        // create the inventory windows
        const inventoryWindow = new Window(this, this.cameras.main.centerX, this.cameras.main.centerY + 100, 360, 240, false);

        inventoryWindow.setVisible(false)

        const moneyWindow = new MoneyWindow(this, this.cameras.default.width - 150, 100, 200, 100);
        moneyWindow.setVisible(false)

        const inventoryText = this.add.text(0,0, "Inventory", {
            fontSize: "32px",
            fill: "#fff",
            // set the wraping 
            wordWrap: { width: 600, useAdvancedWrap: true },
        })

        inventoryWindow.addItem(inventoryText)

        // add a timer to remove the tutorial text and push the window up
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                inventoryWindow.setVisible(true)
                moneyWindow.setVisible(true)
                this.tweens.add({
                    targets: introText,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        introText.destroy();
                        
                    }
                });

                this.tweens.add({
                    targets: inventoryWindow,
                    y: this.cameras.main.centerY - 50,
                    duration: 1000,
                });

               
            },
            callbackScope: this
        });

        // temporary items array
        const itemsArray = [];

        // create a item sprite for each item in the inventory
        inventory.items.forEach(item => {
            // create a item sprite for each item
            const itemSprite = this.add.image(0, 0, "item").setOrigin(0.5, 0.5).setScale(0.5);
            itemSprite.setInteractive({ useHandCursor: true })
            // add the item sprite to the items array
            itemsArray.push(itemSprite)

        })

        // add a item box on the bottom of the game screen
        const bottomItemBox = new ItemBox(this, this.cameras.main.centerX, this.cameras.main.height - 100,  itemsArray );  */
        
        
    }

    update() {
        
    }
 }