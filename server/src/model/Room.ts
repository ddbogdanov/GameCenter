import Game from "./Game"
import User from "./User"

class Room {
    private roomID: string
    private game: Game
    private users: Array<User>
    private currentTurn: string // Stores index of corresponding user who turn it is in above array

    constructor(game: Game, users: User[], currentTurn?: string) {
        this.roomID = ''
        this.game = game
        this.users = users
        this.currentTurn = currentTurn ?? users[0].getUserID()
    }

    public setRoomID(roomID: string) {
        this.roomID = roomID
    }
    public setUsers(users: Array<User>) {
        this.users = users
    }
    public setCurrentTurn(currentTurn: string) {
        this.currentTurn = currentTurn
    }

    public getRoomID(): string {
        return this.roomID
    }
    public getGame(): Game {
        return this.game
    }
    public getUsers(): Array<User> {
        return this.users
    }
    public getCurrentTurn(): string {
        return this.currentTurn
    }

    public addUser(user: User) {
        this.users.push(user)
    }
    public switchTurn(): string {
        let currentTurnIndex = this.users.findIndex((user) => {
            user.getUserID() == this.currentTurn
        })

        if(this.users.length == currentTurnIndex) {
            this.currentTurn = this.users[0].getUserID()
        }
        else {
            this.currentTurn = this.users[currentTurnIndex].getUserID()
        }

        return this.currentTurn
    }
}

export default Room