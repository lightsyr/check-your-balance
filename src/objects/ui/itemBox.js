import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import inventory from "../../data/inventory";

export default function createItemBox(scene){
    const itemsBoxSizer = new Sizer(scene, {
        x: 1280/2,
        y:720 - 60,
        anchor:"left",
        orientation:"horizontal",
        space:{
            item: 20
        },
    })

    // add each item to item box
    inventory.items.forEach(item =>{
        // create the item sprite
        const itemImage = scene.add.image(0,0, "item")

        itemImage.setInteractive({ useHandCursor: true });

        itemsBoxSizer.add(itemImage)
    })

    //set background to item box
    itemsBoxSizer.addBackground(scene.add.rectangle(0, 0, itemsBoxSizer.width + 10, itemsBoxSizer.height + 10, 0x222222, 0.95))

    scene.add.existing(itemsBoxSizer)

    itemsBoxSizer.layout()
}