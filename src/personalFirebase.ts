function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  getDoc,
  doc,
  getFirestore,
  query,
  where,
  and,
} from "firebase/firestore";
import { collection, getDocs, setDoc } from "firebase/firestore";
import { BookEntry } from "./BookEntry";

const firebaseConfig = {
  apiKey: "AIzaSyCgto0p4sk5aiXJvZM9CpuSmfYdzmhQiWY",

  authDomain: "film-studies-archive.firebaseapp.com",

  projectId: "film-studies-archive",

  storageBucket: "film-studies-archive.appspot.com",

  messagingSenderId: "898901878127",

  appId: "1:898901878127:web:90feb9626f4b705614b49a",

  measurementId: "G-KSL7B1NMM0",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const routeToBookEntryCollection: string = "entries";

// Entry Functions
const entriesCol = collection(db, routeToBookEntryCollection);

export async function getEntries() {
  const entrySnapshots = await getDocs(entriesCol);
  if (entrySnapshots) {
    const entryList = entrySnapshots.docs.map((doc) => {
      let bookEntry: BookEntry = JSON.parse(JSON.stringify(doc.data()));
      return bookEntry;
    });

    return entryList;
  } else {
    console.log("No such document!");
  }
}

export async function getEntry(id: string) {
  const docRef = doc(db, routeToBookEntryCollection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let bookEntry: BookEntry = JSON.parse(JSON.stringify(docSnap.data()));
    return bookEntry;
  } else {
    console.log("No such document!");
  }
}

export async function addEntryJSON(data: any, id: string) {
  await setDoc(doc(db, routeToBookEntryCollection, id), data);
}
export async function addBookEntry(data: BookEntry, id: string) {
  await setDoc(doc(db, routeToBookEntryCollection, id), data.toJSONBE());
}
//Need To fix
export async function queryEntries(
  entryNumber,
  author,
  title,
  publication,
  pageCount,
  ISBN,
  seriesTitle,
  note,
  resource,
  languageCode
) {
  const q = query(
    entriesCol,
    where("titleKeyWords", "array-contains", title) /*
    where("authorKeyWords", "array-contains", author )),
    where("entryNumber", ">=", entryNumber),
    where("entryNumber", "<=", entryNumber + "\uf8ff")),
    where("author", ">=", author),
    where("author", "<=", author + "\uf8ff"),
    where("publication", ">=", publication),
    where("publication", "<=", publication + "\uf8ff"),
    where("ISBN", ">=", ISBN),
    where("ISBN", "<=", ISBN + "\uf8ff"),
    where("seriesTitle", ">=", seriesTitle),
    where("seriesTitle", "<=", seriesTitle+ "\uf8ff"),
    where("note", ">=", note),
    where("note", "<=", note+ "\uf8ff"),
    where("resource", ">=", resource),
    where("resource", "<=", resource+ "\uf8ff"),
    where("languageCode", ">=", languageCode),
    where("languageCode", "<=", languageCode+ "\uf8ff"),
    where("pageCount", ">=", languageCode),
    where("pageCount", "<=", languageCode+ "\uf8ff")),*/
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot) {
    const entryList = querySnapshot.docs.map((doc) => {
      let bookEntry: BookEntry = JSON.parse(JSON.stringify(doc.data()));
      return bookEntry;
    });

    return entryList;
  } else {
    console.log("No such document!");
  }
  return q;
}
export async function queryEntriesByKeywords(keyword: String) {
  const q = query(
    entriesCol,
    where("keyWords", "array-contains-any", [
      keyword,
      keyword.toLowerCase(),
      keyword.toUpperCase(),
      capitalizeFirstLetter(keyword.toLowerCase()),
    ])
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot) {
    const entryList = querySnapshot.docs.map((doc) => {
      let bookEntry: BookEntry = JSON.parse(JSON.stringify(doc.data()));
      return bookEntry;
    });

    return entryList;
  } else {
    console.log("No such document!");
  }
  return q;
}
export async function queryEntriesByTitle(title) {
  const q = query(
    entriesCol,
    where("title", ">=", title),
    where("title", "<=", title + "\uf8ff")
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot) {
    const entryList = querySnapshot.docs.map((doc) => {
      let bookEntry: BookEntry = JSON.parse(JSON.stringify(doc.data()));
      return bookEntry;
    });

    return entryList;
  } else {
    console.log("No such document!");
  }
  return q;
}
