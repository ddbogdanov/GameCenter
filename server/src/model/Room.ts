import Game from "./Game"
import User from "./User"
import Status from "./Status"

class Room {
    private roomID: string
    private game: Game
    private users: Array<User>
    private currentTurn: string // Stores username of corresponding user who turn it is in above array
    private status: Status

    constructor(game: Game, users: User[], currentTurn?: string, status?: Status) {
        this.roomID = ''
        this.game = game
        this.users = users
        this.currentTurn = currentTurn ?? users[0].getUsername()
        this.status = status ?? Status.WAITING
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
    public setStatus(status: Status) {
        this.status = status
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
    public getStatus(): Status {
        return this.status
    }

    public addUser(user: User) {
        this.users.push(user)
    }
    public isUserInRoom(userID: string): boolean {
        if(this.users.find(user => user.getUserID() === userID)) {
            return true
        }
        return false
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

export default Room