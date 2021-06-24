import {gameClient, login, currentGame} from "./main.js";

export class SettingsView {
    constructor() {
        this.settingsElement = document.getElementById("settings");
        this.shadeElement = document.getElementById("shade");

        // Close button
        const closeButton = this.settingsElement.querySelector('#settings button.close-btn');
        closeButton.addEventListener('click', (e) => this.close(e) );

        this.backButton = this.settingsElement.querySelector('#settings button.logout-btn');
        this.backButton.addEventListener('click', (e) => {
            this.close(e);
            this.clearInfo(e);
            gameClient.showView(gameClient.VIEWS.LOGIN_MENU);
        });

        // Clicks on the shade will also cause the dialog to close.
        this.shadeElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close(e)
        });

        this.deleteUserButton = this.settingsElement.querySelector('#settings button.delete-user-btn')
        this.deleteUserButton.addEventListener('click', (e) => {
            this.deleteUser(e);
        });

        /*
        this.helpButton = this.settingsElement.querySelector('#settings button.help-btn')
        this.helpButton.addEventListener('click', (e) => {
            gameClient.showView(gameClient.showHelp());
        });
         */
    }

    deleteUser(evt) {
        fetch("/gameMaster/deleteLogin/" + login.name, {method: "DELETE", headers: {'Authorization': "Basic " + btoa(login.details)}})
            .then((resp) => {
                if (resp.status === 404){
                    // this.updateList();
                    console.error("Error in deleting user " + resp.status);
                } else {
                    //return resp.json();
                    this.close();
                    gameClient.showView(gameClient.VIEWS.LOGIN_MENU);
                }
            })
    }

    clearInfo(evt) {
        const currentGameText = document.getElementById("current-game");
        currentGameText.innerHTML = "";
        login.details = "";
        login.name = "";
        currentGame.gameID = "";
        const tableElement = document.getElementById("join-game-table");
        tableElement.innerHTML = "";
        const activeGames = document.getElementById("view-games-table");
        activeGames.innerHTML = "";
    }

    /**
     * Show settings
     */
    show() {
        this.settingsElement.style.display = 'flex';
        this.shadeElement.style.display = 'flex';
    }

    /**
     * Close settings
     * @param event the associated Event
     */
    close( event ) {
        this.settingsElement.style.display = 'none';
        this.shadeElement.style.display = 'none';
    }

}
