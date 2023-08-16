type CardValue = {
    readonly weight: number,
    readonly name: string,
}

// class CardValue {
//     public static readonly TWO = new CardValue(2, 'TWO')
//     public static readonly THREE = new CardValue(3, 'THREE')
//     public static readonly FOUR = new CardValue(4, 'FOUR')
//     public static readonly FIVE = new CardValue(5, 'FIVE')
//     public static readonly SIX = new CardValue(6, 'SIX')
//     public static readonly SEVEN = new CardValue(7, 'SEVEN')
//     public static readonly EIGHT = new CardValue(8, 'EIGHT')
//     public static readonly NINE = new CardValue(9, 'NINE')
//     public static readonly TEN = new CardValue(10, 'TEN')
//     public static readonly JACK = new CardValue(10, 'JACK')
//     public static readonly QUEEN = new CardValue(10, 'QUEEN')
//     public static readonly KING = new CardValue(10, 'KING')
//     public static readonly ACE_LOW = new CardValue(1, 'ACE')
//     public static readonly ACE_HIGH = new CardValue(11, 'ACE')

//     public readonly weight: number
//     public readonly name: string

//     private constructor(weight: number, name: string) {
//         this.weight = weight
//         this.name = name
//     }
// }

/*

    TODO: What if different games have different values assigned to different face cards?

    This object should accept a ruleset specfic to the game the Card object is being created for,
    where weights are assigned based on the game that is being played.

    Card might also need a trump flag for games that allow the use of trump cards.

    *************************************************************************
    ** Abstract this class, create new implementations for seperate games? **
    *************************************************************************
*/

export default CardValue