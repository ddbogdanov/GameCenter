import Game from "../games/Game"
import User from "../User"
import Status from "../Status"

abstract class Room {
    protected roomID: string
    protected users: Array<User>
    protected status: Status

    protected abstract game: Game

    constructor(users: User[], status?: Status) {
        this.roomID = ''
        this.users = users
        this.status = status ?? Status.WAITING
    }
 
    public setRoomID(roomID: string) {
        this.roomID = roomID
    }
    public setUsers(users: Array<User>) {
        this.users = users
    }
    // public setCurrentTurn(currentTurn: string) {
    //     this.currentTurn = currentTurn
    // }
    public setStatus(status: Status) {
        this.status = status
    }

    public getRoomID(): string {
        return this.roomID
    }
    public getUsers(): Array<User> {
        return this.users
    }
    // public getCurrentTurn(): string {
    //     return this.currentTurn
    // }
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
    // public switchTurn(): string {
    //     let currentTurnIndex = this.users.findIndex((user) => {
    //         user.getUsername() == this.currentTurn
    //     })

    //     if(this.users.length == currentTurnIndex) {
    //         this.currentTurn = this.users[0].getUsername()
    //     }
    //     else {
    //         this.currentTurn = this.users[currentTurnIndex].getUsername()
    //     }

    //     return this.currentTurn
    // }

    public abstract getGame(): Game
    public abstract setGame(game: Game): void
}

export default Room