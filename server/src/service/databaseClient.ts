import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebase-config";
import { IRoom, IRoomDto, buildEmptyRoom } from "../model/room";
import { IPlayerDto, buildNewPlayer } from "../model/player";
import { IActiveConnection } from "../model/activeConnection";

const Collection = {
  ROOMS: "rooms",
  GAME_SCORES: "game_scores",
  GAME_SESSIONS: "game_sessions",
  PLAYERS: "players",
  ACTIVE_CONNECTIONS: "active_connections",
};

const DatabaseClient = {
  Rooms: {
    createEmpty: async () => {
      await addDoc(collection(FIRESTORE_DB, Collection.ROOMS), buildEmptyRoom())
        .then((doc) => console.log(`Added new room with id=${doc.id}`))
        .catch((err) => console.error(`[DatabaseClient] Room create error: ${err.message}!`));
    },
    getById: async (id: string): Promise<IRoom> => {
      const roomDocument = await getDocumentById(Collection.ROOMS, id);
      return roomDocument.data();
    },
    getByIdForClient: async (id: string): Promise<IRoomDto> => {
      const roomDocument = await getDocumentById(Collection.ROOMS, id);
      const room: IRoom = roomDocument.data();
      const playerDocument: DocumentData[] = await getDocumentsByIds(Collection.PLAYERS, room.players_ids);
      const roomPlayersDto: IPlayerDto[] = playerDocument.map((doc) => ({ id: doc.id, name: doc.data().name }));
      return {
        id: roomDocument.id,
        host_id: room.host_id,
        players: roomPlayersDto,
      };
    },
    getAll: async (): Promise<IRoomDto[]> => {
      const roomDocuments: DocumentData[] = await getAllDocuments(Collection.ROOMS);
      return Promise.all(
        roomDocuments.map(async (roomDocument) => {
          const room: IRoom = await roomDocument.data();
          const playerDocument: DocumentData[] = await getDocumentsByIds(Collection.PLAYERS, room.players_ids);
          const roomPlayersDto: IPlayerDto[] = playerDocument.map((doc) => ({ id: doc.id, name: doc.data().name }));
          return {
            id: roomDocument.id,
            host_id: room.host_id,
            players: roomPlayersDto,
          };
        })
      );
    },
    update: async (room: IRoom, id: string) => {
      await setDoc(doc(collection(FIRESTORE_DB, Collection.ROOMS), id), room)
        .then(() => console.info(`[DatabaseClient] Room[${id}] updated!`))
        .catch((err) => console.error(`[DatabaseClient] Room[${id}] update error: ${err.message}!`));
    },
  },
  Players: {
    create: async (account_id: string, name: string): Promise<string> => {
      return (await addDoc(collection(FIRESTORE_DB, Collection.PLAYERS), buildNewPlayer(account_id, name))).id;
    },
    getAll: async (): Promise<IPlayerDto[]> => {
      return (await getAllDocuments(Collection.PLAYERS)).map((doc) => doc.data());
    },
    getByAccountId: async (account_id: string): Promise<IPlayerDto | null> => {
      const document = await getDocumentByFieldEquals(Collection.PLAYERS, "account_id", account_id);
      return document
        ? {
            id: document.id,
            name: document.data().name,
          }
        : null;
    },
  },
  ActiveConnections: {
    create: async (socket_id: string, account_id: string): Promise<string> => {
      return (
        await addDoc(collection(FIRESTORE_DB, Collection.ACTIVE_CONNECTIONS), {
          socket_id: socket_id,
          account_id: account_id,
        } as IActiveConnection)
      ).id;
    },
    getBySocketId: async (socket_id: string): Promise<IActiveConnection> => {
      const document = await getDocumentByFieldEquals(Collection.ACTIVE_CONNECTIONS, "socket_id", socket_id);
      return document
        ? {
            id: document.id,
            ...document.data(),
          }
        : null;
    },
    deleteBySocketId: async (socket_id: string) =>
      deleteDocumentByFieldEquals(Collection.ACTIVE_CONNECTIONS, "socket_id", socket_id),
    deleteAll: async () => {
      const collectionRef = collection(FIRESTORE_DB, Collection.ACTIVE_CONNECTIONS);
      (await getDocs(collectionRef)).forEach((doc) => deleteDoc(doc.ref));
    },
  },
};

const getAllDocuments = async (collectionName: string): Promise<DocumentData[]> => {
  return (await getDocs(collection(FIRESTORE_DB, collectionName))).docs;
};

const getDocumentById = async <T>(collectionName: string, id: string): Promise<DocumentData> => {
  const document = await getDoc(doc(FIRESTORE_DB, collectionName, id));
  return document;
};

const getDocumentsByIds = async (collectionName: string, ids: string[]): Promise<DocumentData[]> => {
  return ids.map(async (id) => await getDocumentById(collectionName, id));
};

const getDocumentByFieldEquals = async (
  collectionName: string,
  fieldName: string,
  fieldValue: string
): Promise<DocumentData | null> => {
  const q = query(collection(FIRESTORE_DB, collectionName), where(fieldName, "==", fieldValue));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty ? querySnapshot.docs[0] : null;
};

const deleteDocumentByFieldEquals = async (collectionName: string, fieldName: string, fieldValue: string) => {
  const q = query(collection(FIRESTORE_DB, collectionName), where(fieldName, "==", fieldValue));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.warn(
      `Could no find document in [collectionName: ${collectionName}] by [${fieldName}==${fieldValue}] for delete...`
    );
  } else {
    deleteDoc(querySnapshot.docs[0].ref);
  }
};

export default DatabaseClient;
