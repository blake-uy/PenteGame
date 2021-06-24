/**
 * This class populates a table of joinable games and sends a request to the server
 * if the user tries to join a game
 */
import {login, currentGame, main, gameClient} from "./main.js";
import {GameView} from "./game-view.js";

export class JoinGameView {
    gameToJoin;
    currentGameText;

    constructor() {
        this.dialogElement = document.getElementById("join-game");
        this.shadeElement = document.getElementById("shade");
        this.tableElement = document.getElementById("join-game-table");

        // Close button
        const closeButton = this.dialogElement.querySelector('#join-game button.close-btn');
        closeButton.addEventListener('click', (e) => this.close(e) );

        // Cancel button
        const cancelButton = this.dialogElement.querySelector('#join-game .cancel-btn');
        cancelButton.addEventListener('click', (e) => this.close(e) );

        //Join Button
        const joinButton = this.dialogElement.querySelector('#join-game button.ok-btn')
        joinButton.addEventListener('click',(e) =>{
            this.gameToJoin = document.querySelector("#join-game-table tr.selected");
            this.currentGameText = document.getElementById("current-game");

            if(this.gameToJoin == null){alert("No Game Selected");}


            fetch("/gameMaster/joinGame/" + this.gameToJoin.dataset.id,{method: "PATCH", headers: {'Authorization': "Basic " + btoa(login.details)}})
                .then((r) =>{console.log(r.status)
                if(r.status === 202){
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
                }
                    if(r.status == 404){
                        alert("Game No Longer Exists, Please Refresh");
                    }
                })

                .then(()=>{
                    this.tableElement.innerHTML = "";
                    this.createTable();

                })

        })

        // Clicks on the shade will also cause the dialog to close.
        this.shadeElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close(e)
        });
        if(login.details != "")
            this.createTable();

        // let newGames =
        //     [
        //     {name: "Tim's Game", createdBy: "Tim", gameID: "1azx342"},
        //     {name: "You Will Lose", createdBy: "Winner", gameID: "98764523"},
        //     {name: "Friendly Game", createdBy: "Abe", gameID: "sgr4352"},
        //     {name: "Tim's Game", createdBy: "Tim", gameID: "1azx342"},
        //     {name: "You Will Lose", createdBy: "Winner", gameID: "98764523"},
        //     {name: "Friendly Game", createdBy: "Abe", gameID: "sgr4352"},
        //     {name: "Tim's Game", createdBy: "Tim", gameID: "1azx342"},
        //     {name: "You Will Lose", createdBy: "Winner", gameID: "98764523"},
        //     {name: "Friendly Game", createdBy: "Abe", gameID: "sgr4352"},
        //     {name: "Tim's Game", createdBy: "Tim", gameID: "1azx342"},
        //     {name: "You Will Lose", createdBy: "Winner", gameID: "98764523"},
        //     {name: "Friendly Game", createdBy: "Abe", gameID: "sgr4352"},
        //     {name: "Tim's Game", createdBy: "Tim", gameID: "1azx342"},
        //     {name: "You Will Lose", createdBy: "Winner", gameID: "98764523"},
        //     {name: "Friendly Game", createdBy: "Abe", gameID: "sgr4352"},
        // ];


       // this.tableElement = document.getElementById("join-game-table");
       // this.generateTable(this.tableElement,this.newGames);
       // this.generateTableHead(this.tableElement, Object.keys(this.newGames[0]));

       // this.tableRow = document.querySelector('tr');

        //this.createTable();

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
        this.tableElement.innerHTML ="";
        this.dialogElement.style.display = 'none';
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
            fetch("/gameMaster/viewNewGames",{headers: {'Authorization': "Basic " + btoa(login.details)}})
                .then((r) =>{return r.json()})
                .then ((data) => {
                    console.log(data.length);
                    if (!(data == null && data.length==0)) {
                        try {
                            this.generateTable(this.tableElement, data);
                            this.generateTableHead(this.tableElement, Object.keys(data[0]));
                        }catch (e){
                            
                        }
                        for (let i = 0; i < this.tableElement.rows.length; i++) {
                            function toggleClass(el, className) {
                                if (el.className.indexOf(className) >= 0) {
                                    el.className = el.className.replace(className, '');

                                } else {
                                    el.className += className;
                                }
                            }

                            this.tableElement.rows[i].onclick = function () {
                                let selected = document.querySelector("#join-game-table tr.selected");
                                if (selected != null) {
                                    console.log("execute")
                                    selected.className = '';
                                }
                                toggleClass(this, 'selected');
                            };
                        }
                    }

                } )

    }
}
