import CardSuit from "./CardSuit";
import CardValue from "./CardValue";

class Card {
    suit: CardSuit = CardSuit.SPADES
    value: CardValue = { name: 'Ace', weight: 10 } as CardValue
}

export default Card