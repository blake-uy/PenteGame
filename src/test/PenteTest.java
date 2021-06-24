package Domain;

import org.junit.jupiter.api.Assertions;
//import org.junit.Assertions;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PenteTest {

	//checks for invalid move off the board
	@Test
	void testValidMove1() {
		Board board = new Board();
		Assertions.assertFalse(board.validMove(-1, 5, 0));
	}
	
	//checks for invalid move when there is already a piece in that spot
	@Test
	void testValidMove2() {
		Board board = new Board();
		board.validMove(0, 6, 1);
		Assertions.assertFalse(board.validMove(0, 6, 0));
	}
	
	//checks for valid move
	@Test
	void testValidMove3() {
		Board board2 = new Board();
		Assertions.assertTrue(board2.validMove(5, 5, 1));
	}
	
	//checks for 5 in a row and should result in a win
	@Test
	void testCheckWin1() {
		Board board = new Board();
		board.validMove(1, 1, 1);
		board.validMove(2, 2, 1);
		board.validMove(3, 3, 1);
		board.validMove(4, 4, 1);
		Assertions.assertTrue(board.checkWin(5, 5));
	}
	
	//should not be a win
	@Test
	void testCheckWin2() {
		Board board = new Board();
		board.validMove(1, 1, 1);
		board.validMove(2, 2, 1);
		Assertions.assertFalse(board.checkWin(2, 2));
	}
	
	//should be a win
	@Test
	void testCheckWin3() {
		Board board = new Board();
		board.validMove(0, 18, 1);
		board.validMove(1, 17, 1);
		board.validMove(2, 16, 1);
		board.validMove(3, 15, 1);
		board.validMove(4, 14, 1);
		Assertions.assertTrue(board.checkWin(4, 14));
	}
	
	//checks if there is a capture when the player places a stone on the right side
	@Test
	void testCheckCapture1() {
		Board board = new Board();
		board.validMove(0, 0, 2);
		board.validMove(0, 1, 1);
		board.validMove(0, 2, 1);
		board.validMove(0, 3, 2);
		Assertions.assertTrue(board.checkCapture(0, 3));
	}
	
	//should fail
	@Test
	void testCheckCapture2() {
		Board board = new Board();
		board.validMove(0, 0, 2);
		board.validMove(0, 1, 1);
		board.validMove(0, 2, 1);
		Assertions.assertFalse(board.checkCapture(0, 5));
	}
	
	//checks if there is a capture when the player places a stone on the left side
	@Test
	void testCheckCapture3() {
		Board board = new Board();
		board.validMove(0, 1, 1);
		board.validMove(0, 2, 1);
		board.validMove(0, 3, 2);
		board.validMove(0, 0, 2);
		Assertions.assertTrue(board.checkCapture(0, 0));
	}
	
	//should fail because the stones are x o _ x and o is placed in empty spot
	@Test
	void testCheckCapture4() {
		Board board = new Board();
		board.validMove(0, 1, 1);
		board.validMove(0, 2, 2);
		board.validMove(0, 4, 1);
		board.validMove(0, 3, 2);
		Assertions.assertFalse(board.checkCapture(0, 3));
	}

	//Sprint 2 tests ;

	//tests if user is successfully created
	@Test
	void testCreateUser1() {
		GameMaster g = new GameMaster();
		Assertions.assertTrue(g.createUser("Sally", "cat"));
	}

	//should fail because username is taken
	@Test
	void testCreateUser2() {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		Assertions.assertFalse(g.createUser("Sally", "cat"));
	}


	//tests if user is successfully deleted
	@Test
	void testDeleteUser1() {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		Assertions.assertTrue(	g.deleteUser("Sally"));
	}

	//tests if user is deleted
	@Test
	void testDeleteUser2() {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		g.createUser("John", "mouse");

		Assertions.assertTrue(g.deleteUser("Sally"));
	}


	//tests if game is successfully created
	@Test
	void testCreateGame1() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		String game1 = g.createGame(Tim, "my first game");
		Assertions.assertEquals("my first game", g.penteGames.get(game1).getName());
	}

	//tests if game with the same name is successfully created (should have different gameIDS
	@Test
	void testCreateGame2() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		String game1 = g.createGame(Tim, "my first game");
		String game2 = g.createGame(Tim, "my first game");
		g.deleteUser("Tim");
		g.deleteUser("Sally");
		Assertions.assertEquals(g.penteGames.get(game2).getName(), g.penteGames.get(game1).getName());
	}

	//tests if joining a game works
	@Test
	void testJoinGame1() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Bill", "mouse");
		g.createUser("Sam", "horse");
		User Bill = g.login("Bill", "mouse");
		User Sam = g.login("Sam", "horse");
		String game1 = g.createGame(Bill, "my first game");
		g.joinGame(Sam, game1);
		Assertions.assertEquals(g.penteGames.get(game1).getGameID(), game1);
	}

	//the a player tries to join a game as both players, should not work
	@Test
	void testJoinGame2() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		String game1 = g.createGame(Tim, "my first game");
		//g.joinGame(Tim, game1);
		Assertions.assertFalse(g.joinGame(Tim, game1));
	}

	//the a player tries to join a game that was already filled
	@Test
	void testJoinGame3() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		g.createUser("John", "mouse");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		User John = g.login("John", "mouse");
		String game1 = g.createGame(Tim, "my first game");
		g.joinGame(Sally, game1);
		Assertions.assertFalse(g.joinGame(John, game1));
	}

	//should fail because password is invalid
	@Test
	void testPassword1() {
		GameMaster g = new GameMaster();
		Assertions.assertFalse(g.createUser("Sally", ""));
	}

	//should fail because password is invalid
	@Test
	void testPassword2() {
		GameMaster g = new GameMaster();
		Assertions.assertFalse(g.createUser("Sally", "2r2on2toi290502j0newnwqln"));
	}

	//should pass
	@Test
	void testPassword3() {
		GameMaster g = new GameMaster();
		Assertions.assertTrue(g.createUser("Sally", "2r2on2t"));
	}
	/*
	//should pass
	@Test
	void testLogin1() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Tim", "mouse");
		User Tim;
		Assertions.assertThrows(IllegalArgumentException.class, g.login("Tim", "cat"), "Password was incorrect");
	}
	 */

	//checks if Sally can successfully forfeit and give Tim the win
	@Test
	void testQuitGame1() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		String game1 = g.createGame(Tim, "my first game");
		g.joinGame(Sally, game1);
		g.quitGame(Sally, game1);
		Assertions.assertEquals(1, Tim.calculateWinRate());
	}

	//checks if sally can forfeit two games and give both wins to Tim
	@Test
	void testQuitGame2() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		String game1 = g.createGame(Tim, "my first game");
		String game2 = g.createGame(Tim, "my first game");
		g.joinGame(Sally, game1);
		g.joinGame(Sally, game2);
		g.quitGame(Sally, game1);
		g.quitGame(Sally, game2);
		Assertions.assertEquals(2, Tim.getTotalWins());
	}

	//makes sure that sallys win rate stays at zero
	@Test
	void testQuitGame3() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		String game1 = g.createGame(Tim, "my first game");
		String game2 = g.createGame(Tim, "my first game");
		g.joinGame(Sally, game1);
		g.joinGame(Sally, game2);
		g.quitGame(Sally, game1);
		g.quitGame(Sally, game2);
		Assertions.assertEquals(0, Sally.calculateWinRate());
	}

	//checks if winner gets to end the game
	@Test
	void testEndGame1() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		String game1 = g.createGame(Tim, "my first game");
		g.joinGame(Sally, game1);
		PenteGame p = g.penteGames.get(game1);
		p.move(0, 7, "Tim");
		p.move(0, 18, "Sally");
		p.move(0, 0, "Tim");
		p.move(1, 17, "Sally");
		p.move(0, 1, "Tim");
		p.move(2, 16, "Sally");
		p.move(0, 2, "Tim");
		p.move(3, 15, "Sally");
		p.move(0, 3, "Tim");
		p.move(4, 14, "Sally");
		Assertions.assertTrue(g.endGame(Sally, game1));
	}

	//tries to end the game but sees that no one has won so it keeps going
	@Test
	void testEndGame2() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		String game2 = g.createGame(Tim, "my first game");
		g.joinGame(Sally, game2);
		PenteGame p = g.penteGames.get(game2);
		p.move(1, 17, "Tim");
		p.move(0, 0, "Sally");
		p.getBoard().display();
		Assertions.assertFalse(g.endGame(Sally, game2));
	}

	//checks if winner gets to end the game
	@Test
	void testMove1() throws Exception {
		GameMaster g = new GameMaster();
		g.createUser("Sally", "cat");
		g.createUser("Tim", "dog");
		User Tim = g.login("Tim", "dog");
		User Sally = g.login("Sally", "cat");
		String game1 = g.createGame(Tim, "my first game");
		g.joinGame(Sally, game1);
		PenteGame p = g.penteGames.get(game1);
		p.move(0, 7, "Tim");
		p.move(0, 18, "Sally");
		p.move(0, 0, "Tim");
		p.move(1, 17, "Sally");
		p.move(0, 1, "Tim");
		p.move(2, 16, "Sally");
		p.move(0, 2, "Tim");
		p.move(3, 15, "Sally");
		p.move(0, 3, "Tim");
		//p.getBoard().display();
		Assertions.assertEquals(2, p.move(4, 14, "Sally"));
	}
}
