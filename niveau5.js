import Player from "./player.js";

class niveau5 extends Phaser.Scene {
    constructor() {
        super("niveau5");
    }

    init(data) {
        this.entrance = data.entrance;
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.entrance = data.entrance;
        this.DOUBLEJUMP = data.DOUBLEJUMP;
        this.WALLJUMP = data.WALLJUMP;
        this.DASH = data.DASH;
        this.SLIME = data.SLIME;
        this.INTANGIBLE = data.INTANGIBLE;
        this.FAKIR = data.FAKIR;
        this.SHIELD = data.SHIELD;
        this.MATRIX = data.MATRIX;
        this.PA = data.PA;
        this.savePA = data.savePA;
        this.currentLevel = data.currentLevel;
        this.levelComplete = data.levelComplete;
    }

    preload() { };

    create() { // Création des éléments dès l'initialisation du jeu

        this.flagHit = false;

        this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.varTest = 0;
        this.varTest2 = 0;
        this.reset = false;
        this.timer = 10000; // 10 secondes
        this.countdown = this.timer;
        this.levelComplete = false;


        this.map1 = this.add.tilemap('lvl5');
        this.tileset = this.map1.addTilesetImage('tileset10', 'tileset10');

        this.calque_Background = this.map1.createLayer('Background', this.tileset);
        this.calque_Murs = this.map1.createLayer('Murs', this.tileset);
        this.calque_Murs.setCollisionByProperty({ isSolid: true });
        this.calque_Pics = this.map1.createLayer('Pics', this.tileset);
        this.calque_Pics.setCollisionByProperty({ isSpike: true });

        this.calque_Grille = this.map1.getObjectLayer('Grille');
        this.grilles = this.physics.add.staticGroup();
        this.calque_Grille.objects.forEach((object) => {
            const grille = this.grilles.create(object.x + 16, object.y - 16, 'grille');

        });


        // UI

        this.affichageCountdown = this.add.text(1362, 32, this.countdown / 1000 + ' s', { fontFamily: 'Arial', fontSize: 64, color: '#ff0000' });


        // PLAYER
        this.spawnPlayerX = 32 * 23.5;
        this.spawnPlayerY = 32 * 20.5;

        // if (!this.player) {
        this.player = new Player(this, this.spawnPlayerX, this.spawnPlayerY, 'player').setOrigin(0.5, 0.5);
        //     this.add.existing(this.player); //Add object to scene
        //     this.physics.add.existing(this.player); //Gives physics to body
        // }



        this.physics.add.collider(this.player, this.calque_Murs);
        this.physics.add.collider(this.player, this.grilles);
        this.physics.add.collider(this.player, this.calque_Pics, this.hitSpike, null, this);


        if (this.DOUBLEJUMP) this.player.DOUBLEJUMP = true;
        if (this.WALLJUMP) this.player.WALLJUMP = true;
        if (this.DASH) this.player.DASH = true;
        if (this.SLIME) this.player.SLIME = true;
        if (this.INTANGIBLE) this.player.INTANGIBLE = true;
        if (this.FAKIR) {
            this.player.FAKIR = true;
            this.player.fakir = true;
            this.player.fakirOn = false;
        }
        if (this.SHIELD) {
            this.player.SHIELD = true;
            this.player.shield = true;
            this.player.shieldOn = false;
        }
        if (this.MATRIX) {
            this.player.matrix = true;
            this.player.MATRIX = true;
        }



        // CAMERA

        this.physics.world.setBounds(0, 0, 48 * 32, 27 * 32); // Défini les limites où le joueur peut aller, limites où la physiques s'appliquent ?
        this.cameras.main.setBounds(0, 0, 48 * 32, 27 * 32); // Défini les limites de la caméra (début x, début y, fin x, fin y)
        //this.cameras.main.startFollow(this.player, true, 0.04, 0.02); //ancrage de la caméra sur l'objet player
        this.cameras.main.setZoom(1);


        // ENNEMIS

        this.spawn_mob = false;
        this.mobs = this.physics.add.group({ collideWorldBounds: true });
        this.physics.add.collider(this.mobs, this.calque_Murs);
        this.physics.add.collider(this.mobs, this.player);

        this.spawn = this.map1.getObjectLayer('Spawn');
        this.spawn.objects.forEach((object) => {
            const mob = this.mobs.create(object.x + 16, object.y - 16, 'turret');
            mob.body.allowGravity = false;
        });

        this.spawn_mobs();

        this.bullets = this.physics.add.group({ collideWorldsBounds: true });
        this.bullets.setOrigin(0.5, 0.5);
        this.physics.add.collider(this.bullets, this.calque_Murs);
        this.physics.add.overlap(this.player, this.bullets, this.hitPlayer, null, this);

        //32 * 45, 8 * 32
        this.flag = this.physics.add.sprite(32 * 17.5, 6 * 32, 'flag');
        this.flag.body.allowGravity = false;
        this.physics.add.overlap(this.player, this.flag, this.hitFlag, null, this);


    }

    update() {

        if (this.player.startGame) {
            this.affichageCountdown.setText((this.countdown / 1000).toFixed(1) + ' s');
            this.countdown -= 1000 / 60;
            if (this.countdown < 0) {
                this.resetLevel();
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyEscape)) {
            // retour au menu skill, reset des skills et PA
            //this.player.destroy();
            this.scene.start('menuSkill', { entrance: 'niveau5'/*, DOUBLEJUMP: this.DOUBLEJUMP, WALLJUMP: this.WALLJUMP, DASH: this.DASH, SLIME: this.SLIME, INTANGIBLE: this.INTANGIBLE, FAKIR: this.FAKIR, SHIELD: this.SHIELD, MATRIX: this.MATRIX*/, savePA: this.savePA  });
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.resetLevel();
        }

        if (this.player.dead == true) {
            if (this.player.checkDead == false) {
                this.resetLevel();

            }
        }

        if (this.spawn_mob == true) {
            this.mobs.children.each(function (mob) {

                if (Phaser.Math.Distance.Between(this.player.x, this.player.y, mob.x, mob.y) < mob.scope) {
                    if (mob.shoot == false && this.reset == false) {
                        mob.shoot = true;
                        this.createBullet(mob.x, mob.y);
                        this.time.delayedCall(mob.shootCD, () => {
                            mob.shoot = false;
                        });
                    }
                }


            }, this)
        }

        this.bullets.children.each(function (bullet) {
            if (!bullet.body.blocked.none || bullet.body.velocity == 0) { //destruction de la bullet au moindre collider
                bullet.destroy();
            }
            if (bullet.spawn == true) {
                bullet.spawn = false;

                // tir en direction du joueur
                let dirX = this.player.x - bullet.x;
                let dirY = this.player.y - bullet.y; // vise 1 case au dessus du joueur
                let length = Math.sqrt(dirX ** 2 + dirY ** 2);
                dirX /= length;
                dirY /= length;
                if (this.player.matrix) {
                    dirX /= 2;
                    dirY /= 2;
                }
                bullet.body.setVelocityX(dirX * bullet.speed);
                bullet.body.setVelocityY(dirY * bullet.speed);
            }
        }, this);

        if (!this.player.slime) {
            this.grilles.getChildren().forEach(grille => {
                grille.body.checkCollision.up = true;
                grille.body.checkCollision.down = true;
                grille.body.checkCollision.right = true;
                grille.body.checkCollision.left = true;
            });
        }
        else {
            this.grilles.getChildren().forEach(grille => {
                grille.body.checkCollision.up = false;
                grille.body.checkCollision.down = false;
                grille.body.checkCollision.right = false;
                grille.body.checkCollision.left = false;
            });
        }



        // if (Phaser.Input.Keyboard.JustDown(this.keyT)) {
        //     console.log(this.player.x, this.player.y);
        //     console.log(this.player.dead)
        // }
    }

    // FONCTIONS


    resetLevel() {
        this.player.checkDead = true;
        this.cameras.main.fadeOut(300, 0, 0, 0);
        this.countdown = this.timer;
        this.player.startGame = false;
        this.affichageCountdown.setText((this.countdown / 1000).toFixed(0) + ' s');
        this.time.delayedCall(300, () => {
            // reload le niveau en cours
            this.player.x = this.spawnPlayerX;
            this.player.y = this.spawnPlayerY;
            this.reset = true;
            this.time.delayedCall(300, () => {
                this.reset = false; // reset en cours, les tourelles arrêter de tirer
            });
            this.destroyAllBullets();
            this.cameras.main.fadeIn(300, 0, 0, 0);
            if (this.player.SHIELD) {
                this.player.shield = true;
                this.player.shieldOn = false;
            }
            if (this.player.INTANGIBLE) {
                this.player.intangibleCD = false;
                this.player.intangible = false;
                this.player.alpha = 1;
            }
            if (this.player.FAKIR) {
                this.player.fakirOn = false;
                this.player.fakir = true;
            }
            if (this.player.SLIME) {
                this.player.slime = false;
                this.player.slimeOn = false;
            }
            this.player.dead = false;
            this.player.checkDead = false;

        });
    }


    hitSpike() {

        //check marche sur pic sinon
        if (!this.player.fakir && !this.player.shield) {
            if (this.player.dead == false) {
                this.player.dead = true;
            }
        }
        else {
            if (this.player.FAKIR && !this.player.fakirOn) {
                this.player.fakirOn = true;
                this.player.setTint(0xFF6600);
                this.time.delayedCall(1000, () => {
                    this.player.fakir = false;
                    this.player.setTint();
                });
            }
            else if (this.player.SHIELD && !this.player.shieldOn) {
                this.player.shieldOn = true;
                this.player.setTint(0xff0000);
                this.time.delayedCall(1000, () => {
                    this.player.shield = false;
                    this.player.setTint();
                });
            }
        }
    }

    hitFlag() {
        if (!this.flagHit) {
            this.flagHit = true;
            // retour au menu et incrémentation d'une variable pour savoir à quel niveau on est
            // importation des data
            this.savePA = this.PA;
            this.currentLevel += 1;
            this.levelComplete = true;
            this.scene.start('menuSkill', { entrance: 'niveau5', DOUBLEJUMP: this.DOUBLEJUMP, WALLJUMP: this.WALLJUMP, DASH: this.DASH, SLIME: this.SLIME, INTANGIBLE: this.INTANGIBLE, FAKIR: this.FAKIR, SHIELD: this.SHIELD, MATRIX: this.MATRIX, PA: this.PA, savePA:this.savePA, levelComplete:this.levelComplete, currentLevel: this.currentLevel });
        }

    }

    destroyAllBullets() {
        while (this.bullets.getLength() > 0) {
            const first = this.bullets.getFirst(true);
            first.destroy();
        }
    }



    createBullet(mobX, mobY) {
        this.bullets.create(mobX, mobY, 'bullet');
        this.bullets.children.each(function (bullet) {
            bullet.body.allowGravity = false;
            bullet.speed = 250;
            bullet.setOrigin(0.5, 0.5).setCircle(2).setScale(2);
            if (bullet.spawn != false) {
                bullet.spawn = true;
            }
        }, this)
    }


    hitPlayer(player, bullet) {
        if (!this.player.intangible) {
            bullet.destroy();
            if (!this.player.shield) {
                if (this.player.dead == false) {
                    this.player.dead = true;
                }
            }
            else {
                if (this.player.SHIELD && !this.player.shieldOn) {
                    this.player.shieldOn = true;
                    player.setTint(0xff0000);
                    this.time.delayedCall(1000, () => {
                        this.player.shield = false;
                        this.player.setTint();
                    });
                }
            }


        }
    }

    spawn_mobs() {
        this.spawn_mob = true;

        this.mobs.children.each(function (mob) {
            mob.setImmovable(true);
            mob.scope = 32 * 15;
            mob.shoot = false;
            mob.shootCD = 600
            if (this.player.matrix) {
                mob.shootCD *= 2
            }

        }, this);
    }


}

export default niveau5
