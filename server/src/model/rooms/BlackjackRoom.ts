import BlackjackGame from "../games/blackjack/BlackjackGame";
import Status from "../Status";
import User from "../User";
import Room from "./Room";

class BlackjackRoom extends Room {
    protected game: BlackjackGame
    private currentTurn: string // Username of player whos turn it currently is

    constructor(game: BlackjackGame, users: User[], status?: Status, currentTurn?: string) {
        super(users, status)
        this.game = game
        this.currentTurn = currentTurn ?? users[0].getUsername()
    }

    public setGame(game: BlackjackGame) {
        this.game = game
    }
    public setCurrentTurn(currentTurn: string) {
        this.currentTurn = currentTurn
    }

    public getGame(): BlackjackGame {
        return this.game
    }
    public getCurrentTurn(): string {
        return this.currentTurn
    }
 }

export default BlackjackRoom