package Domain;

public class Player {
    String name;
    int color;
    int captures;
    boolean win;
    int prevX;
    int prevY;

    public Player(String name, int color){
        this.name=name;
        this.color=color;
        this.captures=0;
        this.win = false;
        this.prevX = -1;
        this.prevY = -1;
    }

    public int getPrevX() { return prevX; }

    public void setPrevX(int x) { this.prevX = x;}

    public int getPrevY() { return prevY; }

    public void setPrevY(int y) { this.prevY = y;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getColor() {
        return color;
    }

    public void setColor(int color) {
        this.color = color;
    }

    public int getCaptures() {
        return captures;
    }

    public void setCaptures(int captures) {
        this.captures = captures;
    }

    public void setWin() { this.win = true; }

    public boolean getWin() { return win; }
}
