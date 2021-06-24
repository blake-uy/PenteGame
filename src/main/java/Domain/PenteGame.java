package Domain;

public class PenteGame {

	public Board getBoard() {
		return board;
	}

	private Board board;

	private Player p1;
	private Player p2;
	private int currentColor;

	public Player getP1() {
		return p1;
	}
	public Player getP2() {
		return p2;
	}

	public String getGameID() {
		return gameID;
	}
	public String getName() {
		return name;
	}

	public void setGameID(String gameID) {
		this.gameID = gameID;
	}
	public void setName(String name) {
		this.name = name;
	}

	private String gameID;
	private String name;
	private Player currentTurn;

	public Player getCurrentTurn() {
		return currentTurn;
	}

	public void setCurrentTurn(Player currentTurn) {
		this.currentTurn = currentTurn;
	}

	public PenteGame(String name, String gameID, User player1){
		this.p1 = new Player(player1.getName(), 1);

		this.name = name;
		this.gameID = gameID;
		this.currentTurn = p1;
		board = new Board();
		currentColor = 1;
	}

	public void join(User player2){ p2 = new Player(player2.getName(),2); }

	// return -2 if not your turn, -1 if not a valid move
	// return 0 for non-winning move, return 1 if move causes player 1 win, return 2 if move causes player 2 win
	public int move (int x, int y, String username){
		// if current players turn
		// if valid move
		Player currentPlayer;
		int color;
		if(p1.getName().equals( username))
			currentPlayer = p1;
		else
			currentPlayer = p2;

		color = currentPlayer.getColor();

		if(color != currentColor) { // current Color is the color of the current player
			return -2; // not your turn
		}

		if(!board.validMove(x, y, color)) {
			return -1; // not a valid move
		}
		// reaching here, a valid move has been executed
		currentPlayer.setPrevX(x);
		currentPlayer.setPrevY(y);

			if(board.checkWin(x,y)){
				System.out.println("hey");
				if (color == 1){
					p1.setWin();
				}else {
					p2.setWin();
				}
				return color; // return the color of the current, winning player
			}
			if(board.checkCapture(x,y)){
				if (color == 1) {
					p1.captures++;
					if (p1.captures == 5) {
						p1.setWin();
						return color;
					}
				}
				else {
					p2.captures++;
					if (p2.captures == 5) {
						p2.setWin();
						return color;
					}
				}
			}

			//switches the player
			currentColor = 3 - currentColor;
			return 0; // valid move, but did not result in a win
	}

//	public static void main(String [] args){
//		b=new Board();
//		Scanner kb = new Scanner(System.in);
//		System.out.print("Player 1 name: ");
//		String p1name = kb.nextLine();
//		System.out.print("Player 2 name: ");
//		String p2name = kb.nextLine();
//
//		p1 = new Player(p1name, 1);
//		p2 = new Player(p2name, 2);
//		win = false;
//
//		while(!win){
//			System.out.print("player1 x:");
//			String p1x = kb.nextLine();
//
//			System.out.print("player1 y:");
//			String p1y = kb.nextLine();
//
//			move(Integer.parseInt(p1x),Integer.parseInt(p1y), p1.color);
//			if (win) { break; } //need to break if p1 wins otherwise it will still ask for p2 move before finishing
//
//			System.out.print("player2 x:");
//			String p2x = kb.nextLine();
//
//			System.out.print("player2 y:");
//			String p2y = kb.nextLine();
//
//			move(Integer.parseInt(p2x),Integer.parseInt(p2y), p2.color);
//
//		}
//
//
//	}
	@Override
	public String toString(){
		if(p2==null)
			return "\nGame Name: " + name +" \n" + "Game ID: " + gameID +" \n" + "Player1: " + p1.getName() +" \n" +
					 "\n\n";
		else
			return "\nGame Name: " + name +" \n" + "Game ID: " + gameID +" \n" + "Player1: " + p1.getName() +" \n" +
				"Player2: " + p2.name + "\n\n";
	}


}
