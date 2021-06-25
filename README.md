# CS 390 Group Project Template

This is a starting template for the group project for CS 390, Spring 2021.
It uses the Gradle tool for build and dependency management.

![screen-small](https://user-images.githubusercontent.com/58790294/123349883-af2aac80-d50e-11eb-96e1-86e6cd1ff7a9.png)


Functional Requirements
  - This implementation of Pente will use the basic rules (including captures)], but will not support the “Tournament Rule.”
  - Users have a username which is globally unique and is selected by the user.
  - The game is a networked game, so each player will be running their own client application, possibly on separate computers.
  - The password storage system is still being designed by the security team, so for now, passwords will not be required. The security team will implement the password system separately, and coordinate with your team later.
  - Users must be able to have an unlimited number of games in progress at any time. However, the client UI will only support making moves in one game at a time. If a user wants to play multiple games simultaneously they can launch multiple instances of the client application.
  - Users can leave and re-join a game at any time without losing any progress. This includes shutting down the client computer (or application) and restarting.
  - Either player can create a game.
  - When a game is created, the creating user must supply the username of the opposing player, and whether the creating user wants to play as white or black.
  - Games have a name and an internal ID number. The internal ID number is not (usually) directly visible to the users. Games are identified by the ID number and not the game name. This means that duplicate game names are allowed.
  - Users can vew a list of games that are in-progress in which they are a player.
  - The opponent does not need to be “online” in order for a player to make a move.
  - The client UI must display a list of all moves that were made in order including information about captures, and the current state of the game board.
  - Each move should include (at least) the date/time it was made, which player made the move, the board location, and the number of captured pairs (if any).
  - Users should not be able to make illegal moves.

Non-Functional Requirements
  - When playing or viewing a game, a player/viewer must see the moves made by others within 5 seconds of the move being posted to the system.
  - The system will use HTTP as the networking protocol with JSON messages.
  - The system will use Websockets for client updates.
  - The system will include a server and a client application.
  - If a player tries to make an illegal move, the system must deny that move. This must be enforced by both the client and the server (not just the client).
  - Since management has not yet decided on a persistance solution (database, text files, etc.), and that solution may change, the prototype will not have a persistence system.
  - Instead, all data will be stored in memory.

![Screenshot (96)](https://user-images.githubusercontent.com/58790294/123349946-d41f1f80-d50e-11eb-98f5-d6e912ace477.png)

  - The management expects to create a Java client, an Android client, an iOS client, and a web based client, but not right away. Initially, we will create a single prototype client using a Java desktop GUI or Javascript-based single-page web application.
  - The system must support the addition of additional games with minimal impact to the system.
The server must support a modest number (1000s) of simultaneous users.
