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
    remove(costumer) {
        this.scene.tweens.add({
            targets: costumer,
            alpha: 0, // Reduz a opacidade até 0
            duration: 500, // Duração do tween em milissegundos
            ease: "Power2",
            onComplete: () => {
                // Após o tween, remove o cliente da fila
                this.queue = this.queue.filter((c) => c !== costumer);
                costumer.destroy(); // Remove o objeto da cena
                this.updateQueue(); // Atualiza a fila
            },
        });
    }
    updateQueue() {
        const startX = 430; // Posição inicial no eixo X
        const startY = 400; // Posição no eixo Y
        const spacing = 150; // Espaçamento entre os clientes

        this.queue.forEach((costumer, index) => {
            costumer.setPosition(startX + index * spacing, startY); // Posiciona os clientes em linha
        });

        // Atualiza o cliente atual
        this.currentCostumer = this.queue[0];
    }
    getCurrentCostumer(){
        return this.queue[0]
    }
}