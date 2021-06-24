import {GameView} from './game-view.js';
import {MainView} from './main-view.js';
import {NewUserView} from './new-user-view.js';
import {JoinGameView} from "./join-games.js";
import {NewGameView} from "./new-game.js";
import {LoginMenu} from "./login-menu.js";
import {ViewGamesView} from "./all-games-view.js";
import {SettingsView} from "./settings-view.js";
import {NoGameView} from "./no-current-game.js";

/**
 * The GameClient object represents the overall client application.  It
 * holds the primary view objects, provides methods for changing the
 * main views, and for showing an example dialog.
 */
export class GameClient {

    constructor() {
        // Something simulating an enum to represent the views available.
        this.VIEWS = { GAME_VIEW: 1, MAIN_VIEW: 2, NEW_USER_VIEW: 3, LOGIN_MENU: 4, NO_GAME_VIEW: 5};

        // Objects that manage each view

        //this.dialogView = new DialogView();
        this.mainView = new MainView();
        this.newUserView = new NewUserView();
        this.loginMenu = new LoginMenu();
        this.gameView = new GameView();
        this.joinGameView = new JoinGameView();
        this.newGameView = new NewGameView();
        this.viewGamesView = new ViewGamesView();
        this.settingsView = new SettingsView();
        this.noGameView = new NoGameView();

        // Show the default view
        this.showView( 4);
    }

    showView( view ) {
        if( view === this.VIEWS.GAME_VIEW ) {
            this.newUserView.hide();
            this.noGameView.hide();
            this.loginMenu.hide();
            this.mainView.hide();
            this.gameView.show();
        } else if( view === this.VIEWS.MAIN_VIEW ) {
            this.noGameView.hide();
            this.loginMenu.hide();
            this.gameView.hide();
            this.newUserView.hide();
            this.mainView.show();
        } else if(view === this.VIEWS.NEW_USER_VIEW ) {
            this.noGameView.hide();
            this.mainView.hide();
            this.gameView.hide();
            this.loginMenu.hide();
            this.newUserView.show();
        } else if (view === this.VIEWS.LOGIN_MENU) {
            this.noGameView.hide();
            this.newUserView.hide();
            this.gameView.hide();
            this.mainView.hide();
            this.loginMenu.show();
        } else if (view == this.VIEWS.NO_GAME_VIEW){
            this.newUserView.hide();
            this.gameView.hide();
            this.mainView.hide();
            this.loginMenu.hide();
            this.noGameView.show();
        }
    }

    showJoinGames(){
        this.joinGameView.show();
    }

    showViewGames(){
        this.viewGamesView.show();
    }

    showNewGame( ) {
        this.newGameView.show();
    }

    showSettings() {
        this.settingsView.show();
    }

}
