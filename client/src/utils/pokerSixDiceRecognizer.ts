//author: JakubiM

const funkcja = (dice: number[]) => {
  // use hash map reduce
};

const chance = (dice: number[]) => {
  return dice.reduce((acc, value) => acc + value, 0);
};

const schoolField = (dice: number[], schoolValue: number) => {
  return dice.filter((value) => value == schoolValue).length * schoolValue;
};

const pair = (dice: number[]) => {
  return;
};

const functionsMap = new Map<string, CalculationFunction>([
  ["ones", (dice: number[]) => schoolField(dice, 1)],
  ["chance", chance],
]);

export type CalculationFunction = (dice: number[]) => number;

export const getCalculationFunction = (name: string) => {
  return functionsMap.has(name)
    ? functionsMap.get(name)
    : (dice: number[]) => 0;
};
