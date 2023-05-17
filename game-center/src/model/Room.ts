import Game from "./Game"
import User from "./User"
import Status from "./Status"

class Room {
    roomID = ''
    game = new Game()
    users = [new User()]
    currentTurn = ''
    status = Status.WAITING
}

export default Room