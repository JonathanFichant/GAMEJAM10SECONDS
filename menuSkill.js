// export class menuScene extends Phaser.Scene {

class menuSkill extends Phaser.Scene {

    constructor() {
        super("menuSkill");
    }

    init(data) {
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.entrance = data.entrance;

        this.DOUBLEJUMP = data.DOUBLEJUMP;
        this.WALLJUMP = data.WALLJUMP;
        this.DASH = data.DASH;
        this.SLIME = data.SLIME;
        this.INTANGIBLE = data.INTANGIBLE;
        this.FAKIR = data.FAKIR;
        this.SHIELD = data.SHIELD;
        this.MATRIX = data.MATRIX;
        this.PA = data.PA; // reste de PA
        this.savePA = data.savePA;
        this.levelComplete = data.levelComplete;
        this.currentLevel = data.currentLevel;


    }

    preload() {
    }

    create() {
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cameras.main.fadeIn(1300, 0, 0, 0);
        this.keyboard = this.input.keyboard.createCursorKeys();
        this.background = this.add.image(0, 0, 'menuSkill');
        this.background.setOrigin(0, 0);
        this.cameras.main.setZoom(1);

        if (this.levelComplete) { // si level complété
            this.levelComplete = false;
            if (this.DOUBLEJUMP) this.costDoubleJump += 2;
            if (this.WALLJUMP) this.costWallJump += 1;
            if (this.DASH) this.costDash += 1;
            if (this.SLIME) this.costSlime += 1;
            if (this.INTANGIBLE) this.costIntangible += 1;
            if (this.FAKIR) this.costFakir += 1;
            if (this.SHIELD) this.costShield += 2;
            if (this.MATRIX) this.costMatrix += 2;

            if (this.entrance == 'niveau1') { //arrivée au niveau 2
                this.PA = this.savePA + 1
                this.currentLevel = 2;
            }
            if (this.entrance == 'niveau2') { //arrivée au niveau 3
                this.PA = this.savePA + 1
                this.currentLevel = 3;
            }
            if (this.entrance == 'niveau3') { //arrivée au niveau 4
                this.PA = this.savePA + 1;
                this.currentLevel = 4;
            }
            if (this.entrance == 'niveau4') { //arrivée au niveau 5
                this.PA = this.savePA + 2
                this.currentLevel = 5;
            }
            if (this.entrance == 'niveau5') { //arrivée au niveau 6
                this.PA = this.savePA + 2
                this.currentLevel = 6;
            }
            if (this.entrance == 'niveau6') { //arrivée au niveau 7
                this.PA = this.savePA + 2
                this.currentLevel = 7;
            }

        }
        else {
            if (this.entrance == 'niveau1') { // niveau 1
                this.currentLevel = 1;
                this.PA = 4;
            }
            if (this.entrance == 'niveau2') { // niveau 2
                this.PA = this.savePA + 1;
                this.currentLevel = 2;
            }
            if (this.entrance == 'niveau3') { // niveau 3
                this.PA = this.savePA + 1;
                this.currentLevel = 3;
            }
            if (this.entrance == 'niveau4') { // niveau 4
                this.PA = this.savePA + 1;
                this.currentLevel = 4;
            }
            if (this.entrance == 'niveau5') { // niveau 5
                this.PA = this.savePA + 2;
                this.currentLevel = 5;
            }
            if (this.entrance == 'niveau6') { // niveau 6
                this.PA = this.savePA + 2;
                this.currentLevel = 6;
            }
            if (this.entrance == 'niveau7') { // niveau 7
                this.PA = this.savePA + 2;
                this.currentLevel = 7;
            }
            if (this.entrance == 'menuScene') {
                this.costDoubleJump = 4;
                this.costWallJump = 2;
                this.costDash = 2;
                this.costShield = 4;
                this.costSlime = 2;
                this.costIntangible = 2;
                this.costFakir = 2;
                this.costMatrix = 3;
                this.PA = 4;
                this.savePA = 0;
                this.currentLevel = 1;
            }
        }





        this.selection = this.add.image(256, 64, 'selection');
        this.selection.setOrigin(0, 0);
        this.selectionActive = 1;
       

        this.selectionDetail = this.add.image(1200, 176, 'doubleJump');
        this.selectionDetail.setOrigin(0, 0);

        let style = {
            wordWrap: { width: 14 * 32 },
            align: "center"
        }
        this.name = 'Double Jump';
        this.description = 'Can jump once in the air \n(Passive)';
        this.cost = this.costDoubleJump;

        // this.PA = 10;
        // this.savePA = 0;
        this.textPA = this.add.text(106, 52, this.PA, { fontFamily: 'Arial', fontSize: 120, color: '#ffffff', style });
        this.textPA.setOrigin(0.5, 0);

        this.textName = this.add.text(1272, 432, this.name, { fontFamily: 'Arial', fontSize: 50, color: '#ffffff', style });
        this.textName.setOrigin(0.5, 0);
        this.textDescription = this.add.text(1272, 564, this.description, { fontFamily: 'Arial', fontSize: 30, color: '#ffffff', style });
        this.textDescription.setOrigin(0.5, 0);
        this.textCost = this.add.text(1272, 700, 'Cost : ' + this.cost, { fontFamily: 'Arial', fontSize: 30, color: '#ffffff', style });
        this.textCost.setOrigin(0.5, 0);

        // this.costDoubleJump = 3;
        // this.costWallJump = 2;
        // this.costDash = 2;
        // this.costShield = 3;
        // this.costSlime = 1;
        // this.costIntangible = 2;
        // this.costFakir = 1;
        // this.costMatrix = 3;

        this.DOUBLEJUMP = false;
        this.WALLJUMP = false;
        this.DASH = false;
        this.SLIME = false;
        this.INTANGIBLE = false;
        this.FAKIR = false;
        this.SHIELD = false;
        this.MATRIX = false;

        this.actif1 = this.add.image(256 + 112, 176, 'actif').setVisible(false);
        this.actif2 = this.add.image(256 + 112 + 8 * 32, 176, 'actif').setVisible(false);
        this.actif3 = this.add.image(256 + 112 + 16 * 32, 176, 'actif').setVisible(false);
        this.actif4 = this.add.image(256 + 112, 176 + 8 * 32, 'actif').setVisible(false);
        this.actif6 = this.add.image(256 + 112 + 16 * 32, 176 + 8 * 32, 'actif').setVisible(false);
        this.actif7 = this.add.image(256 + 112, 176 + 16 * 32, 'actif').setVisible(false);
        this.actif8 = this.add.image(256 + 112 + 8 * 32, 176 + 16 * 32, 'actif').setVisible(false);
        this.actif9 = this.add.image(256 + 112 + 16 * 32, 176 + 16 * 32, 'actif').setVisible(false);


    };

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {

            switch (this.selectionActive) {
                case 1:
                    if (this.DOUBLEJUMP) {
                        this.DOUBLEJUMP = false;
                        this.actif1.setVisible(false);
                        this.PA += this.costDoubleJump;
                    } else if (this.costDoubleJump <= this.PA) {
                        this.DOUBLEJUMP = true;
                        this.PA -= this.costDoubleJump;
                        this.actif1.setVisible(true);
                    }
                    break;
                case 2:
                    if (this.WALLJUMP) {
                        this.WALLJUMP = false;
                        this.actif2.setVisible(false);
                        this.PA += this.costWallJump;
                    } else if (this.costWallJump <= this.PA) {
                        this.WALLJUMP = true;
                        this.PA -= this.costWallJump;
                        this.actif2.setVisible(true);
                    }
                    break;

                case 3:
                    if (this.DASH) {
                        this.DASH = false;
                        this.actif3.setVisible(false);
                        this.PA += this.costDash;
                    } else if (this.costDash <= this.PA) {
                        this.DASH = true;
                        this.PA -= this.costDash;
                        this.actif3.setVisible(true);
                    }
                    break;

                case 4:
                    if (this.SLIME) {
                        this.SLIME = false;
                        this.actif4.setVisible(false);
                        this.PA += this.costSlime;
                    } else if (this.costSlime <= this.PA) {
                        this.SLIME = true;
                        this.PA -= this.costSlime;
                        this.actif4.setVisible(true);
                    }
                    break;
                case 5:
                    this.cameras.main.fadeOut(400, 0, 0, 0);
                    //this.savePA = this.PA
                    this.time.delayedCall(400, () => {
                        if (this.currentLevel == 1){
                            this.scene.start('niveau1', { entrance: 'menuSkill', DOUBLEJUMP: this.DOUBLEJUMP, WALLJUMP: this.WALLJUMP, DASH: this.DASH, SLIME: this.SLIME, INTANGIBLE: this.INTANGIBLE, FAKIR: this.FAKIR, SHIELD: this.SHIELD, MATRIX: this.MATRIX, PA: this.PA, savePA: this.savePA, currentLevel: this.currentLevel, levelComplete: this.levelComplet });
                        }
                        else if (this.currentLevel == 2){
                            this.scene.start('niveau2', { entrance: 'menuSkill', DOUBLEJUMP: this.DOUBLEJUMP, WALLJUMP: this.WALLJUMP, DASH: this.DASH, SLIME: this.SLIME, INTANGIBLE: this.INTANGIBLE, FAKIR: this.FAKIR, SHIELD: this.SHIELD, MATRIX: this.MATRIX, PA: this.PA, savePA: this.savePA, currentLevel: this.currentLevel, levelComplete: this.levelComplet });
                        }
                        else if (this.currentLevel == 3){
                            this.scene.start('niveau3', { entrance: 'menuSkill', DOUBLEJUMP: this.DOUBLEJUMP, WALLJUMP: this.WALLJUMP, DASH: this.DASH, SLIME: this.SLIME, INTANGIBLE: this.INTANGIBLE, FAKIR: this.FAKIR, SHIELD: this.SHIELD, MATRIX: this.MATRIX, PA: this.PA, savePA: this.savePA, currentLevel: this.currentLevel, levelComplete: this.levelComplet });
                        }
                        else if (this.currentLevel == 4){
                            this.scene.start('niveau4', { entrance: 'menuSkill', DOUBLEJUMP: this.DOUBLEJUMP, WALLJUMP: this.WALLJUMP, DASH: this.DASH, SLIME: this.SLIME, INTANGIBLE: this.INTANGIBLE, FAKIR: this.FAKIR, SHIELD: this.SHIELD, MATRIX: this.MATRIX, PA: this.PA, savePA: this.savePA, currentLevel: this.currentLevel, levelComplete: this.levelComplet });
                        }
                        else if (this.currentLevel == 5){
                            this.scene.start('niveau5', { entrance: 'menuSkill', DOUBLEJUMP: this.DOUBLEJUMP, WALLJUMP: this.WALLJUMP, DASH: this.DASH, SLIME: this.SLIME, INTANGIBLE: this.INTANGIBLE, FAKIR: this.FAKIR, SHIELD: this.SHIELD, MATRIX: this.MATRIX, PA: this.PA, savePA: this.savePA, currentLevel: this.currentLevel, levelComplete: this.levelComplet });
                        }
                        else if (this.currentLevel == 6){
                            this.scene.start('niveau6', { entrance: 'menuSkill', DOUBLEJUMP: this.DOUBLEJUMP, WALLJUMP: this.WALLJUMP, DASH: this.DASH, SLIME: this.SLIME, INTANGIBLE: this.INTANGIBLE, FAKIR: this.FAKIR, SHIELD: this.SHIELD, MATRIX: this.MATRIX, PA: this.PA, savePA: this.savePA, currentLevel: this.currentLevel, levelComplete: this.levelComplet });
                        }
                        else if (this.currentLevel == 7){
                            this.scene.start('niveau7', { entrance: 'menuSkill', DOUBLEJUMP: this.DOUBLEJUMP, WALLJUMP: this.WALLJUMP, DASH: this.DASH, SLIME: this.SLIME, INTANGIBLE: this.INTANGIBLE, FAKIR: this.FAKIR, SHIELD: this.SHIELD, MATRIX: this.MATRIX, PA: this.PA, savePA: this.savePA, currentLevel: this.currentLevel, levelComplete: this.levelComplet });
                        }
                        
                    })
                    break;
                case 6:
                    if (this.INTANGIBLE) {
                        this.INTANGIBLE = false;
                        this.actif6.setVisible(false);
                        this.PA += this.costIntangible;
                    } else if (this.costIntangible <= this.PA) {
                        this.INTANGIBLE = true;
                        this.PA -= this.costIntangible;
                        this.actif6.setVisible(true);
                    }
                    break;

                case 7:
                    if (this.FAKIR) {
                        this.FAKIR = false;
                        this.actif7.setVisible(false);
                        this.PA += this.costFakir;
                    } else if (this.costFakir <= this.PA) {
                        this.FAKIR = true;
                        this.PA -= this.costFakir;
                        this.actif7.setVisible(true);
                    }
                    break;

                case 8:
                    if (this.SHIELD) {
                        this.SHIELD = false;
                        this.actif8.setVisible(false);
                        this.PA += this.costShield;
                    } else if (this.costShield <= this.PA) {
                        this.SHIELD = true;
                        this.PA -= this.costShield;
                        this.actif8.setVisible(true);
                    }
                    break;

                case 9:
                    if (this.MATRIX) {
                        this.MATRIX = false;
                        this.actif9.setVisible(false);
                        this.PA += this.costMatrix;
                    } else if (this.costMatrix <= this.PA) {
                        this.MATRIX = true;
                        this.PA -= this.costMatrix;
                        this.actif9.setVisible(true);
                    }
                    break;
            }
            this.textPA.setText(this.PA);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
            this.selectionActive += 1;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyQ)) {
            this.selectionActive -= 1;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyZ)) {
            this.selectionActive -= 3;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            this.selectionActive += 3;
        }


        if (this.selectionActive == 1) { // DOUBLE JUMP
            this.selection.setPosition(256, 64);
            this.selectionDetail.setTexture('doubleJump');
            this.name = 'DOUBLE JUMP';
            this.description = 'Can jump once in the air';
            this.cost = this.costDoubleJump;

        }
        if (this.selectionActive == 2) { // WALL JUMP
            this.selection.setPosition(256 + 8 * 32, 64);
            this.selectionDetail.setTexture('wallJump');
            this.name = 'WALL JUMP';
            this.description = 'Can jump against a wall';
            this.cost = this.costWallJump;

        }
        if (this.selectionActive == 3) { // DASH
            this.selection.setPosition(256 + 16 * 32, 64);
            this.selectionDetail.setTexture('dash');
            this.name = 'DASH';
            this.description = 'Horizontal acceleration \n          cooldown : 1s \n          input : SHIFT';
            this.cost = this.costDash;
        }
        if (this.selectionActive == 4) { // SLIME
            this.selection.setPosition(256, 64 + 8 * 32);
            this.selectionDetail.setTexture('slime');
            this.name = 'SLIME';
            this.description = 'Can pass through grilles \n                1 use \n               input : F';
            this.cost = this.costSlime;
        }
        if (this.selectionActive == 5) { // GO
            this.selection.setPosition(256 + 8 * 32, 64 + 8 * 32);
            this.selectionDetail.setTexture('go');
            this.name = 'START LEVEL';
            this.description = 'LEVEL ' + this.currentLevel;
            this.cost = '10 seconds of your life ?';
        }
        if (this.selectionActive == 6) { // INTANGIBLE
            this.selection.setPosition(256 + 16 * 32, 64 + 8 * 32);
            this.selectionDetail.setTexture('intangible');
            this.name = 'INTANGIBLE';
            this.description = 'Dodge bulltets for 1 second \n                 1 use   \n                input : A';
            this.cost = this.costIntangible;
        }
        if (this.selectionActive == 7) { // FAKIR
            this.selection.setPosition(256, 64 + 16 * 32);
            this.selectionDetail.setTexture('fakir');
            this.name = 'FAKIR';
            this.description = 'Can touch spikes for 1 second \n                      1 use \n                    Passive';
            this.cost = this.costFakir;
        }
        if (this.selectionActive == 8) { // SHIELD
            this.selection.setPosition(256 + 8 * 32, 64 + 16 * 32);
            this.selectionDetail.setTexture('shield');
            this.name = 'SHIELD';
            this.description = 'Can take 1 hit \n        1 use   \n       Passive';
            this.cost = this.costShield;
        }
        if (this.selectionActive == 9) { // MATRIX
            this.selection.setPosition(256 + 16 * 32, 64 + 16 * 32);
            this.selectionDetail.setTexture('matrix');
            this.name = 'MATRIX';
            this.description = 'Divides bullets speed by 2 \n              Passive';
            this.cost = this.costMatrix;
        }
        this.textName.setText(this.name);
        this.textDescription.setText(this.description);
        this.textCost.setText('Cost : ' + this.cost);

        if (this.selectionActive < 1) {
            this.selectionActive += 9
        }
        else if (this.selectionActive > 9) {
            this.selectionActive -= 9;
        }

    }
};

export default menuSkill
