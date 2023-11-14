// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDoc, doc, getFirestore} from "firebase/firestore";
import { collection, getDocs, setDoc } from "firebase/firestore"; 
import { BookEntry } from "./BookEntry";

const firebaseConfig = {
  apiKey: "AIzaSyCgto0p4sk5aiXJvZM9CpuSmfYdzmhQiWY",

  authDomain: "film-studies-archive.firebaseapp.com",

  projectId: "film-studies-archive",

  storageBucket: "film-studies-archive.appspot.com",

  messagingSenderId: "898901878127",

  appId: "1:898901878127:web:90feb9626f4b705614b49a",

  measurementId: "G-KSL7B1NMM0"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const routeToBookEntryCollection: string = "entries"

// Entry Functions
const entriesCol = collection(db, routeToBookEntryCollection);

export async function getEntries() {
  const entrySnapshots = await getDocs(entriesCol);
  if(entrySnapshots){
    const entryList = entrySnapshots.docs.map(doc => {
      let bookEntry:BookEntry = JSON.parse(JSON.stringify(doc.data()))
      return bookEntry;
    });
    console.log()
    console.log(entryList);
    return entryList;

  }else{
    console.log("No such document!");
  }
}

export async function getEntry(id:string){
  const docRef = doc(db, routeToBookEntryCollection, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log('')
    let bookEntry:BookEntry = JSON.parse(JSON.stringify(docSnap.data()))
    return bookEntry;
  } else {
    console.log("No such document!");
  }
}

export async function addEntryJSON(data:any, id:string){
  await setDoc(doc(db, routeToBookEntryCollection, id), data);
}