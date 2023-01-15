export interface Score {
    
}

export interface PokerScore extends Score {
    school: {
        ones: number,
        deuces: number,
        three: number,
        four: number,
        five: number,
        six: number
    },
    schoolBonus: number,
    pair: number,
    twoPairs: number,
    threeOfKind: number,
    fourOfKind: number,
    fiveOfKind: number,
    poker: number,
    fullHouse: number,
    fourPlusTwo: number,
    threePlusThree: number,
    threePairs: number,
    smallStraight: number,
    bigStraight: number,
    chance: number
    nonZeroBonus: number,
}