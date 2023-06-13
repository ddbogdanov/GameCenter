import Status from "../Status";
import User from "../User";
import CrashCoinGame from "../games/crashcoin/CrashCoinGame";
import Room from "./Room";

class CrashCoinRoom extends Room {
    protected game: CrashCoinGame

    constructor(game: CrashCoinGame, users: User[], status?: Status) {
        super(users, status)
        this.game = game
        this.status = Status.PLAYING
    }

    public getGame(): CrashCoinGame {
        return this.game
    }
    public setGame(game: CrashCoinGame): void {
        this.game = game
    }
}

export default CrashCoinRoom