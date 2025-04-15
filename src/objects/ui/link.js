// create a link class that behavior like a button
import Phaser from "phaser";

export default class Link extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, textConfig={
        fontSize: "32px",
        fill: "#fff",
        align: "center",
        backgroundColor: "#000",
    }
    , callback) {
        super(scene, x, y);
        this.scene = scene;
        this.text = text;
        this.textObject = this.scene.add.text(0, 0, text, textConfig).setOrigin(0.5, 0.5);

        // adiciona o objeto
        this.add(this.textObject);

        scene.add.existing(this);

        // muda o tamanho do objeto
        this.setSize(this.textObject.width + 20, this.textObject.height + 20);
        // muda o tipo de cursor
        this.setInteractive({ useHandCursor: true });
        
        // hover
        this.on("pointerover", () => {
            this.setScale(1.1);
        });

        // unhover
        this.on("pointerout", () => {
            this.setScale(1);
        });
        
        // click
        this.on("pointerdown", () => {
            this.setScale(0.9);
            callback()
        });
    }

    setText(text) {
        this.textObject.setText(text);
        this.setSize(this.textObject.width + 20, this.textObject.height + 20);
    }
}