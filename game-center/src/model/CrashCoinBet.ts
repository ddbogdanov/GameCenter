import User from "./User";

class CrashCoinBet {
    user: User = new User()
    wager: number = 0
    cashout: number = 0
    cashedOutAt: number = 0
    profit: number = 0
    roomID: string = ''
}

export default CrashCoinBet