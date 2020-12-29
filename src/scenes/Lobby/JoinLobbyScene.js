import Phaser from 'phaser'
import APIClient from "../../APIClient";

export default class JoinLobbyScene extends Phaser.Scene {
    constructor() {
        super('JoinLobbyScene')
    }

    init(data) {
        this.gameId = data.gameId;
    }

    preload() {
        this.load.html('lobbyView', 'html/lobbyView.html');
        this.load.html('uicenterText', 'html/UI/centerText.html');
        this.load.html('uibackButton', 'html/UI/backButton.html');
        
        this.load.image('StarBackground', 'images/background.png');
    }

    async create() {
        this.ApiClient = new APIClient();

        var user = JSON.parse(localStorage.getItem('Player'));
        var response = await this.ApiClient.JoinGame(user.player.id, this.gameId);
        if(response.code != 200){
            alert('ERROR');
        }
        console.log(JSON.parse(response.response))
        this.gameLobby = JSON.parse(response.response)

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        this.bg = this.add.tileSprite(windowWidth / 2 + 120, windowHeight / 2, windowWidth, windowHeight, 'StarBackground').setScrollFactor(0);

        var uiCenterTextView = this.add.dom((windowWidth / 2) - 300 , (windowHeight) - 100).createFromCache('uicenterText');
        var uiCenterText = uiCenterTextView.getChildByID('Title');
        uiCenterText.innerHTML = 'Game code: ' +  this.gameId;

        var view = this.add.dom((windowWidth / 2), (windowHeight / 2) - 100).createFromCache('lobbyView');
        view.addListener('click');
        view.on('click', function (event) {
    
        }, this);

        var uiBackButtonView = this.add.dom(50, 50).createFromCache('uibackButton');
        uiBackButtonView.addListener('click');
        uiBackButtonView.on('click', function (event) {
            if(event.target.name === 'backButton')
            {
                this.leaveGame(this);
                console.log('Click');
            }
        }, this);

        this.updateLobbyTimer = this.time.addEvent({ delay: 1000, callbackScope: this, callback: this.updateLobby, loop: true });
        this.updateLobby();

    }

    updateLobby = async function() {
        var response = await this.ApiClient.UpdateGameLobby(this.gameId);
        if(response.code != 200) {
            alert('ERROR in Lobby, please leave!');
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