import { IPokerScore, ISchool } from "./../../../client/src/model/pokerScore";
// {
//     school: ISchool = {
//       ones: undefined,
//       deuces: undefined,
//       three: undefined,
//       four: undefined,
//       five: undefined,
//       six: undefined,
//       sum: undefined,
//       bonus: undefined,
//     };
//     pair = undefined;
//     twoPairs = undefined;
//     threeOfKind = undefined;
//     fourOfKind = undefined;
//     fiveOfKind = undefined ;
//     poker = undefined;
//     fullHouse = undefined;
//     fourPlusTwo = undefined;
//     threePlusThree = undefined;
//     threePairs = undefined;
//     smallStraight = undefined;
//     bigStraight = undefined;
//     chance = undefined;
//     nonZeroBonus = undefined;
//   }
export const ScoreMapper = {
  toPokerScore: (score: number[][]): IPokerScore => {
    const pokerScore: IPokerScore = {} as IPokerScore;
    score.forEach((col, colIndex) => {
      col.forEach((value) => {
        if (colIndex >= 0 && colIndex <= 6) {
          pokerScore.school[Object.keys(pokerScore.school)[colIndex]] = value;
        } else if (colIndex >= 7 && colIndex <= 20) {
          const fieldKey = Object.keys(pokerScore)[colIndex];
          pokerScore[fieldKey] = value;
        }
      });
    });
    console.log(`mapped pokerScore: ${pokerScore}`);
    return pokerScore;
  },
};
