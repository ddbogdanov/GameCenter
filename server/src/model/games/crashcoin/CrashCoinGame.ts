import Game from "../Game"
import socketio from 'socket.io'
import CoinBet from "./CoinBet"
import User from "../../User"

class CrashCoinGame extends Game {

    private targetMultiplier: number
    private currentMultiplier: string
    private nextGameInMs: number
    private acceptingBets: boolean
    private canCashOut: boolean
    private bets: Map<String, CoinBet>

    constructor(targetMultiplier: number) {
        super('CrashCoin', 1, 100)
        this.targetMultiplier = targetMultiplier
        this.currentMultiplier = '1.00'
        this.nextGameInMs = 0
        this.acceptingBets = false
        this.canCashOut = false
        this.bets = new Map()
    }

    public getTargetMultiplier(): number {
        return this.targetMultiplier
    }

    public startGame(io: socketio.Server, roomID: string) {
        this.game(io, roomID)
    }

    private async game(io: socketio.Server, roomID: string) {
        this.acceptingBets = false
        io.to(roomID).emit('gameStart')

        this.targetMultiplier = this.weightedRandom(1, 100)
        let emits = 0
        let timeElapsedMs = 0
        let timing = this.getMultiplierEmitsTiming(emits)

        this.canCashOut = true
        for(let multiplier = 1; multiplier <= this.targetMultiplier; multiplier += 0.01) {
            this.currentMultiplier = multiplier.toFixed(2)
            io.to(roomID).emit('multiplierUpdate', { multiplier: multiplier.toFixed(2), time: timeElapsedMs })
            ++emits
            timing = this.getMultiplierEmitsTiming(emits)
            timeElapsedMs += timing
            await this.sleep(timing)
        }
        this.canCashOut = false

        io.to(roomID).emit('gameEnd', { multiplier: this.targetMultiplier.toFixed(2), time: timeElapsedMs })

        this.bets.clear()
        this.acceptingBets = true
        this.nextGameInMs = 10000
        io.to(roomID).emit('nextGameIn', this.nextGameInMs)
        while(this.nextGameInMs != 0) {
            await this.sleep(1000)
            this.nextGameInMs -= 1000
            io.to(roomID).emit('nextGameIn', this.nextGameInMs)
        }

        this.game(io, roomID)
    }

    public placeBet(bet: CoinBet, io: socketio.Server): boolean {
        if(!this.acceptingBets) {
            return false
        }

        this.bets.set(bet.getUser().getUserID(), bet)
        io.to(bet.getRoomID()).emit('newBet', bet)

        return true
    }
    public cashOut(user: User, roomID: string, io: socketio.Server): boolean {
        if(!this.canCashOut) {
            return false
        }
        
        let bet = this.bets.get(user.getUserID())
        if(!bet) {
            return false
        }

        let profit = ((bet.getWager() * parseFloat(this.currentMultiplier)) - bet.getWager())
        bet.setProfit(profit)
        bet.setCashedOutAt(parseFloat(this.currentMultiplier))
        io.to(roomID).emit('recieveCashout', bet)

        return true
    }
    private sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    private getMultiplierEmitsTiming(emits: number): number {
        if(emits < 20) {
            return 100
        }
        else if(emits < 40) {
            return 95
        }
        else if(emits < 80) {
            return 90
        }
        else if(emits < 100) {
            return 85
        }
        else if(emits < 150) {
            return 75
        }
        else if(emits < 200) {
            return 60
        }
        else if(emits < 300) {
            return 40
        }
        else {
            return 20
        }
    }
    private weightedRandom(min: number, max: number): number {
        return Math.round((max / (Math.random() * max + min)) * 100) / 100;
    }
}

export default CrashCoinGame