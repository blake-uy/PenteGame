import {currentGame, gameClient, login} from "./main.js";

/**
 * This is a class for creating a new game.
 */
export class NewGameView {
    constructor() {
        console.log("NewGameView created from new-game.js")
        this.dialogElement = document.getElementById("new-game");
        this.shadeElement = document.getElementById("shade");


        // Close button
        const closeButton = this.dialogElement.querySelector('#new-game button.close-btn');
        closeButton.addEventListener('click', (e) => this.close(e) );

        // Create a game button
        const createButton = document.getElementById("create-btnID")
        createButton.addEventListener('click', (e) => {
            let currentText = document.getElementById('gamename').value;
            fetch("/gameMaster/createGame" + "?gamename=" + currentText,{method: "POST", headers: {'Authorization': "Basic " + btoa(login.details)}})
                .then((r) => {
                    console.log(r.status)
                    if (r.status === 201) {
                        this.close();
                        alert("Successfully created a game of name: " + currentText);
                    }
                    if (r.status === 500) {
                        alert("FAILED to create game of name: " + currentText);
                    }
                })

        })


/*
        // Cancel button
        const cancelButton = this.dialogElement.querySelector('#new-game .cancel-btn');
        cancelButton.addEventListener('click', (e) => this.close(e) );
*/

        // Clicks on the shade will also cause the dialog to close.
        this.shadeElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close(e)
        });
    }

    /**
     * Show the dialog
     */
    show() {
        this.dialogElement.style.display = 'flex';
        this.shadeElement.style.display = 'flex';
    }

    /**
     * Close the dialog
     * @param event the associated Event
     */
    close( event ) {
        this.dialogElement.style.display = 'none';
        this.shadeElement.style.display = 'none';
    }

}
