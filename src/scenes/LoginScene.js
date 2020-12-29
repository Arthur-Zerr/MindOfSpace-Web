import Phaser from 'phaser'
import APIClient from '../APIClient';

import PlayerForLoginDto from '../Dtos/PlayerForLoginDto'
import { SlideTransition } from 'phaser3-transitions';

import "core-js/stable";
import "regenerator-runtime/runtime";

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
        let config = {
            type: 'slide',
            duration: 500,
            enterFrom: 'left',
            exitTo: 'left'
          }
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        this.bg = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'StarBackground').setScrollFactor(0);
        
        this.ApiClient = new APIClient();

        var view = this.add.dom((windowWidth / 2) , (windowHeight / 2) - 75).createFromCache('loginView');
        view.addListener('click');
        
        this.usernameTextbox = view.getChildByID("username");
        this.passwordTextbox = view.getChildByID("password");


        let sprite = [view];
        this.slide = new SlideTransition(this, sprite, config);
        this.slide.enter();

        view.on('click', async function (event) {
            if (event.target.name === 'loginButton')
            {
                this.usernameValue = this.usernameTextbox.value;
                this.passwordValue = this.passwordTextbox.value;

                if(this.usernameValue != "" || this.passwordValue != "")
                {
                    var playerRegister = new PlayerForLoginDto();
                    playerRegister.Username = this.usernameValue;
                    playerRegister.Password = this.passwordValue;

                    var response = await this.ApiClient.LoginAsync(playerRegister);
                    if(response.code == 200)
                    {
                        var test = JSON.parse(response.response)
                        localStorage.setItem("Player", response.response)
                        this.slide.exit();
                        this.scene.transition({ target: 'MenuScene'});
                    }
                    else if (response.code == 400)
                    {
                        alert("Username or Password are Wrong!");
                    }
                }
                else
                {
                    console.log("Click");
                    alert("Username or Password are Wrong!");
                }
            }
            if (event.target.name === 'registerButton')
            {
                this.usernameValue = this.usernameTextbox.value;
                this.passwordValue = this.passwordTextbox.value;

                if(this.usernameValue != "" || this.passwordValue != "")
                {
                    var playerRegister = new PlayerForLoginDto();
                    playerRegister.Username = this.usernameValue;
                    playerRegister.Password = this.passwordValue;

                    var response = await this.ApiClient.RegisterAsync(playerRegister);
                    if(response.code == 200)
                    {
                        var test = JSON.parse(response.response)
                        localStorage.setItem("Player", response.response)
                        this.slide.exit();
                        this.scene.transition({ target: 'MenuScene'});
                    }
                    else if (response.code == 400)
                    {
                        alert("User already exists");
                    }
                }
                else
                {
                    console.log("Click");
                    alert("Username or Password are empty");
                }
            }
        }, this);
    }

    update() { 
    }

    end() {

    }
}