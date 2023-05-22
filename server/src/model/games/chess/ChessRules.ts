class ChessRules {
    private username: string
    private timer: string

    constructor(username: string, timer: string) {
        this.username = username
        this.timer = timer
    }

    public setUsername(username: string) {
        this.username = username
    }
    public setTimer(timer: string) {
        this.timer = timer
    }

    public getUsername(): string {
        return this.username
    }
    public getTimer(): string {
        return this.timer
    }
}

export default ChessRules