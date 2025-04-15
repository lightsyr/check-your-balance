export default class tradeManager{
    constructor(scene, queue, gameDifficulty, startMoney){
        this.scene = scene
        this.queue = queue
        this.gameDifficulty = gameDifficulty
        this.startMoney = startMoney
        this.money = startMoney
        this.currentCostumer = null
    }

    startTrade(){
        if(this.queue.getCurrentCostumer()){
            this.currentCostumer = this.queue.getCurrentCostumer()
            this.currentCostumer.tradeOffer()
        }
    }

    finishTrade(result){
        if(result.sucess){
            // add money to player
            this.money += 10
            this.queue.remove(this.currentCostumer)
            this.currentCostumer.removeFromQueueAnimation()
            this.currentCostumer = null
        }else{
            // remove money from player
            this.money -= 10
            if(this.money <= 0){
                // game over
                console.log("Game Over")
                this.scene.scene.start("GameOverScene")
            }
        }
    }
}