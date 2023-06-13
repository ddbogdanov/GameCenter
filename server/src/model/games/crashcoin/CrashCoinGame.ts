import Game from "../Game"
import socketio from 'socket.io'

class CrashCoinGame extends Game {

    private targetMultiplier: number
    private nextGameInMs: number

    constructor(multiplier: number) {
        super('CrashCoin', 1, 100)
        this.targetMultiplier = multiplier
        this.nextGameInMs = 0
    }

    public getTargetMultiplier(): number {
        return this.targetMultiplier
    }

    public startGame(io: socketio.Server, roomID: string) {
        this.game(io, roomID)
    }

    private async game(io: socketio.Server, roomID: string) {
        io.to(roomID).emit('gameStart')

        this.targetMultiplier = this.weightedRandom(1, 100)
        let emits = 0
        let timeElapsedMs = 0
        let timing = this.getMultiplierEmitsTiming(emits)

        for(let multiplier = 1; multiplier <= this.targetMultiplier; multiplier += 0.01) {
            io.to(roomID).emit('multiplierUpdate', { multiplier: multiplier.toFixed(2), time: timeElapsedMs })
            ++emits
            timing = this.getMultiplierEmitsTiming(emits)
            timeElapsedMs += timing
            await this.sleep(timing)
        }

        io.to(roomID).emit('gameEnd', { multiplier: this.targetMultiplier.toFixed(2), time: timeElapsedMs })

        this.nextGameInMs = 8000
        io.to(roomID).emit('nextGameIn', this.nextGameInMs)
        while(this.nextGameInMs != 0) {
            await this.sleep(1000)
            this.nextGameInMs -= 1000
            io.to(roomID).emit('nextGameIn', this.nextGameInMs)
        }

        this.game(io, roomID)
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
        else {
            return 40
        }
    }

    private weightedRandom(min: number, max: number): number {
        return Math.round((max / (Math.random() * max + min)) * 100) / 100;
    }
}

export default CrashCoinGame