export interface BookEntryInterface {
  entryNumber: string;
  author: string;
  authorc: string;
  authorp: string;
  title: string;
  titlec: string;
  titlep: string;
  publication: string;
  pageCount: string;
  ISBN: string;
  seriesTitle: string;
  note: string;
  resource: string;
  languageCode: string;
  instantiatedAt: Date;
  keyWords: String[];
  authorKeyWords: String[];
  titleKeyWords: String[];
}
export class BookEntry implements BookEntryInterface {
  entryNumber: string;
  author: string;
  authorc: string;
  authorp: string;
  title: string;
  titlec: string;
  titlep: string;
  publication: string;
  pageCount: string;
  ISBN: string;
  seriesTitle: string;
  note: string;
  resource: string;
  languageCode: string;
  instantiatedAt: Date;
  keyWords: String[];
  authorKeyWords: String[];
  titleKeyWords: String[];
  constructor(
    entryNumber: string,
    author: string,
    authorc: string,
    authorp: string,
    title: string,
    titlec: string,
    titlep: string,
    publication: string,
    pageCount: string,
    ISBN: string,
    seriesTitle: string,
    note: string,
    resource: string,
    languageCode: string,
    instantiatedAt: Date,
    keyWords: String[],
    authorKeyWords: String[],
    titleKeyWords: String[],
  ) {
    this.entryNumber = entryNumber;
    this.author = author;
    this.authorc = authorc;
    this.authorp = authorp;
    this.title = title;
    this.titlec = titlec;
    this.titlep =titlep;
    this.publication = publication;
    this.pageCount = pageCount;
    this.ISBN = ISBN;
    this.seriesTitle = seriesTitle;
    this.note = note;
    this.resource = resource;
    this.languageCode = languageCode;
    this.instantiatedAt = instantiatedAt;
    this.keyWords = keyWords;
    this.authorKeyWords = authorKeyWords;
    this.titleKeyWords = titleKeyWords;
  }
  public static bookEntryFromMap(entryMap: Map<string, any>): BookEntry {
    var newBookEntry = new BookEntry(
      entryMap.get("entryNumber"),
      entryMap.get("author"),
      entryMap.get("authorc"),
      entryMap.get("authorp"),
      entryMap.get("title"),
      entryMap.get("titlec"),
      entryMap.get("titlep"),
      entryMap.get("publication"),
      entryMap.get("pageCount"),
      entryMap.get("ISBN"),
      entryMap.get("seriesTitle"),
      entryMap.get("note"),
      entryMap.get("resource"),
      entryMap.get("languageCode"),
      entryMap.get("instantiatedAt"),
      entryMap.get("keyWords"),
      entryMap.get("authorKeyWords"),
      entryMap.get("titleKeyWords"),

    );
    return newBookEntry;
  }

  public static bookEntryFromDictionary(entryMap: {
    entryNumber: any;
    author: any;
    authorc: any;
    authorp: any;
    title: any;
    titlec: any;
    titlep: any;
    publication: any;
    pageCount: any;
    ISBN: any;
    seriesTitle: any;
    note: any;
    resource: any;
    languageCode: any;
    instantiatedAt: any;
    keyWords: String[];
    authorKeyWords:String[];
    titleKeyWords:String[];
  }): BookEntry {
    var newBookEntry = new BookEntry(
      entryMap["entryNumber"],
      entryMap["author"],
      entryMap["authorc"],
      entryMap["authorp"],
      entryMap["title"],
      entryMap["titlec"],
      entryMap["titlep"],
      entryMap["publication"],
      entryMap["pageCount"],
      entryMap["ISBN"],
      entryMap["seriesTitle"],
      entryMap["note"],
      entryMap["resource"],
      entryMap["languageCode"],
      entryMap["instantiatedAt"],
      entryMap["keyWords"],
      entryMap["authorKeyWords"],
      entryMap["titleKeyWords"],
    );
    return newBookEntry;
  }
  public static bookEntryFromJSONString(entryMap: string): BookEntry {
    let newBookEntry: BookEntry = JSON.parse(entryMap);
    return newBookEntry;
  }

  public toMap(): Map<string, any> {
    var entryMap = new Map<string, any>(Object.entries(this));
    return entryMap;
  }
  public toDictionary(): {} {
    var entryDict = Object.entries(this);
    return entryDict;
  }
  public toJSONBE(): Object {
    var entryJSON = JSON.parse(JSON.stringify(this));
    return entryJSON;
  }
  public toJSONString(): string {
    var entryJSON = JSON.stringify(this);

    return entryJSON;
  }
}
