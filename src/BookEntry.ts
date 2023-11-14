export interface BookEntryInterface{
    entryNumber: string;
    author: string;
    title: string;
    publication: string;
    pageCount: string;
    ISBN: string;
    seriesTitle: string;
    note: string;
    resource: string;
    languageCode: string;
    instantiatedAt: Date;
}
export class BookEntry implements BookEntryInterface{
    entryNumber: string;
    author: string;
    title: string;
    publication: string;
    pageCount: string;
    ISBN: string;
    seriesTitle: string;
    note: string;
    resource: string;
    languageCode: string;
    instantiatedAt: Date;
    constructor(entryNumber: string, author: string, title: string, publication: string, pageCount: string, ISBN: string, seriesTitle: string, note: string, resource: string, languageCode: string, instantiatedAt: Date) {
        this.entryNumber = entryNumber;
        this.author = author;
        this.title = title;
        this.publication = publication;
        this.pageCount = pageCount;
        this.ISBN = ISBN;
        this.seriesTitle = seriesTitle;
        this.note = note;
        this.resource = resource;
        this.languageCode = languageCode;
        this.instantiatedAt = instantiatedAt;
    }
    public static bookEntryFromMap(entryMap: Map<string, any>): BookEntry {
        var newBookEntry = new BookEntry(entryMap.get('entryNumber'), entryMap.get('author'), entryMap.get('title'), entryMap.get('publication'), entryMap.get('pageCount'), entryMap.get('ISBN'), entryMap.get('seriesTitle'), entryMap.get('note'), entryMap.get('resource'), entryMap.get('languageCode'), entryMap.get('instantiatedAt'));
        return newBookEntry;
    }

    public static bookEntryFromDictionary(entryMap: { entryNumber: any; author: any; title: any; publication: any; pageCount: any; ISBN: any; seriesTitle: any; note: any; resource: any; languageCode: any; instantiatedAt: any; }): BookEntry {
        var newBookEntry = new BookEntry(entryMap['entryNumber'], entryMap['author'], entryMap['title'], entryMap['publication'], entryMap['pageCount'], entryMap['ISBN'], entryMap['seriesTitle'], entryMap['note'], entryMap['resource'], entryMap['languageCode'], entryMap['instantiatedAt']);
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
