class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        //const existingPlayer = scene.children.getByName('player');
        if (!this.body) {
            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.setName('player');
        }
        // scene.add.existing(this); //Add object to scene
        // scene.physics.add.existing(this); //Gives physics to body
        this.body.setCollideWorldBounds(true);
        this.init();
        this.initEvents();
    }


    init() {


        // ici des variables notées this.player.var ailleurs dans les autres fichiers
        this.speedPlayer = 0;
        this.jumpActif = false;
        this.tpReady = false;
        this.apparition = false;
        this.invulnerable = false;
        this.directionPlayer = 'right';
        this.frictionSol = 50;
        this.frictionAir = 30;
        this.hauteurSaut = -1000;
        this.hauteurSautFinal = this.hauteurSaut;
        this.speedMax = 400;
        this.acceleration = 20;
        this.jumpTimer = 5;
        this.coyoteTime = 10;
        this.coyoteTimer = 0;
        this.speedPlayer = 0
        this.falling = false;
        this.dead = false;
        this.checkDead = false;

        this.startGame = false;

        // variable débloquée pour le niveau
        this.DOUBLEJUMP = false;
        this.WALLJUMP = false;
        this.DASH = false;
        this.SHIELD = false;
        this.INTANGIBLE = false;
        this.SLIME = false;
        this.FAKIR = false;
        this.MATRIX = false;


        // check in game
        this.doubleJump = false;
        this.wallJump = false;
        this.wallJumpOn = false;
        this.dashCD = false;
        this.dashOn = false;
        this.shield = false;
        this.shieldOn = false;
        this.intangible = false;
        this.intangibleCD = false;
        this.slime = false;
        this.slimeOn = false;
        this.fakir = false;
        this.fakirOn = false;
        this.matrix = false;

        this.cursors = this.scene.input.keyboard.createCursorKeys(); // variable pour input
        this.keyT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyU = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        this.keyI = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyO = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.keyP = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyM = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyF = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyL = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        this.keyK = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyN = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

        if (this.body) {
            this.body.setVelocityX(this.speedPlayer);


            // if (this.body.blocked.right || this.body.blocked.left) { // STOP la vitesse du joueur d'un coup
            //     this.speedPlayer = 0;
            // }

            if (this.keyD.isDown || this.keyQ.isDown || this.cursors.shift.isDown || this.keyZ.isDown || this.keyA.isDown || this.keyF.isDown || this.keySpace.isDown) {
                if (!this.startGame) {
                    this.startGame = true;
                }
            }




            // 2 DIRECTIONS

            if (!this.wallJumpOn && !this.dashOn) {
                if (this.keyQ.isDown) { // GAUCHE
                    this.speedPlayer = -this.speedMax;
                    this.directionPlayer = 'left';
                }
                else if (this.keyD.isDown) { // DROITE
                    this.speedPlayer = this.speedMax;
                    this.directionPlayer = 'right';
                }
            }



            // Frottements

            if (this.cursors.right.isUp && this.keyQ.isUp && this.keyD.isUp && this.speedPlayer != 0) {
                if (this.body.blocked.down/* || this.player.body.velocity.y == 0*/) { // friction au sol
                    if (!this.dashOn) {
                        this.frictionAuSol();
                    }

                }
                else {
                    if (!this.wallJumpOn && !this.dashOn) {
                        this.frictionAirs();
                    }


                }
            }

            // JUMP, WALL JUMP et DOUBLE JUMP

            if ((Phaser.Input.Keyboard.JustDown(this.keyZ)) || (Phaser.Input.Keyboard.JustDown(this.keySpace))) { // JUMP
                if (this.body.blocked.down || this.coyoteTimer > 0) {
                    this.setVelocityY(this.hauteurSaut)
                    this.coyoteTimer = 0;
                }
                else if (this.WALLJUMP && !this.wallJump && (this.body.blocked.right || this.body.blocked.left)) { // WALL JUMP
                    this.wallJump = true;
                    this.wallJumpOn = true;
                    this.scene.time.delayedCall(300, () => {
                        this.wallJumpOn = false
                        this.wallJump = false;
                    });
                    this.setVelocityY(this.hauteurSaut)
                    if (this.body.blocked.right) {
                        this.speedPlayer = -this.speedMax;
                    }
                    else if (this.body.blocked.left) {
                        this.speedPlayer = this.speedMax;
                    }
                    this.wallJump = false;
                }
                else if (this.doubleJump) { // DOUBLE JUMP
                    this.setVelocityY(this.hauteurSaut);
                    this.doubleJump = false;
                }
            }

            if (this.body.blocked.down) {
                if (this.DOUBLEJUMP) {
                    this.doubleJump = true;
                }
                // if (this.WALLJUMP) {
                //     this.wallJump = true;
                // }
                this.coyoteTimer = this.coyoteTime; // on enclenche le chrono en continu tant que le joueur touche la plateforme
            }
            else {
                this.coyoteTimer -= 1;
            }

            // DASH
            if (this.cursors.shift.isDown && this.DASH && !this.dashCD) {
                this.dashOn = true;
                this.dashCD = true;
                this.setVelocityY(-300);
                this.scene.time.delayedCall(1000, () => {
                    this.dashCD = false;
                });
                this.scene.time.delayedCall(300, () => {
                    this.dashOn = false;
                    this.speedPlayer = 0;
                    this.intangible = false;
                });
                if (this.directionPlayer == 'right') {
                    this.speedPlayer = this.speedMax * 3;
                }
                else {
                    this.speedPlayer = -this.speedMax * 3;
                }

            }

            // INTANGIBLE

            if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
                if (this.INTANGIBLE && !this.intangibleCD) {
                    this.intangible = true;
                    this.intangibleCD = true;
                    this.alpha = 0.5
                    // this.scene.time.delayedCall(10000, () => {
                    //     this.intangibleCD = false;
                    // });
                    this.scene.time.delayedCall(1000, () => {
                        this.intangible = false;
                        this.alpha = 1;
                    });
                }
            }


            // SLIME
            // usage unique 
            if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
                if (this.SLIME && !this.slimeOn) {
                    this.slimeOn = true;
                    this.slime = true;
                    this.setTint(0xE027FF);
                    this.scene.time.delayedCall(1000, () => {
                        this.slime = false;
                        this.setTint();
                    });
                }
            }



            // if (this.jumpActif == true) { // jump hang time
            //     if (Math.abs(this.body.velocity.y) < 400) {
            //         this.body.setGravityY(-200);
            //     }
            //     else {
            //         this.body.setGravityY(0);
            //     }
            // }

            if (this.body.velocity.y > 1200) { // vitesse de chute capée
                this.setVelocityY(1200);
            }



            if (Phaser.Input.Keyboard.JustDown(this.keyT)) { // test
            }

        }
    }

    // fonctions propre à l'objet player




    frictionAuSol() { // friction au sol
        if (Math.abs(this.speedPlayer) <= this.frictionSol) {
            this.speedPlayer = 0
        }
        else if (this.speedPlayer > 0) {
            this.speedPlayer -= this.frictionSol;
        }
        else if (this.speedPlayer < 0) {
            this.speedPlayer += this.frictionSol;
        }
    }

    frictionAirs() { // friction dans les airs
        if (Math.abs(this.speedPlayer) <= this.frictionAir) {
            this.speedPlayer = 0
        }
        else if (this.speedPlayer > 0) {
            this.speedPlayer -= this.frictionAir;
        }
        else if (this.speedPlayer < 0) {
            this.speedPlayer += this.frictionAir;
        }
    }




}
export default Player;