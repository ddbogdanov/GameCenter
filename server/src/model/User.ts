import crypto from 'crypto'

class User {
    private username: string
    private userID: string

    constructor(username: string) {
        this.username = username
        this.userID = this.randomID()
    }

    setUsername(username: string) {
        this.username = username
    }
    setUserID(userID: string) {
        this.userID = userID
    }

    getUser(): this {
        return this
    }
    getUsername(): string {
        return this.username
    }
    getUserID(): string {
        return this.userID
    }

    private randomID(): string {
        return crypto.randomBytes(8).toString("hex")
    }
}

export default User