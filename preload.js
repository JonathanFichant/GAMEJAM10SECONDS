class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        // Backgrounds     

        //this.load.image('background', 'assets/backgroundJapon.jpg');



    

        this.load.image('player', 'assets/player.png');
        this.load.image('ennemy', 'assets/ennemy.png');
        this.load.image('turret', 'assets/turret.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('grille', 'assets/grille.png');
        this.load.image('flag','assets/flag.png')
    

        // MENU SELECTION
        this.load.image('menuSkill', 'assets/menu.png')
        this.load.image('selection','assets/selection.png');
        this.load.image('doubleJump','assets/doubleJump.png');
        this.load.image('wallJump','assets/wallJump.png');
        this.load.image('dash','assets/dash.png');
        this.load.image('slime','assets/slime.png');
        this.load.image('go','assets/go.png');
        this.load.image('intangible','assets/intangible.png');
        this.load.image('fakir','assets/fakir.png');
        this.load.image('shield','assets/shield.png');
        this.load.image('matrix','assets/matrix.png');
        this.load.image('actif','assets/actif.png')







        this.load.image("ecranFin", "assets/ecranFin.png");


        //Maps

        this.load.image('tileset10', 'tiled/tileset10.png');
        this.load.tilemapTiledJSON('lvl1', 'tiled/lvl1_Ten.json');
        this.load.tilemapTiledJSON('lvl2', 'tiled/lvl2_Ten.json');
        this.load.tilemapTiledJSON('lvl3', 'tiled/lvl3_Ten.json');
        this.load.tilemapTiledJSON('lvl4', 'tiled/lvl4_Ten.json');
        this.load.tilemapTiledJSON('lvl5', 'tiled/lvl5_Ten.json');
        this.load.tilemapTiledJSON('lvl6', 'tiled/lvl6_Ten.json');
        this.load.tilemapTiledJSON('lvl7', 'tiled/lvl7_Ten.json');



        //Audio


    }

    create() {

        this.scene.start("menuScene");
    }
}
export default Preload
