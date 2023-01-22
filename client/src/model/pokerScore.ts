export interface ISchool {
  ones: number;
  deuces: number;
  three: number;
  four: number;
  five: number;
  six: number;
  bonus: number;
}

export interface IPokerScore {
  school: ISchool;
  pair: number;
  twoPairs: number;
  threeOfKind: number;
  fourOfKind: number;
  fiveOfKind: number;
  poker: number;
  fullHouse: number;
  fourPlusTwo: number;
  threePlusThree: number;
  threePairs: number;
  smallStraight: number;
  bigStraight: number;
  chance: number;
  nonZeroBonus: number;
}

export class PokerScore implements IPokerScore {
  school: ISchool = {
    ones: 0,
    deuces: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    bonus: 0,
  };
  pair: number = 0;
  twoPairs: number = 0;
  threeOfKind: number = 0;
  fourOfKind: number = 0;
  fiveOfKind: number = 0;
  poker: number = 0;
  fullHouse: number = 0;
  fourPlusTwo: number = 0;
  threePlusThree: number = 0;
  threePairs: number = 0;
  smallStraight: number = 0;
  bigStraight: number = 0;
  chance: number = 0;
  nonZeroBonus: number = 0;
}
