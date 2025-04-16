import Phaser from "phaser";
import Card from "./card";

export default class handArea{
    /**
    *  @param {Phaser.Scene} scene 
    *  @param {Card[]} cards
    */
    constructor(scene, cards){
        this.scene = scene
        this.cards = cards
    }

    
}