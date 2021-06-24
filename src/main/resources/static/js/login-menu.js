import {gameClient, login, currentGame} from './main.js';

export class LoginMenu {
    constructor() {
        // The DOM element containing this view
        this.viewElement = document.getElementById('login-menu');

        // The DOM element for the "new user?" button
        this.showNewUserBtnEl = document.getElementById('new-user-btn');
        this.showNewUserBtnEl.addEventListener('click', (e) => {
            gameClient.showView(gameClient.VIEWS.NEW_USER_VIEW);
        });

        // The DOM element for the "login-submit" button
        // When the button is clicked, tell the GameClient object to the main view
        const submitBtn = document.getElementById('login-submit-btn');
        submitBtn.addEventListener('click', (e) => this.findUser(e));

    }

    findUser(e) {
        const inputName = document.getElementById('name');
        const username = inputName.value;
        const inputPassword = document.getElementById('password');
        const password = inputPassword.value;
        this.loginUser(username, password);
    }

    loginUser(username, password){
        const uError = document.getElementById('username-error');
        const pError = document.getElementById('password-error');
        fetch("/gameMaster/login/" + username )
            .then( (resp) => {
                if (resp.status === 404){
                    console.error("User not found");
                    uError.innerHTML = "User not found";
                } else {
                    uError.innerHTML = "";
                    return resp.json();
                }
            })
            .then( (data) => {
                //console.log(data);
                const p = data.password;
                if (p === password) {
                    currentGame.gameID = "";
                    login.details = data.name+":secret";
                    login.name = data.name;
                    this.userID = document.getElementById("settings-btn");
                    this.userID.innerHTML = login.name;
                    gameClient.showView(gameClient.VIEWS.MAIN_VIEW);

                } else {
                    console.error("Password is incorrect");
                    pError.innerHTML = "Password is incorrect";
                }

            })
    }

    show() {
        // Set the display style to 'flex' to make visible.
        this.viewElement.style.display = 'flex';
        const uError = document.getElementById('username-error');
        uError.innerHTML = "";
        const pError = document.getElementById('password-error');
        pError.innerHTML = "";
    }

    hide() {
        // Set display to 'none' to hide.
        this.viewElement.style.display = 'none';
    }
}
