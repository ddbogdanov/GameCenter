import User from "../../User"

class CrashCoinBet {
    private user: User
    private wager: number
    private payout: number
    private cashedOutAt: number
    private profit: number
    private roomID: string
    private sessionID: string
    private socketID: string

    public constructor(
        user: User, 
        wager: number, 
        roomID: string,
        sessionID: string, 
        socketID: string,
        cashout?: number, 
        cashedOutAt?: number, 
        profit?: number
    ) {
        this.user = user
        this.wager = wager
        this.roomID = roomID
        this.sessionID = sessionID
        this.socketID = socketID
        this.payout = cashout ?? -1
        this.cashedOutAt = cashedOutAt ?? 0
        this.profit = profit ?? 0
    }

    public setWager(wager: number) {
        this.wager = wager
    }
    public setPayout(cashout: number) {
        this.payout = cashout
    }
    public setCashedOutAt(multiplier: number) {
        this.cashedOutAt = multiplier
    }
    public setProfit(profit: number) {
        this.profit = profit
    }

    public getUser(): User {
        return this.user
    }
    public getWager(): number {
        return this.wager
    }
    public getRoomID(): string {
        return this.roomID
    }
    public getSessionID(): string {
        return this.sessionID
    }
    public getSocketID(): string {
        return this.socketID
    }
    public getPayout(): number {
        return this.payout
    }
    public getCashedOutAt(): number {
        return this.cashedOutAt
    }
    public getProfit(): number {
        return this.profit
    }
}

export default CrashCoinBet