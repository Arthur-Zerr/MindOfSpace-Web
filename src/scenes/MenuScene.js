import Phaser from 'phaser'
// @ts-ignore
import { TextButton, Column} from 'phaser-ui-tools';

export default class MenuScene extends Phaser.Scene {
    constructor() {
      super('MenuScene');
    }

    init() {

    }

    preload () {
        this.load.spritesheet('button',  'images/Buttons.png', { frameWidth: 128, frameHeight: 48 });
        this.load.image('StarBackground', 'images/background.png');

        this.load.html('menuView', 'html/menuView.html');

    }

    create() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        this.bg = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'StarBackground').setScrollFactor(0);

        // var textStyle = {'fill': '#FFF', 'font': '16px Courier New'};
        // // this.header = new TextSprite(this, 0, 0, "header").setText('Header', textStyle).setOrigin(0.0, 0.0);

        // var buttonOne = new TextButton(this, 0, 0, "button", this.newGameCallback, this, 1, 0, 2, 1)
        //   .setText("New Game", textStyle)
        //   .eventTextYAdjustment(3);
        // var buttonTwo = new TextButton(this, 0, 0, "button", this.continueCallback, this, 1, 0, 2, 1)
        //   .setText("Continue", textStyle)
        //   .eventTextYAdjustment(3);
        // var buttonThree = new TextButton(this, 0, 0, "button", this.optionsCallback, this, 1, 0, 2, 1)
        //   .setText("Options", textStyle)
        //   .eventTextYAdjustment(3);
    
        // var column = new Column(this, window.innerWidth / 2, window.innerHeight / 2);
        // column.addNode(buttonOne, 0, 10);
        // column.addNode(buttonTwo, 0, 10);
        // column.addNode(buttonThree, 0,10);

        var view = this.add.dom((windowWidth / 2) - 35 , (windowHeight / 2) - 75).createFromCache('menuView');
        view.addListener('click');
        view.on('click', function (event) {
    
          if (event.target.name === 'randomGameJoin')
          {
            this.scene.scene.start('GameScene');
            this.removeListener('click');
            this.scene.scene.stop();
          }
      });
    }
    
    newGameCallback = function() {
        this.scene.transition({ target: 'GameScene'});
    }
    
    
    continueCallback = function() {
        this.header.text.setText('You clicked the Continue button');
    }
    
    
    optionsCallback = function() {
        this.header.text.setText('You clicked the Options button');
    }

    update() { 
    }

    end() {

    }
}