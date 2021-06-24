package server.controller;

import Domain.GameMaster;
import Domain.PenteGame;
import Domain.Piece;
import Domain.Player;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
public class WebSocketController {
    private GameMaster gm;

    public WebSocketController( GameMaster gm ) {
        this.gm = gm;
    }

    @MessageMapping("/gameMaster/{id}")
    public List<Piece> placePiece(@DestinationVariable("id") String id, @Payload Piece piece) {
        PenteGame game = gm.penteGames.get(id);
        Player p1 = game.getP1();
        Player p2 = game.getP2();
        Player p;
        int color;
        if(p1.getColor() == piece.getColorInt())
            p = p1;
        else
            p =p2;
        game.move(piece.getX(), piece.getY(), p.getName() );

        List<Piece> pieces = new ArrayList<>();
        if( game != null ) {
            int[][] positions = game.getBoard().getPositions();
            for(int x = 0; x < positions.length; x++){
                for(int y = 0; y < positions[x].length; y++){
                    if(positions[x][y] != 0){
                        pieces.add(new Piece(x, y, positions[x][y]));
                    }
                }
            }

            for (Piece pc : pieces ) {
                int x = piece.getX();
                int y = piece.getY();
                if(positions[x][y] == 0)
                    pieces.remove(pc);
            }

            System.out.println(pieces);


//            for(int x = 0; x < positions.length; x++) {
//                for (int y = 0; y < positions[x].length; y++) {
//                    if (positions[x][y] == 0) {
//                        System.out.println("x: " + x + " y:" + y);
//                        int finalX = x;
//                        int finalY = y;
//                        pieces.removeIf(piece -> (piece.getX() == finalX && piece.getY() == finalY));
//                    }
//                }
//            }
            return pieces;
        }
        return null;
    }

    @SubscribeMapping("/gameMaster/{id}")
    public List<Piece> subscribe(@DestinationVariable("id") int id) {
        List<Piece> pieces = new ArrayList<>();
        PenteGame game = GameMasterController.getGm().penteGames.get(id);
        if( game != null ) {
            int[][] positions = game.getBoard().getPositions();
            for(int x = 0; x < positions.length; x++){
                for(int y = 0; y < positions[x].length; y++){
                    if(positions[x][y] != 0){
                        pieces.add(new Piece(x, y, positions[x][y]));
                    }
                }
            }

            for (Piece piece : pieces ) {
                int x = piece.getX();
                int y = piece.getY();
                if(positions[x][y] == 0)
                    pieces.remove(piece);
            }

            System.out.println(pieces);


//            for(int x = 0; x < positions.length; x++) {
//                for (int y = 0; y < positions[x].length; y++) {
//                    if (positions[x][y] == 0) {
//                        System.out.println("x: " + x + " y:" + y);
//                        int finalX = x;
//                        int finalY = y;
//                        pieces.removeIf(piece -> (piece.getX() == finalX && piece.getY() == finalY));
//                    }
//                }
//            }
            return pieces;
        }
        return null;
    }
}
