import Phaser from 'phaser'

var gamepad = undefined;

const PlayerStates = {
    Normal : 1,
    Boost: 2,
    Turbo : 3
}

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }


    init() {
        this.ShowEscapeMenu = false;
    }

    preload () {
        this.load.image('FalconRocket', 'images/Falcon.png');
        this.load.image('FalconRocketFire', 'images/Falcon9Fire.png');
        this.load.image('FalconRocketBigFire', 'images/Falcon9BigFire.png');
        this.load.image('FalconHeavyRocket', 'images/FalconHeavy.png');
        this.load.image('StarBackground', 'images/background.png');
    }

    create() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        this.bg = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'StarBackground').setScrollFactor(0);

        this.player = this.physics.add.image(windowWidth / 2, windowHeight / 2, 'FalconRocket');
        this.player.setScale(3.5, 4.5);
        this.player.setDrag(150);
        this.player.setAngularDrag(200);
        this.player.setMaxVelocity(1200);
    
        this.cameras.main.startFollow(this.player);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.nitro = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

        this.playerState =  PlayerStates.Normal;
    }

    update(time, delta) {
        var gamepads = this.input.gamepad.gamepads;

        if(gamepads.length > 0) {
            this.gamepad = gamepads[0];
        }

        if(this.gamepad){
            this.GamepadInput();
            //this.KeyboardInput();
        }
        else {
            this.KeyboardInput();
        }

        switch(this.playerState) {
            case PlayerStates.Normal:
                this.player.setTexture('FalconRocket');
            break;
            case PlayerStates.Boost:
                this.player.setTexture('FalconRocketFire');
            break;
            case PlayerStates.Turbo:
                this.player.setTexture('FalconRocketBigFire');
            break;
        }

        this.bg.tilePositionX += this.player.body.deltaX() * 0.5;
        this.bg.tilePositionY += this.player.body.deltaY() * 0.5;    
    }

    GamepadInput() {
        if (this.gamepad.left || this.gamepad.axes[0].getValue() < -0.2)
        {
            this.PlayerLeft();
        }
        else if (this.gamepad.right || this.gamepad.axes[0].getValue() > 0.2)
        {
            this.PlayerRight();
        }
        else
        {
            this.player.setAngularVelocity(0);
        }
    
        if ((this.gamepad.up || this.gamepad.A)  && this.gamepad.X == false)//|| this.gamepad.axes[1].getValue() < -0.2)
        {
            this.PlayerUp();
        }
        else if ((this.gamepad.X) &&  this.gamepad.up == false && this.gamepad.A == false) 
        {
            this.PlayerNitro();
        }
        else 
        {
            this.playerState = PlayerStates.Normal;
            this.player.setAcceleration(0);
        }
    }


    KeyboardInput() {
        if (this.cursors.left.isDown)
        {
            this.PlayerLeft();
        }
        else if (this.cursors.right.isDown)
        {
            this.PlayerRight();
        }
        else
        {
            this.player.setAngularVelocity(0);
        }
    
        if (this.cursors.up.isDown )//&& this.nitro.isDown == false)
        {
            this.PlayerUp();
        }
        else if (this.nitro.isDown )//&& this.cursors.up.isDown == false) 
        {
            this.PlayerNitro();
        }
        else 
        {
            this.playerState = PlayerStates.Normal;
            this.player.setAcceleration(0);
        }
    }

    PlayerUp() {
        console.log("Test");
        this.physics.velocityFromRotation(this.player.rotation - 1.5708, 150, this.player.body.acceleration);
        this.playerState = PlayerStates.Boost;
    }

    PlayerNitro() {
        this.playerState = PlayerStates.Turbo;
        this.physics.velocityFromRotation(this.player.rotation - 1.5708, 600, this.player.body.acceleration);
    }

    PlayerLeft() {
        this.player.setAngularVelocity(-150);
    }

    PlayerRight() {
        this.player.setAngularVelocity(150);

    }
    end() {

    }
}