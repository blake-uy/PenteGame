/**
 * This class displays the new user login screen to allow a user to make
 * a new account. Checks if username and password are valid then sends
 * request to the server that creates the user.
 */
import {gameClient, login, currentGame} from "./main.js";

export class NewUserView {

    constructor() {
        //the DOM element containing this view
        this.viewElement = document.getElementById('login-view-container');

        this.currentGameText = document.getElementById("current-game");

        //when clicked, it creates a new user with the given username and password if the username is valid
        const submitBtn = document.getElementById('new-user-submit-btn');
        submitBtn.addEventListener('click', (e) => this.createNewUser(e));

        //goes back to the login menu
        this.backButton = this.viewElement.querySelector('#login-view-container button.cancel-btn')
        this.backButton.addEventListener('click', (e) => {
            gameClient.showView(gameClient.VIEWS.LOGIN_MENU);
        });


    }

    //checks if username and password are valid and if so, creates account
    createNewUser(evt){
        const userInput = document.getElementById('newusername');
        const u = userInput.value;
        const passInput = document.getElementById('newpassword');
        const p = passInput.value;
        const uError = document.getElementById('new-user-error');
        const pError = document.getElementById('new-password-error');

        fetch("/gameMaster/login", {
            method: "POST", headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: u,
                password: p
            })
        }).then((resp) => {
                if (resp.status === 201) {
                    pError.innerHTML = "";
                    uError.innerHTML = "";
                    return resp.json();
                } else if (resp.status === 400){
                    console.error("Password is not valid.");
                    uError.innerHTML = "";
                    pError.innerHTML = "Password is not valid";
                } else {
                    console.error("Username already exists.");
                    pError.innerHTML = "";
                    uError.innerHTML = "Username already exists";
                }
            })
            .then((data) => {
                currentGame.gameID = "";
                login.details = data.name+":secret";
                login.name = data.name;
                this.userID = document.getElementById("settings-btn");
                this.userID.innerHTML = login.name;
                gameClient.showView(gameClient.VIEWS.MAIN_VIEW);
            })
    }

    show() {
        // Set the display style to 'flex' to make visible.
        this.viewElement.style.display = 'inline';
        const uError = document.getElementById('new-user-error');
        uError.innerHTML = "";
        const pError = document.getElementById('new-password-error');
        pError.innerHTML = "";
    }

    hide() {
        // Set display to 'none' to hide.
        this.viewElement.style.display = 'none';
    }

}
