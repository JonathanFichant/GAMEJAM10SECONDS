// export class menuScene extends Phaser.Scene {

class menuScene extends Phaser.Scene {

    constructor() {
        super("menuScene");
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

        this.textTitle = this.add.text(760, 100, 'Just 10 seconds', { fontFamily: 'Arial', fontSize: 120, color: '#ffffff' });
        this.textTitle.setOrigin(0.5, 0);

        this.textStart = this.add.text(780, 780, 'Press SPACE to start', { fontFamily: 'Arial', fontSize: 60, color: '#ffffff' });
        this.textStart.setOrigin(0.5, 0);

        this.textLevel =  this.add.text(460, 350, '     Level\n\nQ/D : move\nZ/SPACE : jump\nR : restart level\nESC : skill menu', { fontFamily: 'Arial', fontSize: 50, color: '#ffffff' });
        this.textLevel.setOrigin(0.5,0);

        this.textSkill =  this.add.text(1200, 400, '     Skill Menu\n\nZ/Q/S/D : select\nSPACE : confirm', { fontFamily: 'Arial', fontSize: 50, color: '#ffffff' });
        this.textSkill.setOrigin(0.5,0);
        this.cameras.main.setZoom(1);
    };

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.cameras.main.fadeOut(400, 0, 0, 0);
            this.time.delayedCall(400, () => {
                this.scene.start('menuSkill', { entrance: 'menuScene' });
            })
        }
    }
};

export default menuScene
