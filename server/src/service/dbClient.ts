import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from './../../firebase-config';
import { Room } from '../model/room';

export const Collection = {
    ROOMS: "rooms"
}

export const DBClient = {
    addRoom: async () => {
        await addDoc(collection(FIREBASE_DB, Collection.ROOMS), <Room>{
            players: []
        }).then(doc => console.log(`Added new room with id=${doc.id}`))
        .catch(err => console.error(err))
    },
    getRoom: async (id: string): Promise<Room> => {
        const document = await getDoc(doc(FIREBASE_DB, Collection.ROOMS, id))
        return {
            id: document.id,
            ...document.data()
        } as Room
    },
    getRooms: async (): Promise<Room[]> => {
        const rooms = await getAllDocuments(Collection.ROOMS);
        console.log("rooms: ", rooms);
        return rooms;
    },
    updateRoom: async (room: Room) => {
        await setDoc(doc(collection(FIREBASE_DB, Collection.ROOMS), room.id), room)
    }
}

const getAllDocuments = async (collectionName: string): Promise<any[]> => {
    const docs = (await getDocs(collection(FIREBASE_DB, collectionName))).docs;
    return docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }