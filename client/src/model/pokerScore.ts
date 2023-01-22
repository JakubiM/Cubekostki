export interface ISchool {
  ones: number | undefined;
  deuces: number | undefined;
  three: number | undefined;
  four: number | undefined;
  five: number | undefined;
  six: number | undefined;
  bonus: number | undefined;
}

export interface IPokerScore {
  school: ISchool;
  pair: number | undefined;
  twoPairs: number | undefined;
  threeOfKind: number | undefined;
  fourOfKind: number | undefined;
  fiveOfKind: number | undefined;
  poker: number | undefined;
  fullHouse: number | undefined;
  fourPlusTwo: number | undefined;
  threePlusThree: number | undefined;
  threePairs: number | undefined;
  smallStraight: number | undefined;
  bigStraight: number | undefined;
  chance: number | undefined;
  nonZeroBonus: number | undefined;
}

export class PokerScore implements IPokerScore {
  school: ISchool = {
    ones: undefined,
    deuces: undefined,
    three: undefined,
    four: undefined,
    five: undefined,
    six: undefined,
    bonus: undefined,
  };
  pair = undefined;
  twoPairs = undefined;
  threeOfKind = undefined;
  fourOfKind = undefined;
  fiveOfKind = undefined;
  poker = undefined;
  fullHouse = undefined;
  fourPlusTwo = undefined;
  threePlusThree = undefined;
  threePairs = undefined;
  smallStraight = undefined;
  bigStraight = undefined;
  chance = undefined;
  nonZeroBonus = undefined;
}
