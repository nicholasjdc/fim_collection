import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookEntry } from "../screen_helpers/BookEntry";
import { addBookEntry } from "../function_helpers/personalFirebase";
import { createKeywordsByWord } from "../function_helpers/keyword";
const Create = () => {
  const [title, setTitle] = useState("");
  const [titlec, setTitlec] = useState("");
  const [titlep, setTitlep] = useState("");

  const [author, setAuthor] = useState("");
  const [authorc, setAuthorc] = useState("");
  const [authorp, setAuthorp] = useState("");

  const [entryNumber, setEntryNumber] = useState("");
  const [note, setNote] = useState("");
  const [ISBN, setISBN] = useState("");
  const [publication, setPublication] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [seriesTitle, setSeriesTitle] = useState("");
  const [languageCode, setLanguageCode] = useState("");
  const [resource, setResource] = useState("");

  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const joinedTitle = title + " " + titlec + " " + titlep;
    const joinedAuthor = author + " " + authorc + " " + authorp;
    const tKeyWords: String[] = Array.from(createKeywordsByWord(joinedTitle));
    const aKeyWords: String[] = Array.from(createKeywordsByWord(joinedAuthor));
    const concatKeyWords: String[] = Array.from(
      new Set([
        ...createKeywordsByWord(joinedTitle),
        ...createKeywordsByWord(joinedAuthor),
      ])
    );
    setIsPending(true);
    let currentDate: Date = new Date(Date.now());
    let newBookEntry: BookEntry = BookEntry.bookEntryFromDictionary({
      entryNumber: entryNumber,
      author: author,
      authorc: authorc,
      authrop: authorp,
      title: title,
      titlec: titlec,
      titlep: titlep,
      note: note,
      ISBN: ISBN,
      publication: publication,
      pageCount: pageCount,
      seriesTitle: seriesTitle,
      languageCode: languageCode,
      resource: resource,
      instantiatedAt: currentDate,
      keyWords: concatKeyWords,
      titleKeyWords: tKeyWords,
      authorKeyWords: aKeyWords,
    });
    addBookEntry(newBookEntry, newBookEntry.ISBN).then(() => {
      setIsPending(false);
      //history.go(-1);
      navigate("/");
    });
  };
  return (
    <div className="create">
      <h2>Add a New Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>Entry Number:</label>
        <input
          type="text"
          required
          value={entryNumber}
          onChange={(e) => setEntryNumber(e.target.value)}
        ></input>

        <label>ISBN:</label>
        <input
          type="text"
          required
          value={ISBN}
          onChange={(e) => setISBN(e.target.value)}
        ></input>

        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Title(中文):</label>
        <input
          type="text"
          required
          value={titlec}
          onChange={(e) => setTitlec(e.target.value)}
        ></input>
        <label>Title(Pinyin):</label>
        <input
          type="text"
          required
          value={titlep}
          onChange={(e) => setTitlep(e.target.value)}
        ></input>

        <label>Authors:</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <label>Author(中文):</label>
        <input
          type="text"
          required
          value={authorc}
          onChange={(e) => setAuthorc(e.target.value)}
        ></input>
        <label>Author(Pinyin):</label>
        <input
          type="text"
          required
          value={authorp}
          onChange={(e) => setAuthorp(e.target.value)}
        ></input>

        <label>Publication:</label>
        <input
          type="text"
          required
          value={publication}
          onChange={(e) => setPublication(e.target.value)}
        ></input>

        <label>Page Count:</label>
        <input
          type="text"
          required
          value={pageCount}
          onChange={(e) => setPageCount(e.target.value)}
        ></input>

        <label>Series Title:</label>
        <input
          type="text"
          required
          value={seriesTitle}
          onChange={(e) => setSeriesTitle(e.target.value)}
        ></input>

        <label>Resource:</label>
        <input
          type="text"
          required
          value={resource}
          onChange={(e) => setResource(e.target.value)}
        ></input>

        <label>Note:</label>
        <textarea
          required
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>

        <label>Language Code:</label>
        <input
          type="text"
          required
          value={languageCode}
          onChange={(e) => setLanguageCode(e.target.value)}
        ></input>
        {!isPending && <button>Add Entry</button>}
        {isPending && <button disabled>Adding Entry...</button>}
      </form>
    </div>
  );
};

export default Create;
