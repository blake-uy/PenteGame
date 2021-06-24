/**
 * This class manages the graphical view of the game board.  Clicks on
 * the game board will cause the cell location to print to the console (see
 * mouseClickOnBoard().
 */
import {currentGame, gameClient, login, main} from "./main.js";

export class Board {

    constructor() {


        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.cellSize = this.width / 19.0;  // Assume width = height

        this.draw();


        this.gameisWon = false;
        // Add an event listener to the canvas to be triggered on mouse click.  When a
        // click occurs, it will call the function mouseClickOnBoard.
        //
        // Important note: when using **instance methods** as event listeners, you should wrap with
        // a lambda function as shown below.
        this.canvas.addEventListener('click', (e) => this.mouseClickOnBoard(e) );

        this.wsClient = null;
        this.wsSubscription = null;
    }

    wsConnect(){
        const gameID = currentGame.gameID;
        this.wsClient = new StompJs.Client({
            brokerURL: "ws://" + window.location.host + "/ws"
            //brokerURL: 'ws://localhost:8080/ws'

        });
        this.wsClient.onConnect = (f) => {
            this.wsClient.subscribe(`/topic/gameMaster/${currentGame.gameID}`, (msg) => this.wsMessage(msg),{Authorization: login.details});
            this.wsSubscription = this.wsClient.subscribe(`/topic/gameMaster/${currentGame.gameID}` ,
                (msg) => this.wsMessage(msg),{Authorization: login.details} );
        };
        this.wsClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
        this.wsClient.activate();
    }

    wsDisconnect() {
        if( this.wsSubscription !== null ) {
            this.wsSubscription.unsubscribe();
            this.wsSubscription = null;
        }
        if( this.wsClient !== null ) {
            this.wsClient.deactivate();
            this.wsClient = null;
        }
    }

    wsMessage(msg) {
        const obj = JSON.parse(msg.body);
        this.redraw(obj);
        // this.drawPiece(obj['x'], obj['y'], obj["color"].toLowerCase());
    }

    wsSend(piece){
        this.wsClient.publish({
            destination: `/app/gameMaster/${currentGame.gameID}`,
            Authorization: login.details,
            body: JSON.stringify(piece)
        });
    }

    draw() {
        // Draw the Board's background and grid
        this.drawBoard();
        // Draw some pieces
        if(currentGame.gameID != "")
        fetch("/gameMaster/game/"+currentGame.gameID+"/pieces", {headers: {'Authorization': "Basic " + btoa(login.details)}})
            .then((r) => { return r.json()})
            .then((data) =>{
            for (let element of data) {
                this.drawPiece(element["x"], element["y"], element["color"].toLowerCase())

                }
        })

        // this.drawExamplePieces();
    }

    redraw(pieces){
        console.log(pieces);
        this.drawBoard();
        for(let piece of pieces){
            this.drawPiece(piece["x"], piece["y"], piece["color"].toLowerCase());
        }
    }

    /**
     * Draws the game board.  For details on how to draw with a CanvasRenderingContext2D,
     * see this:  https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
     */
    drawBoard() {
        const ctx = this.ctx;

        // Clear the canvas
        ctx.clearRect(0, 0, this.width, this.height);

        // Set the style for the grid lines
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        // Draw the grid lines
        const cellSize = this.cellSize;
        ctx.beginPath();
        // Vertical lines
        for( let i = 0; i < 19; i++ ) {
            const x = cellSize / 2 + i * cellSize;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
        }
        // Horizontal lines
        for( let i = 0; i < 19; i++ ) {
            const y = cellSize / 2 + i * cellSize;
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
        }
        ctx.closePath();
        ctx.stroke();
    }


    /**
     * Draw a single piece on the board.
     *
     * @param {*} x the x cell number (zero based)
     * @param {*} y the y cell number (zero based)
     * @param {*} color the color
     */
    drawPiece(x, y, color) {
        const ctx = this.ctx;
        const cellSize = this.cellSize;

        ctx.fillStyle = color;

        const cx = cellSize / 2 + x * cellSize;
        const cy = cellSize / 2 + y * cellSize;
        const radius = cellSize / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2 );
        ctx.fill();
    }

    /**
     * Called when a mouse click occurs on the game board.  Currently, just
     * prints the cell corresponding to the click to the Javascript console.
     *
     * @param {MouseEvent} e the mouse event
     */
    mouseClickOnBoard(e) {
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;

        // Clamp mouse coordinates to valid range
        mouseX = Math.max( Math.min(mouseX, this.width - 1), 0);
        mouseY = Math.max( Math.min(mouseY, this.height - 1), 0);

        // Find and print the cell number for the click
        const cellX = Math.floor( mouseX / this.cellSize );
        const cellY = Math.floor( mouseY / this.cellSize );

        console.log(`Click on cell: (${cellX}, ${cellY})`);
        if(!this.gameisWon) {
            fetch("/gameMaster/makeMove/" + currentGame.gameID + "?col=" + cellX + "&row=" + cellY, {
                method: "PATCH",
                headers: {'Authorization': "Basic " + btoa(login.details)}
            })
                .then(r => r.json())
                .then((json) => {
                    //console.log('this is the json data, int?', json)
                    if (json == 0) {
                        //console.log("This is a valid int comparison!");
                        let c;
                        if(document.getElementById("user-color").innerHTML.toUpperCase()=="BLACK")
                            c = 2;
                        else
                            c=1;
                        const piece = {
                            x: cellX,
                            y: cellY,
                            color: c
                        }

                        if (login.name === gameClient.gameView.player1){
                            this.p1x = piece.x;
                            this.p1y = piece.y;
                        } else {
                            this.p2x = piece.x;
                            this.p2y = piece.y;
                        }


                        /*
                        if (gameClient.gameView.player1 === login.name){
                            const userLastMove = document.getElementById("is-user-turn");
                            userLastMove.innerHTML = "Previous Move: " + "x: " + piece.x + ", y: " + piece.y;
                        } else {
                            const oppLastMove = document.getElementById("is-opp-turn");
                            oppLastMove.innerHTML = "Previous Move: " + "x: " + piece.x + ", y: " + piece.y;
                        }
                         */



                        console.log(JSON.stringify(piece));
                        this.wsSend(piece);

                    }
                    else if (json == 1) {
                        let c;
                        if(document.getElementById("user-color").innerHTML.toUpperCase()=="BLACK")
                            c = 2;
                        else
                            c=1;
                        const piece = {
                            x: cellX,
                            y: cellY,
                            color: c
                        }
                        console.log(JSON.stringify(piece));
                        this.wsSend(piece);
                        alert(gameClient.gameView.player1 + " is the pente master");
                        this.gameisWon = true;
                    }
                    else if (json == 2) {
                        let c;
                        if(document.getElementById("user-color").innerHTML.toUpperCase()=="BLACK")
                            c = 2;
                        else
                            c=1;
                        const piece = {
                            x: cellX,
                            y: cellY,
                            color: c
                        }

                        console.log(JSON.stringify(piece));
                        this.wsSend(piece);
                        alert(gameClient.gameView.player2 + "is the pente master");
                        this.gameisWon = true;
                    }      else{
                        alert("Opponent's Turn")
                    }
                })
                .then(() => {
                })
                .then(() => {
                    gameClient.gameView.preSet();
                })
        }

    }
    // show() {
    //     // Set the display style to 'flex' to make visible.
    //     this.canvas.style.display = 'flex';
    //     this.wsConnect();
    // }

    hide() {
        // Set display to 'none' to hide.
        this.canvas.style.display = 'none';
    }


}
