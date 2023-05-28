import { dotenv } from './dependencies.js';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, onSnapshot, doc } from "firebase/firestore";

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  };

  const firebaseApp = initializeApp(firebaseConfig);

  class FirestoreDB{
    static instance;
    static collections = {};

    constructor(firebaseAppInstance){
        if (FirestoreDB.instance) {
            return FirestoreDB.instance;
        }

        this.database = getFirestore(firebaseAppInstance);
        FirestoreDB.collections = {
            'Leads': collection(this.database, 'Leads')
        };
        FirestoreDB.instance = this;
    }

    getCollection = async(collectionName) =>{
        const snapshot = await getDocs(FirestoreDB.collections[collectionName]);
        const list = snapshot.docs.map(doc => doc.data());
        return list;
    }

    addNewDocumentTo = async (newDocument, collection) =>{
        try {
            const document = newDocument;
            const docRef = await addDoc(FirestoreDB.collections[collection], document);
            console.log(docRef.id);
        } catch (error) {
            console.error(error);
        }
    }

    updateRealTime = (collection, doSomething) =>{
        const c = FirestoreDB.collections[collection];
        onSnapshot(c, doSomething);
    }
  }

  const firestoreDB = new FirestoreDB(firebaseApp);

  export default firestoreDB;