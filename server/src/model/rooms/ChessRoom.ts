import Room from './Room'
import ChessGame from '../games/chess/ChessGame'
import User from '../User'
import Status from '../Status'

class ChessRoom extends Room {
    protected game: ChessGame
    private currentTurn: string

    constructor(game: ChessGame, users: User[], status?: Status, currentTurn?: string) {
        super(users, status)
        this.game = game
        this.currentTurn = currentTurn ?? users[0].getUsername()
    }

    public setGame(game: ChessGame) {
        this.game = game
    }
    public setCurrentTurn(currentTurn: string) {
        this.currentTurn = currentTurn
    }

    public getGame(): ChessGame {
        return this.game
    }
    public getCurrentTurn(): string {
        return this.currentTurn
    }

    public switchTurn(): string {
        let currentTurnIndex = this.users.findIndex((user) => {
            user.getUsername() == this.currentTurn
        })

        if(this.users.length == currentTurnIndex) {
            this.currentTurn = this.users[0].getUsername()
        }
        else {
            this.currentTurn = this.users[currentTurnIndex].getUsername()
        }

        return this.currentTurn
    }
}

export default ChessRoom