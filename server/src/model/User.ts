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

    public setUsername(username: string) {
        this.username = username
    }
    public setUserID(userID: string) {
        this.userID = userID
    }
    public setCoins(coins: number) {
        this.coins = coins
    }
    public setAvatarID(avatarID: string) {
        this.avatarID = avatarID
    }

    public getUser(): this {
        return this
    }
    public getUsername(): string {
        return this.username
    }
    public getUserID(): string {
        return this.userID
    }
    public getCoins(): number {
        return this.coins
    }
    public getAvatarID(): string {
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