import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBYLzYgji-O0s5VUo9DiMCp0VGe5r7rq_A',
  authDomain: 'usersingup-c4b97.firebaseapp.com',
  projectId: 'usersingup-c4b97',
  storageBucket: 'usersingup-c4b97.appspot.com',
  messagingSenderId: '750857441867',
  appId: '1:750857441867:web:58f8373bbe17739dbbf3ce',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;
