import crypto from 'crypto'

class User {
    private username: string
    private userID: string
    private coins: number
    private avatarID: string
    private avatarBackgroundColor: string

    // payload: Partial<User> - if parsing JSON becomes a common occurance 
    constructor(username: string, 
                userID?: string, 
                coins?: number, 
                avatarID?: string, 
                avatarBackgroundColor?: string) {
                    
        this.username = username
        this.userID = userID ?? this.generateRandomID()
        this.coins = coins ?? 100
        this.avatarID = avatarID ?? this.generateRandomAvatarID()
        this.avatarBackgroundColor = avatarBackgroundColor ?? '62c5d6'
    }

    public setUsername(username: string) {
        this.username = username
        return this
    }
    public setUserID(userID: string) {
        this.userID = userID
        return this
    }
    public setCoins(coins: number) {
        this.coins = coins
        return this
    }
    public setAvatarID(avatarID: string) {
        this.avatarID = avatarID
        return this
    }
    public setAvatarBackgroundColor(avatarBackgroundColor: string) {
        this.avatarBackgroundColor = avatarBackgroundColor
        return this
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
    public getAvatarBackgroundColor(): string {
        return this.avatarBackgroundColor
    }

    private generateRandomID(): string {
        return crypto.randomBytes(8).toString("hex")
    }
    private generateRandomAvatarID(): string {
        return crypto.randomBytes(Math.floor(Math.random() * 32)).toString("hex")
    }
}

export default User