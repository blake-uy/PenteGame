package Domain;

import java.util.*;

public class GameMaster {
    public Map<String, PenteGame> penteGames;
    public Map<String, User> users;
    private static int id;


    public GameMaster() {
        this.users = new HashMap<>();
        this.penteGames = new HashMap<>();
        this.id = 0;
    }

    private int generateId() {
        return id++;
    }

    public synchronized List<User> getAll(){
        return new ArrayList<User>(users.values());
    }

    public synchronized boolean passwordCheck(String password) {
        if (password.length() > 20 || password.length() == 0) {
            return false;
        }
        return true;
    }

    public synchronized boolean createUser(String Username, String password) {
        try {
            if (users.containsKey(Username))
                throw new Exception("User Name Already Exists");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        User newUser = new User(Username, password);
        users.put(Username, newUser);

        return true;
    }

    public synchronized User login(String Username, String password) throws Exception {
        if (users.get(Username).getPassword() != password) {
            throw new Exception("Password was incorrect");
        }
        if (!users.containsKey(Username))
            throw new Exception("User does not exist");

        return users.get(Username);
    }

    public synchronized boolean deleteUser(String Username) {
        if (users.get(Username) != null){
            List<PenteGame> games = this.viewExistingGames(Username);
            for (PenteGame i: games){
                this.quitGame(users.get(Username), i.getGameID());
            }
            users.remove(Username);
            return true;
        }

        return false;

    }

    public String createGame(User user, String gameName) {

        String gameID = String.valueOf(generateId());

        PenteGame newGame = new PenteGame(gameName, gameID, user);
        penteGames.put(gameID, newGame);

        return gameID;
    }

    public synchronized boolean joinGame(User user, String gameID) {

        PenteGame gameToJoin = penteGames.get(gameID);
        //added a check here to make sure that the user that made the game does not try to join their own game
        if (gameToJoin.getP2() != null || user.getName() == penteGames.get(gameID).getP1().getName())
            return false;

        gameToJoin.join(user);

        return true;
    }

    public synchronized List<PenteGame> viewNewGames(String username) {
        User currentUser = users.get(username);

        List<PenteGame> newGames = new ArrayList<>();
        penteGames.forEach((k, v) -> {
            if (v.getP2() == null && !v.getP1().getName().equals(currentUser.getName()))
                newGames.add(v);
        });


        return newGames;
    }


    public synchronized List<PenteGame> viewExistingGames(String username) {
        List<PenteGame> existingGames = new ArrayList<>();
        try {
            penteGames.forEach((k, v) -> {
                if(v.getP2() != null)
                    if (v.getP1().getName().equals(username) || v.getP2().getName().equals(username))
                        existingGames.add(v);
            });
        }catch (Exception e) {
            e.printStackTrace();
        }
      return existingGames;
    }

    public synchronized PenteGame selectExistingGame(String gameID) {
        return penteGames.get(gameID);
    }

    //user forfeits and removes the game as well as awarding the other player with the win
    public synchronized void quitGame(User username, String gameID){
        username.updateTotalLosses();
        User other;
        if (penteGames.get(gameID).getP1().getName().equals(username.getName())) {
            other = users.get(penteGames.get(gameID).getP2().getName());
        }
        else{
            other = users.get(penteGames.get(gameID).getP1().getName());
        }
        other.updateTotalWins();
        penteGames.remove(gameID);
    }

    //winner is allowed to end the game. Checks if game actually ended then pairs user to which player won
    public synchronized boolean endGame(User username, String gameID){
        boolean p1Win = penteGames.get(gameID).getP1().getWin();
        boolean p2Win = penteGames.get(gameID).getP2().getWin();
        String p1 = penteGames.get(gameID).getP1().getName();
        String p2 = penteGames.get(gameID).getP2().getName();
        User other;

        if (p1Win) {
            if (p1.equals(username.getName())){
                username.updateTotalWins();
                other = users.get(penteGames.get(gameID).getP2().getName());
                other.updateTotalLosses();
            } else {
                other = users.get(penteGames.get(gameID).getP1().getName());
                other.updateTotalWins();
                username.updateTotalLosses();
            }
            penteGames.remove(gameID);
            return true;
        } else if (p2Win) {
            if (p2.equals(username.getName())){
                username.updateTotalWins();
                other = users.get(penteGames.get(gameID).getP1().getName());
                other.updateTotalLosses();
            } else {
                other = users.get(penteGames.get(gameID).getP2().getName());
                other.updateTotalWins();
                username.updateTotalLosses();
            }
            penteGames.remove(gameID);
            return true;
        } else {
            //System.out.println("Game still going");
            return false;
        }

    }


}
