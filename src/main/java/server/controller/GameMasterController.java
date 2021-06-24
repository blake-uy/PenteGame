package server.controller;
import Domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

/**
 * This is just an example, feel free to remove it.  It demonstrates how to
 * get access to the authenticated user's information (if authentication is required).
 */
@RestController
@RequestMapping("gameMaster")
public class GameMasterController {

    private static GameMaster gm;

    public GameMasterController(GameMaster gm) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        this.gm = gm;

        this.gm.createUser("mike", "dog");
        this.gm.createUser("sally", "cat");
        this.gm.createGame(gm.users.get("sally"),"sally's game");
        this.gm.createGame(gm.users.get("sally"),"sally's game2");
        this.gm.createGame(gm.users.get("sally"),"sally's game3");

    }

    public static GameMaster getGm(){
        return gm;
    }

//    @GetMapping
//    public String sayHello(Principal user) {
//        return "Hello there: " + user.getName();
//    }

    @GetMapping(path = "login", produces = "application/json")
    public List<User> getAllUsers(){
        List<User> users = gm.getAll();
        return users;
    }

    @PostMapping(path = "login", consumes = "application/json",produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User data) {
        if (gm.users.get(data.getName()) != null){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE);
        }
        if (!gm.passwordCheck(data.getPassword())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        gm.createUser(data.getName(), data.getPassword());
        
        return gm.users.get(data.getName());
    }

//curl -X POST -H "Content-Type:application/json" -d "{\"name\":\"calvin\", \"password\":\"turtle\"}" http://localhost:8080/gameMaster/login

    @GetMapping(path = "login/{username}", produces = "application/json")
    public User getUser( @PathVariable("username") String username ) {
        User user = gm.users.get(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @DeleteMapping(path = "deleteLogin/{username}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser( @PathVariable("username") String username ) {
        if ( !gm.deleteUser(username) ) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "viewNewGames", produces = "application/json")
    public List viewNewGames(){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = gm.users.get(principal.getUsername());

        return gm.viewNewGames(principal.getUsername());
    }

    @PatchMapping (path = "joinGame/{gameID}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void joinGame(@PathVariable("gameID") String gameID ){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = gm.users.get(principal.getUsername());
        if(! gm.joinGame(user ,gameID))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @PatchMapping (path = "quitGame/{gameID}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void quitGame(@PathVariable("gameID") String gameID ){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = gm.users.get(principal.getUsername());
        if (gm.penteGames.get(gameID) == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } else {
            gm.quitGame(user, gameID);
        }
    }

    @GetMapping(path = "viewExistingGames", produces = "application/json")
    public List viewExistingGames(){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return gm.viewExistingGames(principal.getUsername());
    }

    @GetMapping(path = "/game/{gameID}")
    public PenteGame getGame(@PathVariable("gameID") String gameID){
        return gm.penteGames.get(gameID);
    }

//    @GetMapping(path = "/game/{gameID}/checkWin")
//    public boolean checkWin(@PathVariable("gameID") String gameID){
//        return
//    }


    @GetMapping(path = "game/{gameID}/pieces", produces = "application/json")
    public List<Piece> getPieces(@PathVariable("gameID") String gameID){
        List<Piece> pieces = new ArrayList<>();
        PenteGame game = gm.penteGames.get(gameID);
        System.out.println(game.getName());


        Board board = game.getBoard();

        int[][] positions = board.getPositions();

        for(int x = 0; x < positions.length; x++){
            for(int y = 0; y < positions[x].length; y++){
                if(positions[x][y] != 0){
                    pieces.add(new Piece(x, y, positions[x][y]));
                }
            }
        }
        return pieces;

    }

    @PatchMapping(path = "makeMove/{gameID}", produces = "application/json")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public int makeMove(@PathVariable("gameID") String gameID, @RequestParam("row") int row, @RequestParam("col") int col)
    {
        // for now if player 1 wins, return the color number passed through (color and id of the winning player, otherwise 0
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = gm.users.get(principal.getUsername());

        PenteGame game = gm.penteGames.get(gameID);
        // returns -2 if not your turn, -1 if invalid move, 0 if valid move but no win, or number of player that won (1 or 2)
        return game.move(col, row, user.getName());
    }

    @PostMapping(path = "createGame")
    @ResponseStatus(HttpStatus.CREATED)
    public void createGame(@RequestParam("gamename") String gamename) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = gm.users.get(principal.getUsername());

        gm.createGame(user, gamename);
    }



}
