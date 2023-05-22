class Game {
    public static CHECKERS = new Game('Checkers', 2, 2)
    public static BLACKJACK = new Game('Blackjack', 1, 4)

    private name: string
    private minimumUsers: number
    private maximumUsers: number

    protected constructor(name: string, 
                        minimumUsers: number, 
                        maximumUsers: number) {
        this.name = name
        this.minimumUsers = minimumUsers
        this.maximumUsers = maximumUsers
    }

    public getName(): string {
        return this.name
    }
    public getMinimumUsers(): number {
        return this.minimumUsers
    }
    public getMaximumUsers(): number {
        return this.maximumUsers
    }
}

export default Game