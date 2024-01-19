export interface BookEntryInterface {
  _id: string;
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
  seriesTitlec: string;
  note: string;
  resource: string;
  languageCode: string[];
  subjects: string[];
  missingFields: string[];
  instantiatedAt: Date;

}
export class BookEntry implements BookEntryInterface {
  _id:string;
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
  seriesTitlec: string;
  note: string;
  resource: string;
  languageCode: string[];
  subjects: string[];
  missingFields: string[];
  instantiatedAt: Date;

  constructor(
    _id: string,
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
    seriesTitlec: string,
    note: string,
    resource: string,
    languageCode: string[],
    subjects: string[],
    missingFields: string[],
    instantiatedAt: Date,
   
  ) {
    this._id = _id;
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
    this.seriesTitlec = seriesTitlec;
    this.note = note;
    this.resource = resource;
    this.languageCode = languageCode;
    this.subjects = subjects;
    this.missingFields = missingFields;
    this.instantiatedAt = instantiatedAt;
   
  }
  public static bookEntryFromMap(entryMap: Map<string, any>): BookEntry {
    var newBookEntry = new BookEntry(
      entryMap.get("_id"),
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
      entryMap.get("seriesTitlec"),
      entryMap.get("note"),
      entryMap.get("resource"),
      entryMap.get("languageCode"),
      entryMap.get("subjects"),
      entryMap.get("missingFields"),
      entryMap.get("instantiatedAt"),

    );
    return newBookEntry;
  }

  public static bookEntryFromDictionary(entryMap: {
    _id: string;
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
    seriesTitlec: string;
    note: string;
    resource: string;
    languageCode: string[];
    subjects: string[];
    missingFields: string[];
    instantiatedAt: Date;
    keyWords: string[];
    authorKeyWords: string[];
    titleKeyWords: string[];
  }): BookEntry {
    var newBookEntry = new BookEntry(
      entryMap["_id"],
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
      entryMap["seriesTitlec"],
      entryMap["note"],
      entryMap["resource"],
      entryMap["languageCode"],
      entryMap["subjects"],
      entryMap['missingFields'],
      entryMap["instantiatedAt"],
   
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
