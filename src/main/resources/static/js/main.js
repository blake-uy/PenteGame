// Import statements are the ways that we gain access to exported names in
// other JS files when using ES6 modules.
import {GameClient} from './game-client.js';

// Call the main function when the DOM is loaded
window.addEventListener('load', main);

// "export" makes this variable accessible in other JS files.
// To access, use the import statement.
export let gameClient = null;
export let login ={ details:"", name: ""};
export let currentGame = {
    gameID: ""
};
/**
 * The entry point for your application.  This will be called once the 
 * HTML DOM is fully loaded.
 */
export function main() {
    console.log("Current Game: " + currentGame.gameID);
    gameClient = new GameClient();


}
