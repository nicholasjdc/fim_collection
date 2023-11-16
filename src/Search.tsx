import { useState } from "react";
import { BookEntry } from "./BookEntry";
import { queryEntries } from "./personalFirebase";
import BookList from "./BookList";

const Search = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [entryNumber, setEntryNumber] = useState("");
  const [note, setNote] = useState("");
  const [ISBN, setISBN] = useState("");
  const [publication, setPublication] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [seriesTitle, setSeriesTitle] = useState("");
  const [languageCode, setLanguageCode] = useState("");
  const [resource, setResource] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [searchResults, setSearchResults] = useState<BookEntry[]>([])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);
   
    queryEntries(entryNumber, author, title, publication, pageCount, ISBN, seriesTitle, note, resource, languageCode).then((data:BookEntry[]) => {
      setIsPending(false);
      setSearchResults(data);
      
    });
  };
  return (
    <div className = "search">
        <div className="create">

        <h2>Advanced Search</h2>
        <form onSubmit={handleSubmit}>
            <label>Entry Number:</label>
            <input
            type="text"
            value={entryNumber}
            onChange={(e) => setEntryNumber(e.target.value)}
            ></input>

            <label>ISBN:</label>
            <input
            type="text"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
            ></input>

            <label>Title:</label>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ></input>

            <label>Author(s):</label>
            <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            ></input>

            <label>Publication:</label>
            <input
            type="text"
            value={publication}
            onChange={(e) => setPublication(e.target.value)}
            ></input>

            <label>Page Count:</label>
            <input
            type="text"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            ></input>

            <label>Series Title:</label>
            <input
            type="text"
            value={seriesTitle}
            onChange={(e) => setSeriesTitle(e.target.value)}
            ></input>

            <label>Resource:</label>
            <input
            type="text"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            ></input>

            <label>Note:</label>
            <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            ></textarea>

            <label>Language Code:</label>
            <input
            type="text"
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value)}
            ></input>
            {!isPending && <button>Search!</button>}
            {isPending && <button  disabled>Searching...</button>}
        </form>
        </div>

        <div className="results">
            <h2></h2>
            <BookList books = {searchResults} title="Result Entries" />
        </div>
    </div>
    
  );
};

export default Search;
