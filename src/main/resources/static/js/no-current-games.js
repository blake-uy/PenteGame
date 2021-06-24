import {gameClient, login, currentGame} from "./main.js";

export class NoGameView {
    constructor() {
        // The DOM element containing this view
        this.viewElement = document.getElementById('no-current-games');

        // The DOM element for the "back to main" button
        this.backToMainBtn = document.getElementById('back-menu-btn');
        // When the button is clicked, tell the GameClient object to the main view
        this.backToMainBtn.addEventListener('click', (e) => {
            gameClient.showView(gameClient.VIEWS.MAIN_VIEW);
        });

    }

    show() {
        // Set the display style to 'flex' to make visible.
        this.viewElement.style.display = 'inline';
    }

    hide() {
        // Set display to 'none' to hide.
        this.viewElement.style.display = 'none';
    }

}
