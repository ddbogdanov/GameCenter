import User from "./User"
import crypto from 'crypto'

class Session {
    private user: User
    private sessionID: string 
    private connected: boolean

    constructor(user: User, connected: boolean) {   
        this.user = user
        this.sessionID = this.randomID()
        this.connected = connected
    }

    public setUser(user: User) {
        this.user = user
    }
    public setSessionID(sessionID: string) {
        this.sessionID = sessionID
    }
    public setConnected(connected: boolean) {
        this.connected = connected
    }

    public getSession(): this {
        return this
    }
    public getUser(): User {
        return this.user
    }
    public getSessionID(): string {
        return this.sessionID
    }
    public isConnected(): boolean {
        return this.connected
    }

    private randomID(): string { //TODO: Move this to SessionStore class so that sessionIDs can be checked for duplicates
        return crypto.randomBytes(8).toString("hex")
    }
}

export default Session