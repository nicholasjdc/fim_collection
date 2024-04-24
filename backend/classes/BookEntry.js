class BookEntry  {

    constructor(
      entryNumber,
      author,
      authorc, 
      authorp,
      title,
      titlec,
      titlep,
      publication,
      pageCount,
      ISBN,
      seriesTitle,
      seriesTitlec,
      note,
      resource,
      languageCode,
      subjects,
      missingFields,
      instantiatedAt,
     
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
      this.seriesTitlec = seriesTitlec;
      this.note = note;
      this.resource = resource;
      this.languageCode = languageCode;
      this.subjects = subjects;
      this.missingFields = missingFields;
      this.instantiatedAt = instantiatedAt;
     
    }
}
module.exports = {BookEntry}