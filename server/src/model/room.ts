import { IPlayerDto } from "./player";

export interface IRoom {
  players_ids: string[];
  game_session_id: string;
  host_id: string;
}

export interface IRoomDto {
  id: string;
  host_id: string;
  players: IPlayerDto[];
}

export const buildEmptyRoom = (): IRoom => ({
  players_ids: [],
  game_session_id: "",
  host_id: "",
});

export const roomToDto = (id: string, room: IRoom): IRoomDto => {
  return {
    id: id,
    host_id: room.host_id,
    players: [],
  };
};
