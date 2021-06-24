import {Board} from './board.js';
import {gameClient, login, currentGame} from "./main.js";

/**
 * This class represents the game view screen.  It takes care of the button click
 * events on that screen and has methods for showing and hiding.
 */
export class GameView {
    player1;
    player2;
    constructor() {
        // Object for managing the board
        this.board = new Board();

        // The DOM element containing this view
        this.viewElement = document.getElementById('game-view-container');

        // The DOM element for the "back to main" button
        this.backToMainBtn = document.getElementById('back-main-btn');
        // When the button is clicked, tell the GameClient object to the game view
        this.backToMainBtn.addEventListener('click', (e) => {
            gameClient.gameView.board.wsDisconnect();
            gameClient.showView(gameClient.VIEWS.MAIN_VIEW);
        });

        console.log("before"+currentGame.gameID);
        if(currentGame.gameID !== "") {
            this.preSet();
            //this.board.show();
        }

        this.resignBtn = document.getElementById('resign-btn');
        this.resignBtn.addEventListener('click', (e) => {
            fetch("/gameMaster/quitGame/" + currentGame.gameID,{method: "PATCH", headers: {'Authorization': "Basic " + btoa(login.details)}})
                .then((r) =>{console.log(r.status)
                    //currentGame.gameID = "";
                    if (login.name === this.player1){
                        alert(this.player2 + " is the Pente master");
                    } else  {
                        alert(this.player1 + " is the Pente master");
                    }
                    currentGame.gameID = "";
                    this.currentGameText = document.getElementById("current-game");
                    this.currentGameText.innerHTML = "";
                    gameClient.showView(gameClient.VIEWS.MAIN_VIEW);
                })
        })
/*
        this.switchUserBtn = document.getElementById('switch-user');
          this.switchUserBtn.addEventListener('click',(e)=>{
            this.switchUser(e);
            console.log("switch user: " + login.details);
              gameClient.gameView.preSet();
        });
 */
    }

    show() {
        // Set the display style to 'flex' to make visible.
        this.viewElement.style.display = 'flex';
        console.log("before"+currentGame.gameID);
        if(currentGame.gameID !== "") {
            this.preSet();
        }
    }

    hide() {
        // Set display to 'none' to hide.
        this.viewElement.style.display = 'none';
    }

    preSet(){
        fetch("/gameMaster/game/" + currentGame.gameID, {headers: {'Authorization': "Basic " + btoa(login.details)}})
            .then((r) => {
                console.log("executes");
                return r.json();
            })
            .then((data) => {
                console.log(data);
                this.setUp(data);
            })
    }

    setUp(data){

        let temp = document.getElementById("user-name");
        temp.innerHTML = login.name;
        document.getElementById("game-title").innerHTML = data["name"];
        if(data["p1"]["name"] == login.name) {
            document.getElementById("user-color").innerHTML = "White";
            document.getElementById("user-captures").innerHTML = "Captures: " + data["p1"]["captures"];
            document.getElementById("opp-name").innerHTML = data["p2"]["name"];
            document.getElementById("opp-color").innerHTML = "Black";
            document.getElementById("opp-captures").innerHTML = "Captures: " + data["p2"]["captures"];

            document.getElementById("is-user-turn").innerHTML = "x: " + data["p1"]["prevX"] + ", y: " + data["p1"]["prevY"];
            document.getElementById("is-opp-turn").innerHTML = "x: " + data["p2"]["prevX"] + ", y: " + data["p2"]["prevY"];

            this.player1 = login.name;
            this.player2 = data["p2"]["name"];
        }
        else {
            document.getElementById("user-color").innerHTML = "Black";
            document.getElementById("user-captures").innerHTML = "Captures: " + data["p2"]["captures"];
            document.getElementById("opp-name").innerHTML = data["p1"]["name"];
            document.getElementById("opp-color").innerHTML = "White";
            document.getElementById("opp-captures").innerHTML = "Captures: " + data["p1"]["captures"];

            document.getElementById("is-user-turn").innerHTML = "x: " + data["p2"]["prevX"] + ", y: " + data["p2"]["prevY"];
            document.getElementById("is-opp-turn").innerHTML = "x: " + data["p1"]["prevX"] + ", y: " + data["p1"]["prevY"];

            this.player2 = login.name;
            this.player1 = data["p1"]["name"];
        }
        // if(data["currentTurn"]["name"]===login.name) {
        //     document.getElementById("is-user-turn").innerHTML = "Your Turn";
        //     document.getElementById("is-opp-turn").innerHTML = "";
        // }
        // else {
        //     document.getElementById("is-user-turn").innerHTML = "";
        //     document.getElementById("is-opp-turn").innerHTML = "Opponent's Turn";
        // }

    }

    switchUser(e){

        if(login.name == this.player1){
            login.name = this.player2;
            login.details = this.player2 +":secret";}
        else if((login.name == this.player2)){
            login.name = this.player1;
            login.details = this.player1 +":secret";}

    }
}
