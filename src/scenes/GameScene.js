import Phaser from 'phaser'
import { QuantityBar } from 'phaser-ui-tools'

var gamepad = undefined;

const PlayerStates = {
    Normal: 1,
    Boost: 2,
    Turbo: 3
}

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }


    init() {
        this.ShowEscapeMenu = false;
    }

    preload() {
        this.load.image('FalconRocket', 'images/Falcon.png');
        this.load.image('FalconRocketFire', 'images/Falcon9Fire.png');
        this.load.image('FalconRocketBigFire', 'images/Falcon9BigFire.png');
        this.load.image('FalconHeavyRocket', 'images/FalconHeavy.png');
        this.load.image('StarBackground', 'images/background.png');

        this.load.html('gameUI', 'html/gameUI.html');

        this.load.image('EarthPlanet', 'images/Planets/Earth.png')
        this.load.image('Cancerlanet', 'images/Planets/CancerPlanet.png')
        this.load.image('CyanPlanet', 'images/Planets/CyanPlanet.png')
        this.load.image('GreenPlanet', 'images/Planets/GreenPlanet.png')
        this.load.image('PurplePlanet', 'images/Planets/PurplePlanet.png')
        this.load.image('RedPlanet', 'images/Planets/RedPlanet.png')
    }

    create() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.bg = this.add.tileSprite(this.windowWidth / 2, this.windowHeight / 2, this.windowWidth, this.windowHeight, 'StarBackground').setScrollFactor(0);
        this.physics.world.bounds.setTo(-25000, -25000, 50000, 50000);

        //Player --------------
        this.player = this.physics.add.image(this.windowWidth / 2, this.windowHeight / 2, 'FalconRocket');
        this.player.setScale(3.5, 4.5);
        this.player.setDrag(150);
        this.player.setAngularDrag(200);
        this.player.setMaxVelocity(1200);
        this.player.setBounce(1, 1);
        this.player.setCollideWorldBounds(true);


        this.cameras.main.startFollow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.nitro = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

        this.playerState = PlayerStates.Normal;

        // UI --------------
        var gameUI = this.add.dom((this.windowWidth / 2), (this.windowHeight) - 75).createFromCache('gameUI');
        gameUI.setScrollFactor(0);

        this.LiveBar = gameUI.getChildByID('LiveBar');
        this.NitroBar = gameUI.getChildByID('NitroBar');

        this.NitroTimer = this.time.addEvent({ delay: 200, callbackScope: this, callback: this.NitroTick, loop: true });
        this.NitroTimer.paused = true;

        // Planets --------------

        this.Planets = [];
        this.PlayerRadius = 1000;
        for (let index = 0; index < 1000; index++) {
            this.SpawnPlanets();
            
        }
        //this.PlanetTimer = this.time.addEvent({ delay: 1000, callbackScope: this, callback: this.SpawnPlanet, loop: true });
        
    }

    update(time, delta) {
        var gamepads = this.input.gamepad.gamepads;

        if (gamepads.length > 0) {
            this.gamepad = gamepads[0];
        }

        if (this.gamepad) {
            this.GamepadInput();
            //this.KeyboardInput();
        }
        else {
            this.KeyboardInput();
        }

        switch (this.playerState) {
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
        if (this.gamepad.left || this.gamepad.axes[0].getValue() < -0.2) {
            this.PlayerLeft();
        }
        else if (this.gamepad.right || this.gamepad.axes[0].getValue() > 0.2) {
            this.PlayerRight();
        }
        else {
            this.player.setAngularVelocity(0);
        }

        if ((this.gamepad.up || this.gamepad.A) && this.gamepad.X == false)//|| this.gamepad.axes[1].getValue() < -0.2)
        {
            this.PlayerUp();
        }
        else if ((this.gamepad.X) && this.gamepad.up == false && this.gamepad.A == false && parseInt(this.NitroBar.getAttribute('value')) > 0) {
            this.PlayerNitro();
        }
        else {
            this.playerState = PlayerStates.Normal;
            this.player.setAcceleration(0);
            this.NitroTimer.paused = true;
        }
    }


    KeyboardInput() {
        if (this.cursors.left.isDown) {
            this.PlayerLeft();
        }
        else if (this.cursors.right.isDown) {
            this.PlayerRight();
        }
        else {
            this.player.setAngularVelocity(0);
        }

        if (this.cursors.up.isDown && this.nitro.isDown == false) {
            this.PlayerUp();
        }
        else if (this.nitro.isDown && this.cursors.up.isDown == false && parseInt(this.NitroBar.getAttribute('value')) > 0) {
            this.PlayerNitro();
        }
        else {
            this.playerState = PlayerStates.Normal;
            this.player.setAcceleration(0);
            this.NitroTimer.paused = true;
        }
    }

    PlayerUp() {
        this.physics.velocityFromRotation(this.player.rotation - 1.5708, 150, this.player.body.acceleration);
        this.playerState = PlayerStates.Boost;
    }

    PlayerNitro() {
        this.playerState = PlayerStates.Turbo;
        this.physics.velocityFromRotation(this.player.rotation - 1.5708, 600, this.player.body.acceleration);
        this.NitroTimer.paused = false;
    }

    PlayerLeft() {
        this.player.setAngularVelocity(-150);
    }

    PlayerRight() {
        this.player.setAngularVelocity(150);

    }

    PlayerDamage() {
        this.LiveBar.setAttribute('value', (parseInt(this.LiveBar.getAttribute('value')) - 10).toString());
    }

    NitroTick() {
        this.NitroBar.setAttribute('value', (parseInt(this.NitroBar.getAttribute('value')) - 2).toString());
    }
    end() {

    }

    SpawnPlanets() {
        // var r = 6 * Math.random();
        // var a = 2 * Math.PI * Math.random();
        // var x = r * Math.sin(a) * this.player.body.x;
        // var y = r * Math.cos(a) * this.player.body.y;

        var x = Math.ceil(Math.random() * 50000) * (Math.round(Math.random()) ? 1 : -1)
        var y = Math.ceil(Math.random() * 50000) * (Math.round(Math.random()) ? 1 : -1)

        var planetIndex = Math.floor(Math.random() * 6);

        switch (planetIndex) {
            case 0:
                this.SpawnPlanet(x, y, 'EarthPlanet');
                break;
            case 1:
                this.SpawnPlanet(x, y, 'Cancerlanet');
                break;
            case 2:
                this.SpawnPlanet(x, y, 'CyanPlanet');
                break;            
            case 3:
                this.SpawnPlanet(x, y, 'GreenPlanet');
                break;
            case 4:
                this.SpawnPlanet(x, y, 'PurplePlanet');
                break;
            case 5:
                this.SpawnPlanet(x, y, 'RedPlanet');
                break;
            default:
                break;
        }
    }

    SpawnPlanet(x, y, name) {
        var planet = this.physics.add.sprite(x, y, name);
        planet.body.immovable = true;
        this.Planets.push(planet);
        this.physics.add.collider(this.player, planet, this.CollidePlanet, null, this);
    }

    CollidePlanet(player, planet) {
        // planet.disableBody(true, true);
        this.PlayerDamage();
    }

}