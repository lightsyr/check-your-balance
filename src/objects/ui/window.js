import Sizer from 'phaser3-rex-plugins/templates/ui/sizer/Sizer.js';
import Label from 'phaser3-rex-plugins/templates/ui/label/Label.js';

export default class WindowUI {
  constructor(scene, x, y, width = 300, height = 200, titleText = 'Window') {
    this.scene = scene;

    // Close button
    this.closeButton = new Label(scene, {
      background: scene.add.rectangle(0, 0, 24, 24, 0xff4444),
      text: scene.add.text(0, 0, 'X', { fontSize: '16px', color: '#ffffff' }),
      space: { left: 4, right: 4, top: 2, bottom: 2 }
    })
      .setInteractive()
      .on('pointerdown', () => this.destroy());

    // Header: title + close button
    this.header = new Sizer(scene, {
      orientation: 0, // 0 = horizontal
      space: { item: 10, left: 10, right: 10, top: 5, bottom: 5 }
    });

    this.title = scene.add.text(0, 0, titleText, {
      fontSize: '18px',
      color: '#ffffff'
    });

    this.header.add(this.title, 1, false);
    this.header.add(this.closeButton, 0, false);

    // Content area (column layout)
    this.content = new Sizer(scene, {
      orientation: 1, // 1 = vertical
      space: { item: 10, top: 10, bottom: 10 }
    });

    // Window container (main vertical sizer)
    this.window = new Sizer(scene, {
      x,
      y,
      orientation: 1,
      space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 },
      background: scene.add.rectangle(0, 0, width, height, 0x222222, 0.95).setStrokeStyle(2, 0xffffff)
    });

    this.window.add(this.header, 0, false);
    this.window.add(this.content, 1, true);

    // Add to scene and layout
    scene.add.existing(this.window);
    this.window.layout();
  }

  addContent(gameObject, expand = false) {
    this.content.add(gameObject, 0, expand);
    this.window.layout();
  }

  destroy() {
    this.window.destroy();
  }

  getContainer() {
    return this.window;
  }
}