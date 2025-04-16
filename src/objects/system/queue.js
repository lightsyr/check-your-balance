import Costumer from "../characters/costumer"

export default class Queue{
    /** 
     * @param {Phaser.Scene} scene - The scene the queue belongs to.
     * @param {number} size - The size of the queue.
     * @param {TradeManager} tradeManager - The trade manager the queue belongs to.
    */
    constructor(scene, size, tradeManager){
        this.scene = scene
        this.queue = []
        this.currentCostumer = null
        this.tradeManager = tradeManager

        for(let i = 0; i < size; i++){
            const costumer = new Costumer(this.scene, this, this.tradeManager, Math.random() * 100, "Teste", "costumer") 
            this.add(costumer)
        }
    }
    add(costumer){
        this.queue.push(costumer)
    }
    remove(costumer){
        this.queue = this.queue.filter(c => c !== costumer)
    }
    updateQueue(){
        this.queue.forEach((costumer, index) => {
            costumer.setPosition(500 + index * 200, this.scene.cameras.main.height / 2 + 100)
        })
    }
    getCurrentCostumer(){
        return this.queue[0]
    }
}