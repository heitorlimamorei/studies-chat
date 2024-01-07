import { db } from '@/firebase/config';
import IUserProps, { InewUserProps } from '@/types/user';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { hashPassword } from '@/utils/passwordServices';
import { normalizeFirebaseRespItems } from '@/utils/dataServices';

export async function createUser({ name, email, password }: InewUserProps): Promise<void> {
  const usersRef = collection(db, 'users');
  const { hashedPassword, salt } = await hashPassword(password);
  const docRef = await addDoc(usersRef, {
    name,
    email,
    password: hashedPassword,
    rooms: [],
    userSalt: salt,
  });
}

export async function getUserByEmail(email: string) {
  const usersRef = collection(db, 'users');
  const userQuery = query(usersRef, where('email', '==', email));

  const usersResp: any = await getDocs(userQuery);

  if (usersResp.empty) throw new Error('User not found');

  const users = [...normalizeFirebaseRespItems(usersResp)];
  let user: IUserProps = users[0];
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    rooms: user.rooms,
  };
}

export async function getUser(id: string): Promise<IUserProps> {
  // that methot alson return the userSalt.
  const okrRef = doc(db, `users/${id}`);
  const docRef: any = await getDoc(okrRef);

  if (!docRef.exists()) throw new Error('User not found');

  return { id: docRef.id, ...docRef.data() };
}

export async function addRoomToUser(id: string, roomId: string): Promise<void> {
  const userRef = doc(db, `users/${id}`);
  await updateDoc(userRef, {
    rooms: arrayUnion(roomId),
  });
}

export async function removeRoomFromUser(id: string, roomId: string): Promise<void> {
  const userRef = doc(db, `users/${id}`);
  await updateDoc(userRef, {
    rooms: arrayRemove(roomId),
  });
}

export default async function deleteUser(id: string): Promise<void> {
  const userRef = doc(db, `users/${id}`);
  await deleteDoc(userRef);
}