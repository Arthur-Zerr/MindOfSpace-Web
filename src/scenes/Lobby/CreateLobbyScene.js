import Phaser from 'phaser'
import APIClient from "../../APIClient";

export default class CreateLobbyScene extends Phaser.Scene {
    constructor() {
        super('CreateLobbyScene')
    }

    init() {
    }

    preload() {
        this.load.html('createLobbyview', 'html/CreatelobbyView.html');
        this.load.html('uicenterText', 'html/UI/centerText.html');
        this.load.html('uibackButton', 'html/UI/backButton.html');
        
        this.load.image('StarBackground', 'images/background.png');
    }

    async create() {
        this.ApiClient = new APIClient();
        
        var user = JSON.parse(localStorage.getItem('Player'));

        var response = await this.ApiClient.CreateGameAsync(user.player.id);
        if(response.code != 200)
        {
            alert("Error creating game lobby!");
            this.scene.transition({ target: 'MenuScene'});
        }
    
        this.gameLobby = JSON.parse(response.response)
        
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        this.bg = this.add.tileSprite(windowWidth / 2 + 120, windowHeight / 2, windowWidth, windowHeight, 'StarBackground').setScrollFactor(0);

        var uiCenterTextView = this.add.dom((windowWidth / 2) - 300 , (windowHeight) - 100).createFromCache('uicenterText');
        var uiCenterText = uiCenterTextView.getChildByID('Title');
        uiCenterText.innerHTML = 'Game code: ' + this.gameLobby.id;

        var view = this.add.dom((windowWidth / 2), (windowHeight / 2) - 100).createFromCache('createLobbyview');
        view.addListener('click');
        view.on('click', function (event) {
    
            if(event.target.name === 'startGame')
            {
                this.startGame();
            }
        }, this);

        var uiBackButtonView = this.add.dom(50, 50).createFromCache('uibackButton');
        uiBackButtonView.addListener('click');
        uiBackButtonView.on('click', function (event) {
            if(event.target.name === 'backButton')
            {
                this.leaveGame(this);
            }
        }, this);

        this.updateLobbyTimer = this.time.addEvent({ delay: 1000, callbackScope: this, callback: this.updateLobby, loop: true });
        this.updateLobby();
    }

    startGame = function() {
        //TODO Add this
    }

    updateLobby = async function() {
        var response = await this.ApiClient.UpdateGameLobby(this.gameLobby.id);
        if(response.code != 200) {
            alert('ERROR in Lobby, please leave!');
            this.updateLobbyTimer.paused = true;
            return;
        }
        var gameUpdate = JSON.parse(response.response);
        
        if(gameUpdate.gameState === 3) {
            this.scene.stop();
            this.updateLobbyTimer.paused = true;
            alert('Game Closed!');
            this.scene.transition({ target: 'MenuScene'});
            return;
        }

        if(gameUpdate.playerList == undefined || gameUpdate.playerList == null )
            return;
        if(this.playerList === gameUpdate.playerList)
            return;
        
        this.clearTable();

        gameUpdate.playerList.forEach(player => {
            this.addUser(player.username, player.level, 'Player')
        });

        this.playerList = gameUpdate.playerList;
    }

    leaveGame = async function() {
        this.updateLobbyTimer.paused = true;

        var player = JSON.parse(localStorage.getItem('Player'));
        var gameId = this.gameLobby.id;
        var response = await this.ApiClient.LeaveGameAsync(player.player.id, gameId);
        if(response.code != 200)
            alert("Error leaving Game!, force leave")
        this.scene.transition({ target: 'MenuScene'});
    }

    clearTable = function() {
        var table = document.getElementById("lobbyTable")
        var length = table.rows.length;
        for (let tableRow = 3; tableRow <= length; tableRow++) {
            table.deleteRow(table.rows.length-1);
        }
    }

    addUser = function(username, level, role) {
        var table = document.getElementById("lobbyTable")
        var lastRow = table.rows.length;
        var row = table.insertRow(lastRow++);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = username
        var cell2 = row.insertCell(1);
        cell2.innerHTML = level
        var cell3 = row.insertCell(2);
        cell3.innerHTML = role
    }
}