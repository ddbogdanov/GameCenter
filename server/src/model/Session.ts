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

    setUser(user: User) {
        return this.user
    }
    setSessionID(sessionID: string) {
        this.sessionID = sessionID
    }
    setConnected(connected: boolean) {
        this.connected = connected
    }

    getSession(): this {
        return this
    }
    getUser(): User {
        return this.user
    }
    getSessionID(): string {
        return this.sessionID
    }
    isConnected(): boolean {
        return this.connected
    }

    private randomID(): string {
        return crypto.randomBytes(8).toString("hex")
    }
}

export default Session