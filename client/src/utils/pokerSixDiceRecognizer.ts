//author: JakubiM

const REQ_TO_PASS = 4;
const COUNT_OF_DICE = 6;
const PENALTY_FOR_FAIL = -50;

const chance = (diceReps: number[]) => {
  let sum = 0;
  for (let i = 0; i < COUNT_OF_DICE; i++) {
    sum += diceReps[i] * (i + 1);
  }
  return sum;
};

const schoolField = (
  diceReps: number[],
  schoolValue: number,
  bonus: number
) => {
  const countOfDice = diceReps[schoolValue - 1];

  if (countOfDice >= REQ_TO_PASS) {
    return -(REQ_TO_PASS * schoolValue) + countOfDice * schoolValue;
  }
  if ((REQ_TO_PASS - countOfDice) * schoolValue <= bonus) {
    return -(REQ_TO_PASS - countOfDice) * schoolValue;
  }
  return PENALTY_FOR_FAIL - (REQ_TO_PASS - countOfDice) * schoolValue;
};

const pair = (diceReps: number[]) => {
  for (let i = diceReps.length - 1; i >= 0; i--) {
    if (diceReps[i] > 1) {
      return (i + 1) * 2;
    }
  }
  return 0;
};

const twoPairs = (diceReps: number[]) => {
  for (let i = diceReps.length - 1; i >= 0; i--) {
    if (diceReps[i] > 1) {
      return (i + 1) * 2;
    }
  }
  return 0;
};

const functionsMap = new Map<string, CalculationFunction>([
  ["ones", (diceReps: number[]) => schoolField(diceReps, 1, 0)],
  ["deuces", (diceReps: number[]) => schoolField(diceReps, 2, 0)],
  ["three", (diceReps: number[]) => schoolField(diceReps, 3, 0)],
  ["four", (diceReps: number[]) => schoolField(diceReps, 4, 0)],
  ["five", (diceReps: number[]) => schoolField(diceReps, 5, 0)],
  ["six", (diceReps: number[]) => schoolField(diceReps, 6, 0)],
  ["pair", (diceReps: number[]) => pair(diceReps)],
  ["chance", chance],
]);

export type CalculationFunction = (diceReps: number[]) => number;

export const getCalculationFunction = (name: string): CalculationFunction => {
  return functionsMap.has(name)
    ? functionsMap.get(name)
    : (diceReps: number[]) => 0;
};
