class CardValue {
    private weight: number 
    private name: string

    constructor(weight: number, name: string) {
        this.weight = weight
        this.name = name

        //if is ace, then is low ace or high ace, and what are ace values for low and high
    }

    public setWeight(weight: number) {
        this.weight = weight
    }
    public setName(name: string) {
        this.name = name
    }

    public getWeight(): number {
        return this.weight
    }
    public getName(): string {
        return this.name
    }
}

export default CardValue