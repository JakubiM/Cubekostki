export interface IDieState {
  value: number;
  selected: boolean;
}

export const createEmptyHand = (): IDieState[] => [
  {
    value: 0,
    selected: false,
  },
  {
    value: 0,
    selected: false,
  },
  {
    value: 0,
    selected: false,
  },
  {
    value: 0,
    selected: false,
  },
  {
    value: 0,
    selected: false,
  },
  {
    value: 0,
    selected: false,
  },
]