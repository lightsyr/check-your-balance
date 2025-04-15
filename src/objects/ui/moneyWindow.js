import Window from "./window";
import { startMoney } from "../../data/globals";

export default class MoneyWindow extends Window{
    /**
     * * Create a money window
     * @param {Phaser.Scene} scene - The scene to which the window will be added.
     * @param {number} x - The x position of the window.
     * @param {number} y - The y position of the window.
     * @param {number} width - The width of the window.
     * @param {number} height - The height of the window.
     *  */
    constructor(scene, x, y, width = 300, height = 200,){
        super(scene, x, y, width, height, false);
        this.scene = scene;

        // create the money text and add to money window
        const moneyText = this.scene.add.text(0, 0, "Money:" + startMoney, {
            fontSize: "16px",
            fill: "#fff",
            // set the wraping 
            wordWrap: { width: 1000, useAdvancedWrap: true },
        })

        this.addItem(moneyText)
        
        // create money sprite
        const coinSprite = this.scene.add.image(0, 0, "coin").setOrigin(0.5, 0.5).setScale(0.2);
        this.addItem(coinSprite)


        moneyText.setPosition(coinSprite.x + 25, 0)
        
    }
}