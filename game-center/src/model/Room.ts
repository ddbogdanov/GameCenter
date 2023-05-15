import Game from "./Game"
import User from "./User"

interface Room {
    
    roomID: string,
    game: Game,
    users: Array<User>
    currentTurn: string
    
}

export default Room