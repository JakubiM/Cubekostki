import { PokerScore } from "./../model/pokerScore";
//author: JakubiM

const REQ_TO_PASS = 4;
const COUNT_OF_DICE = 6;
const PENALTY_FOR_FAIL = -50;
const BONUS_FOR_POKER = 50;
const BONUS_FOR_NON_ZERO = 100;
const PENALTY_FOR_ZERO = -50;

const chance = (diceReps: number[]) => {
  let sum = 0;
  for (let i = 0; i < COUNT_OF_DICE; i++) {
    sum += diceReps[i] * (i + 1);
  }
  return sum;
};

const schoolField = (diceReps: number[], schoolValue: number, sum: number = 0) => {
  const countOfDice = diceReps[schoolValue - 1];
  if (countOfDice >= REQ_TO_PASS) {
    return -(REQ_TO_PASS * schoolValue) + countOfDice * schoolValue;
  }
  if ((REQ_TO_PASS - countOfDice) * schoolValue <= sum) {
    return -(REQ_TO_PASS - countOfDice) * schoolValue;
  }
  return PENALTY_FOR_FAIL - (REQ_TO_PASS - countOfDice) * schoolValue;
};

const getIndexFromXOfKindResult = (result: number, xOfKind: number): number => {
  return result / xOfKind - 1;
};

const xOfKind = (diceReps: number[], ofKind: number, indexToExclude = -1) => {
  for (let i = diceReps.length - 1; i >= 0; i--) {
    if (i == indexToExclude) {
      continue;
    }
    if (diceReps[i] >= ofKind) {
      return ofKind * (i + 1);
    }
  }
  return 0;
};

const twoPairs = (diceReps: number[]) => {
  var firstPair = xOfKind(diceReps, 2);
  var secondPair = xOfKind(diceReps, 2, getIndexFromXOfKindResult(firstPair, 2));
  var fourOfKind = xOfKind(diceReps, 4);

  if (Math.min(firstPair, secondPair) == 0) {
    return fourOfKind;
  }
  return Math.max(firstPair + secondPair, fourOfKind);
};

const poker = (diceReps: number[]) => {
  for (let i = diceReps.length - 1; i >= 0; i--) {
    if (diceReps[i] == 6) {
      return 6 * (i + 1) + BONUS_FOR_POKER;
    }
  }
  return 0;
};

const fullHouse = (diceReps: number[]) => {
  var fiveOfKind = xOfKind(diceReps, 5);
  var threeOfKind = xOfKind(diceReps, 3);
  var pair = xOfKind(diceReps, 2, getIndexFromXOfKindResult(threeOfKind, 3));
  if (Math.min(threeOfKind, pair) == 0) {
    return fiveOfKind;
  }
  return Math.max(threeOfKind + pair, fiveOfKind);
};

const fourPlusTwo = (diceReps: number[]) => {
  var sixOfKind = xOfKind(diceReps, 6);
  var fourOfKind = xOfKind(diceReps, 4);
  var pair = xOfKind(diceReps, 2, getIndexFromXOfKindResult(fourOfKind, 4));
  if (Math.min(fourOfKind, pair) == 0) {
    return sixOfKind;
  }
  return Math.max(fourOfKind + pair, sixOfKind);
};

const threePlusThree = (diceReps: number[]) => {
  var sixOfKind = xOfKind(diceReps, 6);
  var firsThreeOfKind = xOfKind(diceReps, 3);
  var secondThreeOfKind = xOfKind(diceReps, 3, getIndexFromXOfKindResult(firsThreeOfKind, 3));
  if (Math.min(firsThreeOfKind, secondThreeOfKind) == 0) {
    return sixOfKind;
  }
  return Math.max(firsThreeOfKind + secondThreeOfKind, sixOfKind);
};

const threePairs = (diceReps: number[]) => {
  var fourPlusTwoValue = fourPlusTwo(diceReps);
  if (fourPlusTwoValue != 0) {
    return fourPlusTwoValue;
  }
  var firstPair = xOfKind(diceReps, 2);
  var secondPair = xOfKind(diceReps, 2, getIndexFromXOfKindResult(firstPair, 2));
  var thirdPair = 0;
  for (let i = getIndexFromXOfKindResult(secondPair, 2) - 1; i >= 0; i--) {
    if (diceReps[i] > 1) {
      thirdPair = 2 * (i + 1);
      break;
    }
  }
  if (Math.min(firstPair, secondPair, thirdPair) == 0) {
    return 0;
  }
  return firstPair + secondPair + thirdPair;
};

const smallStraight = (diceReps: number[]) => {
  for (let i = 0; i < diceReps.length - 1; i++) {
    if (diceReps[i] < 1) {
      return 0;
    }
  }
  return 15;
};

const bigStraight = (diceReps: number[]) => {
  for (let i = 0; i < diceReps.length; i++) {
    if (diceReps[i] < 1) {
      return 0;
    }
  }
  return 21;
};

const schoolSum = (pokerScore: PokerScore) => {
  var sum = 0;
  for (let value of Object.values(pokerScore.school)) {
    sum += value === undefined ? 0 : value;
  }
  return sum > 0 ? sum : 0;
};

const schoolBonus = (pokerScore: PokerScore) => {
  return schoolSum(pokerScore) > 15 ? 100 : 0;
};

const nonZeroBonus = (pokerScore: PokerScore) => {
  const zerosCount: number = Object.values(pokerScore)
    .filter((value) => typeof value === "number")
    .filter((value) => value === 0).length;

  const bonus = BONUS_FOR_NON_ZERO + zerosCount * PENALTY_FOR_ZERO;

  return bonus < 0 ? 0 : bonus;
};

const bonusFunctionsMap = new Map<string, BonusCalculationFunction>([
  ["sum", (pokerScore: PokerScore) => schoolSum(pokerScore)],
  ["bonus", (pokerScore: PokerScore) => schoolBonus(pokerScore)],
  ["nonZeroBonus", (pokerScore: PokerScore) => nonZeroBonus(pokerScore)],
]);

const functionsMap = new Map<string, CalculationFunction>([
  ["ones", (diceReps: number[], sum?: number) => schoolField(diceReps, 1, sum)],
  ["deuces", (diceReps: number[], sum?: number) => schoolField(diceReps, 2, sum)],
  ["three", (diceReps: number[], sum?: number) => schoolField(diceReps, 3, sum)],
  ["four", (diceReps: number[], sum?: number) => schoolField(diceReps, 4, sum)],
  ["five", (diceReps: number[], sum?: number) => schoolField(diceReps, 5, sum)],
  ["six", (diceReps: number[], sum?: number) => schoolField(diceReps, 6, sum)],
  ["pair", (diceReps: number[]) => xOfKind(diceReps, 2)],
  ["twoPairs", (diceReps: number[]) => twoPairs(diceReps)],
  ["threeOfKind", (diceReps: number[]) => xOfKind(diceReps, 3)],
  ["fourOfKind", (diceReps: number[]) => xOfKind(diceReps, 4)],
  ["fiveOfKind", (diceReps: number[]) => xOfKind(diceReps, 5)],
  ["poker", (diceReps: number[]) => poker(diceReps)],
  ["fullHouse", (diceReps: number[]) => fullHouse(diceReps)],
  ["fourPlusTwo", (diceReps: number[]) => fourPlusTwo(diceReps)],
  ["threePlusThree", (diceReps: number[]) => threePlusThree(diceReps)],
  ["threePairs", (diceReps: number[]) => threePairs(diceReps)],
  ["smallStraight", (diceReps: number[]) => smallStraight(diceReps)],
  ["bigStraight", (diceReps: number[]) => bigStraight(diceReps)],
  ["chance", chance],
]);

export type CalculationFunction = (diceReps: number[], sum?: number) => number;
export type BonusCalculationFunction = (pokerScore: PokerScore) => number;

export const getCalculationFunction = (name: string): CalculationFunction => {
  return functionsMap.has(name) ? functionsMap.get(name) : (diceReps: number[]) => 0;
};

export const getBonusCalculationFunction = (name: string): BonusCalculationFunction => {
  return bonusFunctionsMap.has(name) ? bonusFunctionsMap.get(name) : (pokerScore: PokerScore) => 0;
};
