import {gameClient, login, currentGame} from './main.js';

/**
 * This class represents the main title screen.  It takes care of the button click
 * events on that screen and has methods for showing and hiding.
 */
export class MainView {

    constructor() {
         //const joinGameView = new JoinGameView();
        // The DOM element containing this view
        this.viewElement = document.getElementById('default-view-container');

        // The DOM element for the "show game view" button
        this.showGameViewBtnEl = document.getElementById('show-game-btn');
        // When the button is clicked, tell the GameClient object to the game view
        this.showGameViewBtnEl.addEventListener('click', (e) => {
            if (currentGame.gameID != ""){
                gameClient.gameView.board.draw();
                gameClient.gameView.board.wsConnect();
                gameClient.showView(gameClient.VIEWS.GAME_VIEW);
            } else {
                gameClient.showView(gameClient.VIEWS.NO_GAME_VIEW);
            }

        });

        // The DOM element for the "Join Game" button
        this.showJoinGamesBtn = document.getElementById('show-join-games-btn');
        // When the button is clicked, tell the GameClient object to show the dialog window
        this.showJoinGamesBtn.addEventListener('click', (e) => {
            const joinGames = document.getElementById("join-game-table");
            joinGames.innerHTML = "";
            gameClient.joinGameView.createTable();
            gameClient.showJoinGames();
        });

        // The DOM element for the "New Game" button
        this.showNewGameBtn = document.getElementById('show-new-game-btn');
        // When the button is clicked, tell the GameClient object to show the dialog window
        this.showNewGameBtn.addEventListener('click', (e) => {
            gameClient.showNewGame();
        });

        // The DOM element for the "View Games" button
        this.showViewGamesBtn = document.getElementById('show-view-games-btn');
        // When the button is clicked, tell the GameClient object to show the view games window
        this.showViewGamesBtn.addEventListener('click', (e) => {
            gameClient.showViewGames();
            const activeGames = document.getElementById("view-games-table");
            activeGames.innerHTML = "";
            gameClient.viewGamesView.createTable();
        });

        // The DOM element for the "Settings" button
        this.settingsBtn = document.getElementById('settings-btn');
        // When the button is clicked, tell the GameClient object to show the settings window
        this.settingsBtn.addEventListener('click', (e) => {
            gameClient.showSettings();
        });
    }

    show() {
        // Set the display style to 'flex' to make visible.
        this.viewElement.style.display = 'flex';
    }

    hide() {
        // Set display to 'none' to hide.
        this.viewElement.style.display = 'none';
    }

}
