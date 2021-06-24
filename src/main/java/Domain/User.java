package Domain;

public class User {

    private String name;
    private String password;
    private int totalWins;
    private int totalLosses;

    public User(String name, String password)
    {
        this.name = name;
        this.password = password;
        this.totalWins = 0;
        this.totalLosses = 0;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() { return password; }

    public void setPassword(String password) {
        this.password = password;
    }

    public void updateTotalWins() { this.totalWins++; }

    public void updateTotalLosses() { this.totalLosses++; }

    public int getTotalWins() { return totalWins; }

    public int getTotalLosses() { return totalLosses; }

    public double calculateWinRate() { return totalWins / (totalLosses + totalWins); }

    public void setTotalWins(int totalWins) {
        this.totalWins = totalWins;
    }

    public void setTotalLosses(int totalLosses) {
        this.totalLosses = totalLosses;
    }
}
