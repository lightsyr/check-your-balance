import Phaser from "phaser";

export default class Menu extends Phaser.Scene{
    constructor(){
        super({key: "Menu"});
    }

    preload(){

    }

    create(){
        // add a text to the center of the screen
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Menu", {
            fontSize: "64px",
            fill: "#fff",
        }).setOrigin(0.5, 0.5);
    }

    update(){

    }
}