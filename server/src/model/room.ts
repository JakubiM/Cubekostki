import { PokerScore } from './../../../client/src/model/pokerScore';
import { Player } from "./player";


export class ThrowCounter
{
  public static MAX_THROW_NUMBER : number = 3;
  private players : Player[];
  public currentTour: Player;
  public currentThrow: number;
  private tourCounter: number = 2;

  constructor(players : Player[]){
    this.players = players;
    this.currentTour = this.nextPlayer();
    this.currentThrow = 0;
  };

  nextPlayer = () => {
    this.tourCounter++;
    return this.players[this.tourCounter % this.players.length]

  }
};

export type Room = {
  id: string;
  players: {playerId: string, score: PokerScore}[];
  game?: undefined;
};
