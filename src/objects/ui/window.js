export default class Window extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width = 300, height = 200, isClosable = true) {
      super(scene, x, y);
      this.scene = scene;
      this.width = width;
      this.height = height;
  
      // Window background
      this.background = scene.add.rectangle(0, 0, width, height, 0x222222, 0.95)
        .setOrigin(0.5)
        .setStrokeStyle(2, 0xffffff);
  
      // Close button (expects a sprite named 'close')
      this.closeButton = scene.add.sprite(width / 2 - 16, -height / 2 + 16, 'close')
        .setInteractive({ useHandCursor: true })
        .setScale(0.2)
        .on('pointerdown', () => this.close());
  
      // Content container
      this.content = scene.add.container(-width / 2 + 40, -height / 2 + 40); // small margin
  
      // Add elements to the window
      this.add([this.background, this.content]);

      if(isClosable) {
        this.add(this.closeButton)
      }
  
      // Add the window to the scene
      scene.add.existing(this);
    }
  
    // Add an item to the window's content
    addItem(item) {
      this.content.add(item);
    }
  
    // Close the window
    close() {
      this.destroy(); // completely removes the window
    }
  }