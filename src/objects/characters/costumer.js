export default class Costumer extends Phaser.GameObjects.Sprite{
    /** 
    * @param {Phaser.Scene} scene - The scene the costumer belongs to.
    * @param {Queue} queue - The queue the costumer belongs to.
    * @param {TradeManager} tradeManager - The trade manager the costumer belongs to.
    * @param {number} paciencie - The costumer's paciencie.
    * @param {string} name - The costumer's name.
    * @param {string} sprite - The costumer's sprite. 
    */
    constructor(scene, queue, tradeManager, paciencie, name, sprite){
        super(scene, 0, 0, sprite)
        this.scene = scene
        this.queue = queue
        this.paciencie = paciencie
        this.name = name
        this.sprite = sprite
        this.tradeManager = tradeManager

        this.scene.add.existing(this)
    }
    

    tradeOffer(){

    }

    dealDamage(damage){
        this.paciencie -= damage

        if(this.paciencie <= 0){
            // remove o cliente da fila e toca o tween dele saindo da loja
            this.removeFromQueueAnimation()
            /* this.tradeManager.finishTrade({
                sucess: false
            }) */
        }
    }

    removeFromQueueAnimation(){
        // this.queue.remove(this)
        // this.queue.updateQueue()
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.destroy()
            }
        })
    }

    startPatienceCountdown() {
        this.scene.time.addEvent({
            delay: 1000, // Reduz a paciência a cada 1 segundo
            callback: () => {
                this.dealDamage(5); // Reduz 5 pontos de paciência
            },
            callbackScope: this,
            loop: true,
        });
    }
}