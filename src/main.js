import Phaser from 'phaser';
import TransitionsPlugin from 'phaser3-transitions';

import GameScene from './scenes/GameScene';
import MenuScene from './scenes/MenuScene';
import LoginScene from './scenes/LoginScene';
import CreateLobbyScene from './scenes/Lobby/CreateLobbyScene';
import JoinLobbyScene from './scenes/Lobby/JoinLobbyScene';

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
            debug: false
        }
	},
	dom: {
        createContainer: true
	},
	plugins: {
        scene: [
            { 
                key: 'transitions', 
                mapping: 'transitions',
                plugin: TransitionsPlugin
            }
        ]
    },
	input: {
        gamepad: true
    },
	scene: [LoginScene, MenuScene, GameScene, CreateLobbyScene, JoinLobbyScene]
};

var game = new Phaser.Game(config); 
localStorage.removeItem("Player")
localStorage.removeItem("Game")

export default game
