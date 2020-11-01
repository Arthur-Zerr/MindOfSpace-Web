import Phaser from 'phaser';

import GameScene from './scenes/GameScene';
import MenuScene from './scenes/MenuScene';


const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	autoFocus: true,
	gameTitle: 'MindOfSpace',
	backgroundColor: '#000000',
	pixelArt: true,
	antialias: false,
	physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
	},
	scene: [MenuScene, GameScene]
};

export default new Phaser.Game(config)
