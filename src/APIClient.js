import PlayerForGameCreateDto from './Dtos/PlayerForGameCreate'
import PlayerGameDto from './Dtos/PlayerGameDto'
import game from './main';


export default class APIClient {

    APIUrl = "https://localhost:5001"

    LoginAsync(playerLogin) {
        return new Promise(reslove => {
            var httpRequest = new XMLHttpRequest();

            if(!httpRequest){
                alert('ERROR HTTP Client');
            }
            httpRequest.open("POST", this.APIUrl + "/Player/Login", true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            httpRequest.onreadystatechange = function() {
                if (this.readyState == 4) {
                    reslove({response: this.responseText, code: this.status});
                }
            };

            httpRequest.send(JSON.stringify(playerLogin));
        });
    }
    
    LogoutAsync(playerLogoutData){
        //TODO Add this
    }

    //TODO Add This all
    CreateGameAsync(playerId) {
        return new Promise(reslove => {
            var httpRequest = new XMLHttpRequest();

            if(!httpRequest){
                alert('ERROR HTTP Client');
            }
            httpRequest.open("POST", this.APIUrl + "/Game/Create", true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            var token = JSON.parse(localStorage.getItem('Player'));
            httpRequest.setRequestHeader('Authorization', 'Bearer ' + token.tokenInformation.jwtToken)
            httpRequest.onreadystatechange = function() {
                if (this.readyState == 4) {
                    reslove({response: this.responseText, code: this.status});
                }
            };
            var playerDto = new PlayerForGameCreateDto();
            playerDto.PlayerId = playerId;

            httpRequest.send(JSON.stringify(playerDto));
        });
    }

    LeaveGameAsync(playerId, gameId) {
        return new Promise(reslove => {
            var httpRequest = new XMLHttpRequest();

            if(!httpRequest){
                alert('ERROR HTTP Client');
            }
            httpRequest.open("POST", this.APIUrl + "/Game/Leave", true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            var token = JSON.parse(localStorage.getItem('Player'));
            httpRequest.setRequestHeader('Authorization', 'Bearer ' + token.tokenInformation.jwtToken)
            httpRequest.onreadystatechange = function() {
                if (this.readyState == 4) {
                    reslove({response: this.responseText, code: this.status});
                }
            };
            var playerGame = new PlayerGameDto();
            playerGame.PlayerId = playerId;
            playerGame.GameId = gameId;

            httpRequest.send(JSON.stringify(playerGame));
        });
    }

    JoinGame(playerId, gameId) {
        return new Promise(reslove => {
            var httpRequest = new XMLHttpRequest();

            if(!httpRequest){
                alert('ERROR HTTP Client');
            }
            httpRequest.open("POST", this.APIUrl + "/Game/Join", true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            var token = JSON.parse(localStorage.getItem('Player'));
            httpRequest.setRequestHeader('Authorization', 'Bearer ' + token.tokenInformation.jwtToken)
            httpRequest.onreadystatechange = function() {
                if (this.readyState == 4) {
                    reslove({response: this.responseText, code: this.status});
                }
            };
            var playerGame = new PlayerGameDto();
            playerGame.PlayerId = playerId;
            playerGame.GameId = gameId;

            httpRequest.send(JSON.stringify(playerGame));
        });
    }

    UpdateGame(UpdateData) {

    }

    UpdateGameLobby(gameId) {
        return new Promise(reslove => {
            var httpRequest = new XMLHttpRequest();

            if(!httpRequest){
                alert('ERROR HTTP Client');
            }
            httpRequest.open("GET", this.APIUrl + "/Game/Game/" + gameId, true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            var token = JSON.parse(localStorage.getItem('Player'));
            httpRequest.setRequestHeader('Authorization', 'Bearer ' + token.tokenInformation.jwtToken)
            httpRequest.onreadystatechange = function() {
                if (this.readyState == 4) {
                    reslove({response: this.responseText, code: this.status});
                }
            };
            httpRequest.send();
        });
    }

    GameExistAsync(gameId) {
        return new Promise(reslove => {
            var httpRequest = new XMLHttpRequest();

            if(!httpRequest){
                alert('ERROR HTTP Client');
            }
            httpRequest.open("GET", this.APIUrl + "/Game/GameExist/" + gameId, true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            var token = JSON.parse(localStorage.getItem('Player'));
            httpRequest.setRequestHeader('Authorization', 'Bearer ' + token.tokenInformation.jwtToken)
            httpRequest.onreadystatechange = function() {
                if (this.readyState == 4) {
                    reslove({response: this.responseText, code: this.status});
                }
            };
            httpRequest.send();
        });
    }

    


    AddHighscore() {
        
    }

    LastHighscore() {

    }

    PlayerHighscore() {

    }
}