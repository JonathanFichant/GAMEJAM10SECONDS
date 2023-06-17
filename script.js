

import PreloadScene from './preload.js';
import menuScene from './menuScene.js';
import niveau1 from './niveau1.js';
import niveau2 from './niveau2.js';
import niveau3 from './niveau3.js';
import niveau4 from './niveau4.js';
import niveau5 from './niveau5.js';
import niveau6 from './niveau6.js';
import niveau7 from './niveau7.js';
import sceneFin from './sceneFin.js';
import menuSkill from './menuSkill.js';

/*import sceneFin from './sceneFin.js';*/




var config = { // initialisation de phaser
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT, //La fenetre s'adapte avec le même ratio
        width: 48*32,
        height: 27*32,
    },
    physics: {
        default: 'arcade',

        arcade: {
            gravity: { y: 2500 },
            debug: false,
            tileBias : 32 //taille des tuiles
        }
    },
    pixelArt: true,
    // input: { gamepad: true },
    scene: [PreloadScene, niveau1, niveau2, niveau3, niveau4, niveau5, niveau6, niveau7, menuScene, menuSkill, sceneFin]
};

new Phaser.Game(config);
//var game = new Phaser.Game(config);
//game.scene.start("niveau0"); // Le jeu commence à cette scène