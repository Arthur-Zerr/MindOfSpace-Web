import Phaser from 'phaser'

export default class LoginScene extends Phaser.Scene {
    constructor() {
        super('LoginScene');
    }

    init() {

    }

    preload () {
        this.load.html('loginView', 'html/loginView.html');
        this.load.image('StarBackground', 'images/background.png');
    }

    create() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        this.bg = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'StarBackground').setScrollFactor(0);

        var view = this.add.dom((windowWidth / 2) - 35 , (windowHeight / 2) - 75).createFromCache('loginView');
        view.addListener('click');

        view.on('click', function (event) {
    
            if (event.target.name === 'loginButton')
            {
                // this.scene.scene.start('MenuScene');
                this.scene.scene.start('MenuScene');
                this.removeListener('click');
                this.scene.scene.stop();

            }
        });
    }

    update() { 
    }

    end() {

    }
}