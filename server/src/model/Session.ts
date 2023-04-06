import User from "./User"
import crypto from 'crypto'

class Session {
    private user: User
    private sessionID: any

    constructor(user: User) {   
        this.user = user
        this.sessionID = this.randomID()
    }

    setUser(user: User) {
        return this.user
    }
    setSessionID(sessionID: any) {
        this.sessionID = sessionID
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

    private randomID(): string {
        return crypto.randomBytes(8).toString("hex")
    }
}

export default Session