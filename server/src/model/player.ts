export interface IPlayer {
  account_id: string;
  name: string;
  current_score_id: string;
  game_sessions_ids: string[];
}

export interface IPlayerDto {
  id: string;
  name: string;
}

export const buildNewPlayer = (accountId: string, name: string): IPlayer => ({
  account_id: accountId,
  name,
  current_score_id: "",
  game_sessions_ids: [],
});

export const playerToDto = (id: string, player: IPlayer): IPlayerDto => ({
  id: id,
  name: player.name,
});
