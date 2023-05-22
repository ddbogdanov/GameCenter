import ChessRules from "./ChessRules"
import Game from "../Game"

class ChessGame extends Game {

    private white: ChessRules
    private black: ChessRules

    constructor(whiteChessRules?: ChessRules, blackChessRules?: ChessRules) {
        super('Chess', 2, 2)
        this.white = whiteChessRules ?? new ChessRules('', '00:00:00')
        this.black = blackChessRules ?? new ChessRules('', '00:00:00')
    }

    public setWhite(white: ChessRules) {
        this.white = white
    }
    public setBlack(black: ChessRules) {
        this.black = black
    }

    public getWhite(): ChessRules {
        return this.white
    }
    public getBlack(): ChessRules {
        return this.black
    }
}

export default ChessGame