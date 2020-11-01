import Phaser from 'phaser'

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
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(time, delta) {
        if (this.cursors.left.isDown)
        {
            this.player.setAngularVelocity(-150);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setAngularVelocity(150);
        }
        else
        {
            this.player.setAngularVelocity(0);
        }
    
        if (this.cursors.up.isDown)
        {
            this.physics.velocityFromRotation(this.player.rotation - 1.5708, 600, this.player.body.acceleration);
            this.player.setTexture('FalconRocketFire');
        }
        else
        {
            this.player.setAcceleration(0);
            this.player.setTexture('FalconRocket')
        }
    
        if (this.nitro.isDown) {
            this.player.setMaxVelocity(12000);
        }
        else {
            this.player.setMaxVelocity(1200);
    
        }

        if(this.escape.isDown) {
            this.ShowEscapeMenu = !this.ShowEscapeMenu;
        }
        
        if(this.ShowEscapeMenu) {
            console.log("Escape Menu");
        }

        this.bg.tilePositionX += this.player.body.deltaX() * 0.5;
        this.bg.tilePositionY += this.player.body.deltaY() * 0.5;    
    }

    end() {

    }
}