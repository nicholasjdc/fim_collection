import { initializeApp } from "firebase/app";
import {
  getDoc,
  doc,
  getFirestore,
  query,
  where,
  getCountFromServer,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  QuerySnapshot,
  QueryFieldFilterConstraint,
  Query,
  CollectionReference,
} from "firebase/firestore";
import { collection, getDocs, setDoc } from "firebase/firestore";
import { BookEntry } from "../screen_helpers/BookEntry";
import {
  capitalizeFirstLetter,
  firebaseJSONPump,
} from "./qualityOfLifeFunctions";
import { createKeywordsByWord, createKeywordsGranular } from "./keyword";

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
  const eTitleKeywords = createKeywordsByWord(data.title);
  const pTitleKeywords = createKeywordsByWord(data.titlep);
  const eAuthorKeywords = createKeywordsByWord(data.author);
  const pAuthorKeywords = createKeywordsByWord(data.authorp);
  const cAuthorKeyWords: Set<string> = createKeywordsGranular(data.authorc);
  const cTitleKeyWords: Set<string> = createKeywordsGranular(data.titlec);

  const tSetkeyWords: Set<string> = new Set([
    ...eTitleKeywords,
    ...pTitleKeywords,
    ...cTitleKeyWords,
  ]);
  const aSetKeyWords: Set<string> = new Set([
    ...eAuthorKeywords,
    ...pAuthorKeywords,
    ...cAuthorKeyWords,
  ]);
  console.log(tSetkeyWords);
  console.log(aSetKeyWords);
  const tKeyWords: string[] = Array.from(tSetkeyWords);
  const aKeyWords: string[] = Array.from(aSetKeyWords);
  const concatKeyWords: string[] = Array.from(
    new Set([...tSetkeyWords, ...aSetKeyWords])
  );
  data.keyWords = concatKeyWords;
  data.titleKeyWords = tKeyWords;
  data.authorKeyWords = aKeyWords;
  await setDoc(doc(db, routeToBookEntryCollection, id), data);
}
export async function addBookEntry(data: BookEntry, id: string) {
  console.log(data.ISBN);
  const eTitleKeywords = createKeywordsByWord(data.title);
  const pTitleKeywords = createKeywordsByWord(data.titlep);
  const eAuthorKeywords = createKeywordsByWord(data.author);
  const pAuthorKeywords = createKeywordsByWord(data.authorp);
  const cAuthorKeyWords: Set<string> = createKeywordsGranular(data.authorc);
  const cTitleKeyWords: Set<string> = createKeywordsGranular(data.titlec);

  const tSetkeyWords: Set<string> = new Set([
    ...eTitleKeywords,
    ...pTitleKeywords,
    ...cTitleKeyWords,
  ]);
  const aSetKeyWords: Set<string> = new Set([
    ...eAuthorKeywords,
    ...pAuthorKeywords,
    ...cAuthorKeyWords,
  ]);
  console.log(tSetkeyWords);
  console.log(aSetKeyWords);
  const tKeyWords: string[] = Array.from(tSetkeyWords);
  const aKeyWords: string[] = Array.from(aSetKeyWords);
  const concatKeyWords: string[] = Array.from(
    new Set([...tSetkeyWords, ...aSetKeyWords])
  );
  data.keyWords = concatKeyWords;
  data.titleKeyWords = tKeyWords;
  data.authorKeyWords = aKeyWords;
  await setDoc(
    doc(db, routeToBookEntryCollection, id),
    (data as BookEntry).toJSONBE()
  );
}
//Need To fix
/*
export async function queryEntries(
  entryNumber: any,
  author: any,
  title: any,
  publication: any,
  pageCount: any,
  ISBN: any,
  seriesTitle: any,
  note: any,
  resource: any,
  languageCode: any
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
    where("pageCount", "<=", languageCode+ "\uf8ff")),
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
}
*/
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
export async function queryEntriesByTitle(title: String) {
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
export async function queryEntries(
  collectionRef: CollectionReference,
  queryConstraints: QueryFieldFilterConstraint[],
  orderingKey: string,
  pageinateCount: number
) {
  const q = query(collectionRef, ...queryConstraints);
  const countSnapshot = await getCountFromServer(q);
  const docCount: number = countSnapshot.data().count;
  const pageinateResults = await loadNextPaginatedResult(
    null,
    orderingKey,
    pageinateCount,
    queryConstraints
  );
  return { pageinateResults, countSnapshot };
}
export async function queryEntriesByKeywordAndSubjects(keyword: string, subjects: string[]){
  const queryList: QueryFieldFilterConstraint[] = []
  if(!keyword){
    keyword = ''
  }
  const keywordWhereClause = where("keyWords", "array-contains-any", [
    keyword,
    keyword.toLowerCase(),
    keyword.toUpperCase(),
    capitalizeFirstLetter(keyword.toLowerCase()),
  ]);
  queryList.push(keywordWhereClause)
  if(subjects.length >0){
    const subjectWhereClause = where("subjects", "array-contains", subjects)
    queryList.push(subjectWhereClause)
  }
  return queryEntries(entriesCol,queryList, "entryNumber", 25)

}
export async function queryEntriesByKeywordsPaginated(keyword: String) {
  const keywordWhereClause = where("keyWords", "array-contains-any", [
    keyword,
    keyword.toLowerCase(),
    keyword.toUpperCase(),
    capitalizeFirstLetter(keyword.toLowerCase()),
  ]);
  const q = query(entriesCol, keywordWhereClause);
  const countSnapshot = await getCountFromServer(q);
  const docCount: number = countSnapshot.data().count;
  const pageinateResults = await loadNextPaginatedResult(
    null,
    "entryNumber",
    25,
    [keywordWhereClause]
  );
  return { pageinateResults, countSnapshot };
}
async function loadNextPaginatedResult(
  lastVisible: QueryDocumentSnapshot,
  orderingKey: string,
  docLimit: number,
  whereClause: QueryFieldFilterConstraint[]
) {
  var pageResult = null;

  if (lastVisible) {
    pageResult = query(
      collection(db, routeToBookEntryCollection),
      ...whereClause,
      orderBy(orderingKey),
      startAfter(lastVisible),
      limit(docLimit)
    );
  } else {
    pageResult = query(
      collection(db, routeToBookEntryCollection),
      ...whereClause,
      orderBy(orderingKey),
      limit(docLimit)
    );
  }

  const pageDocSnapshots = await getDocs(pageResult);
  const bookEntryResults = await snapsToBookEntries(pageDocSnapshots);
  const lastEntry = pageDocSnapshots.docs[pageDocSnapshots.docs.length - 1];

  return { bookEntryResults, lastEntry };
}
async function snapsToBookEntries(querySnapshot: QuerySnapshot) {
  if (querySnapshot) {
    const entryList = querySnapshot.docs.map((doc) => {
      let bookEntry: BookEntry = JSON.parse(JSON.stringify(doc.data()));
      return bookEntry;
    });

    return entryList;
  } else {
    console.log("No such document!");
  }
  return null;
}
export async function addQuery() {

}
export async function massDocPost() {
  const parsedItems = firebaseJSONPump();
  console.log(parsedItems);
  parsedItems.forEach((e) => {
    addEntryJSON(e, e.entryNumber);
  });
}
