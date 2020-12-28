import Phaser from 'phaser'

import "core-js/stable";
import "regenerator-runtime/runtime";

// @ts-ignore
import { TextButton, Column} from 'phaser-ui-tools';
import APIClient from "./../APIClient";

// @ts-ignore
import { SlideTransition } from 'phaser3-transitions';

export default class MenuScene extends Phaser.Scene {

    ApiClient = new APIClient();
    
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
        let config = {
          type: 'slide',
          duration: 500,
          enterFrom: 'right',
          exitTo: 'right'
        }
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        this.bg = this.add.tileSprite(windowWidth / 2 + 60, windowHeight / 2, windowWidth, windowHeight, 'StarBackground').setScrollFactor(0);

        this.view = this.add.dom((windowWidth / 2) , (windowHeight / 2) - 75).createFromCache('menuView');

        let sprite = [this.view];

        this.slide = new SlideTransition(this, sprite, config);
        this.slide.enter();
        this.view.addListener('click');
        this.view.on('click', async function (event) {
    
          if (event.target.name === 'traning') {
            // this.removeListener('click');
            this.scene.transition({ target: 'GameScene'});

          }
          if(event.target.name === 'logout') {
            localStorage.removeItem('Player')
            // this.removeListener('click');
            this.slide.exit();
            this.scene.transition({ target: 'LoginScene'});

          }
          if(event.target.name === 'createGame') {
            // this.removeListener('click');
            this.scene.transition({ target: 'CreateLobbyScene'});
          }
          if(event.target.name === 'JoinGame'){
            var joinId = this.view.getChildByID('joinGameIdText');
            var response = await this.ApiClient.GameExistAsync(joinId.value);
            if(response.code == 200){
                this.scene.transition({ target: 'JoinLobbyScene', data: {gameId: joinId.value}});
            }
            else{ 
              alert('Game not Found!');
            }
          }

      }, this);
    }
    
    update() { 
    }

    end() {

    }
}