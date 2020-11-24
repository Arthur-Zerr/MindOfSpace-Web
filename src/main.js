import Phaser from 'phaser';

import GameScene from './scenes/GameScene';
import MenuScene from './scenes/MenuScene';
import LoginScene from './scenes/LoginScene';

import "nes.css/css/nes.min.css";


const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	autoFocus: true,
	gameTitle: 'MindOfSpace',
	backgroundColor: '#000000',
	pixelArt: true,
	parent: 'CanvasDiv',
	mode: Phaser.Scale.FIT,
	autoCenter: Phaser.Scale.CENTER_BOTH,
	antialias: false,
	fps:60,
	physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
	},
	dom: {
        createContainer: true
	},
	input: {
        gamepad: true
    },
	scene: [LoginScene, MenuScene, GameScene]
};

var game = new Phaser.Game(config); 
export default game
