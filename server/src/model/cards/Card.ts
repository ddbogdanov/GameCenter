import CardSuit from "./CardSuit"
import CardValue from "./CardValue"

class Card {
    private suit: CardSuit
    private value: CardValue

    constructor(suit: CardSuit, value: CardValue) {
        this.suit = suit
        this.value = value
    }

    public setSuit(suit: CardSuit) {
        this.suit = suit
    }
    public setValue(value: CardValue) {
        this.value = value
    }

    public getSuit(): CardSuit {
        return this.suit
    }
    public getValue(): CardValue {
        return this.value
    }
}

export default Card