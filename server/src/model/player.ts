export interface IPlayer {
  id?: string;
  account_id: string;
  name: string;
  current_score_id: string;
  current_room_id: string;
  current_socket_id: string;
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
  current_room_id: "",
  current_socket_id: "",
  game_sessions_ids: [],
});

export const playerToDto = (id: string, player: IPlayer): IPlayerDto => ({
  id: id,
  name: player.name,
});
