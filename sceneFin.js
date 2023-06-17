class sceneFin extends Phaser.Scene {

    constructor() {
        super("sceneFin");
        this.controller = false;
        this.keyboard;
    }

    init(data) {
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.entrance = data.entrance;
    }

    preload() {
    }

    create() {

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.textTitle = this.add.text(760, 300, 'Thanks for playing !', { fontFamily: 'Arial', fontSize: 120, color: '#ffffff' });
        this.textTitle.setOrigin(0.5, 0);
    };

    update() {

       if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.cameras.main.fadeOut(400, 0, 0, 0);
            this.time.delayedCall(400, () => {
                this.scene.start('menuScene');
            })
        }
    }
};

export default sceneFin