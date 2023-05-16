import Game from "./Game"
import User from "./User"

class Room {
    roomID = ''
    game = new Game()
    users = [new User()]
    currentTurn = ''
}

export default Room