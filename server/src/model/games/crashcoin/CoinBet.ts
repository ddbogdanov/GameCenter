import User from "../../User"

class CoinBet {
    private user: User
    private wager: number
    private cashout: number
    private cashedOutAt: number
    private profit: number
    private roomID: string

    public constructor(
        user: User, 
        wager: number, 
        roomID: string, 
        cashout?: number, 
        cashedOutAt?: number, 
        profit?: number
    ) {
        this.user = user
        this.wager = wager
        this.roomID = roomID
        this.cashout = cashout ?? -1
        this.cashedOutAt = cashedOutAt ?? 0
        this.profit = profit ?? 0
    }

    public setWager(wager: number) {
        this.wager = wager
    }
    public setCashout(cashout: number) {
        this.cashout = cashout
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
    public getCashout(): number {
        return this.cashout
    }
    public getCashedOutAt(): number {
        return this.cashedOutAt
    }
    public getProfit(): number {
        return this.profit
    }
}

export default CoinBet