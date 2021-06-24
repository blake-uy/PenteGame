package Domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class ExampleTest {

    @Test
    public void PieceTest() {
        Piece p = new Piece(1,2,1);
        Assertions.assertEquals(1, p.getColorInt());
    }

}
