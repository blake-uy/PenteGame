package Domain;

public class Piece {

    private int x;
    private int y;
    private PieceColor pieceColor;


    public Piece(int x, int y, int color){
        this.x = x;
        this.y = y;

        if(color == 2)
            this.pieceColor = PieceColor.BLACK;
        else
            this.pieceColor = PieceColor.WHITE;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public PieceColor getColor() {
        return pieceColor;
    }

    public int getColorInt() {
        if (pieceColor.equals(PieceColor.BLACK))
            return 2;
        else return 1;

    }

    public void setColor(PieceColor pieceColor) {
        this.pieceColor = pieceColor;
    }

    @Override
    public String toString() {
        return "Piece{" +
                "x=" + x +
                ", y=" + y +
                ", pieceColor=" + pieceColor +
                '}';
    }
}
