import crypto from 'crypto'

class User {
    private username: string
    private userID: string
    private coins: number
    private avatarID: string

    // payload: Partial<User> - if parsing JSON becomes a common occurance 
    constructor(username: string, userID?: string, coins?: number, avatarID?: string) {
        this.username = username
        this.userID = userID ?? this.generateRandomID()
        this.coins = coins ?? 100
        this.avatarID = avatarID ?? this.generateRandomAvatarID()
    }

    setUsername(username: string) {
        this.username = username
    }
    setUserID(userID: string) {
        this.userID = userID
    }
    setCoins(coins: number) {
        this.coins = coins
    }
    setAvatarID(avatarID: string) {
        this.avatarID = avatarID
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
    getCoins(): number {
        return this.coins
    }
    getAvatarID(): string {
        return this.avatarID
    }

    private generateRandomID(): string {
        return crypto.randomBytes(8).toString("hex")
    }
    private generateRandomAvatarID(): string {
        return crypto.randomBytes(Math.floor(Math.random() * 32)).toString("hex")
    }
}

export default User