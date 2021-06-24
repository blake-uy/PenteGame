/**
 * This is a class to view all existing games that the user is playing in
 */
import {login, currentGame, gameClient} from "./main.js";
import {GameView} from "./game-view.js";

export class ViewGamesView {
    gameToJoin;
    currentGameText;

    constructor() {
        this.viewGamesElement = document.getElementById("view-games");
        this.shadeElement = document.getElementById("shade");
        this.tableElement = document.getElementById("view-games-table");

        // Close button
        const closeButton = this.viewGamesElement.querySelector('#view-games button.close-btn');
        closeButton.addEventListener('click', (e) => this.close(e) );

        // Cancel button
        const cancelButton = this.viewGamesElement.querySelector('#view-games .cancel-btn');
        cancelButton.addEventListener('click', (e) => this.close(e) );

        //Open Button
        const openButton = this.viewGamesElement.querySelector('#view-games button.ok-btn')
        openButton.addEventListener('click',(e) =>{
            this.gameToJoin = document.querySelector("#view-games-table tr.selected");
            this.currentGameText = document.getElementById("current-game");

            if(this.gameToJoin == null){alert("No Game Selected");}


            fetch("/gameMaster/game/" + this.gameToJoin.dataset.id,{headers: {'Authorization': "Basic " + btoa(login.details)}})
                .then((r) =>{
                        this.currentGameText.innerHTML = "Current Game: " + this.gameToJoin.dataset.name;
                        currentGame.gameID = this.gameToJoin.dataset.id;
                        console.log("Current Game: " + currentGame.gameID);
                        this.close();
                        gameClient.gameView.preSet();
                    if (currentGame.gameID != ""){
                        gameClient.gameView.board.draw();
                        gameClient.gameView.board.wsConnect();
                        gameClient.showView(gameClient.VIEWS.GAME_VIEW);
                    }
                    // gameClient.gameView.board.wsConnect();

                })

                .then(()=>{
                    this.tableElement.innerHTML = "";

                    //this.createTable();
                    // document.getElementById('current-game').reload(true);

                    // document.getElementById('game-view-container').reload(true);
                })

        })

        // Clicks on the shade will also cause the dialog to close.
        this.shadeElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close(e)
        });
        //if(login.details != "")
           // this.createTable();
    }

    /**
     * Show the active games view
     */
    show() {
        this.viewGamesElement.style.display = 'flex';
        this.shadeElement.style.display = 'flex';
    }

    /**
     * Close the active games view
     * @param event the associated Event
     */
    close( event ) {
        //document.getElementById("view-games-table").innerHTML = "";
        this.viewGamesElement.style.display = 'none';
        this.shadeElement.style.display = 'none';
    }

    generateTableHead(table, data){
        let thead = table.createTHead();
        let row = thead.insertRow();
        // for (let key of data){
        //
        //     //todo: Format Headers
        //     key = key.replace(/([a-z])([A-Z])/g, '$1 $2');
        //
        //     let th = document.createElement("th");
        //     let text = document.createTextNode(key);
        //     th.appendChild(text);
        //     row.appendChild(th);
        // }
        let th = document.createElement("th");
        let text = document.createTextNode("Game Name");
        th.appendChild(text);
        row.appendChild(th);

        th = document.createElement("th");
        text = document.createTextNode("Created By");
        th.appendChild(text);
        row.appendChild(th);
    }
    generateTable(table, data) {
        for (let element of data) {
            let row = table.insertRow();

            let cell = row.insertCell();
            let text = document.createTextNode(element["name"]);
            cell.appendChild(text);
            cell = row.insertCell();
            text = document.createTextNode(element["p1"]["name"]);
            cell.appendChild(text);

            row.dataset.id = element["gameID"];
            row.dataset.name = element["name"];

        }
    }

    createTable() {
        fetch("/gameMaster/viewExistingGames",{headers: {'Authorization': "Basic " + btoa(login.details)}})
            .then((r) =>{return r.json()})
            .then ((data) => {
                console.log("Existing Games:" +data);
                if(data!=null){
                    this.generateTable(this.tableElement,data);
                    this.generateTableHead(this.tableElement, Object.keys(data[0]));

                    for (let i = 0; i < this.tableElement.rows.length; i++) {
                        function toggleClass(el, className) {
                            if (el.className.indexOf(className) >= 0) {
                                el.className = el.className.replace(className,'');

                            }
                            else {
                                el.className  += className;
                            }
                        }
                        this.tableElement.rows[i].onclick = function() {
                            let selected = document.querySelector("#view-games-table tr.selected");
                            if(selected != null){
                                console.log("execute")
                                selected.className='';}
                            toggleClass(this,'selected');
                        };
                    }}} )

    }

}
