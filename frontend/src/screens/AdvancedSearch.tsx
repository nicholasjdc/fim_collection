import { useEffect, useState } from "react";
import { BookEntry } from "../screen_helpers/BookEntry";
import BookList from "../screen_helpers/BookList";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { getEntries, getEntry } from "../function_helpers/mongoFunctions";
import { getSearchParamsForLocation } from "react-router-dom/dist/dom";
import { API_URL, allSubjects } from "../function_helpers/handyVariables";
const AdvancedSearch = () => {
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
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [searchResults, setSearchResults] = useState<BookEntry[]>([]);
  const [loadSearch, setLoadSearch] = useState(null);
  const [search, setSearch] = useSearchParams();
  const [subjects, setSubjects] = useState(new Set(''))
  const [curSubject, setCurSubject] = useState("");
  const navigate = useNavigate();

  console.log(search)
  const onAddSubjectClick = (e) => {
    e.preventDefault();
    let tempSubjects = subjects;
    tempSubjects.add(curSubject);
    setSubjects(tempSubjects);
    setCurSubject("");
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const queryParams = {}
    if(title){
      queryParams['title'] = title;
    }
    if(author){
      queryParams['author'] = author
    }
    if(entryNumber){
      queryParams['entryNumber'] = entryNumber
    }
    if(note){
      queryParams['note'] = note
    }
    if(ISBN){
      queryParams['ISBN'] = ISBN
    }
    if(publication){
      queryParams['publication'] = publication
    }
    if(pageCount){
      queryParams['pageCount'] = pageCount;
    }
    if(seriesTitle){
      queryParams['seriesTitle'] = seriesTitle;
    }
    if(languageCode){
      queryParams['languageCode'] = languageCode;
    }
    if(subjects.size > 0){
      queryParams['subjects'] = Array.from(subjects).join('$#')
    }
    setLoadSearch(queryParams)
    navigate({
      pathname: "/search",
      search: createSearchParams(queryParams).toString(),
    });
  };
  useEffect(() => {
    setIsPending(true);
    getEntries(API_URL+ '?' +search, 1)
      .then((result) => {
        const entries: BookEntry[] = []
        result.forEach(e => {
          let newBE: BookEntry = e
          entries.push(newBE)
        });
        setError(null);
        setSearchResults(entries);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });

    setIsPending(false);
  }, [search]);

  return (
    <div className="search">
      <div className="create">
        <h2>Advanced Search (Still Under Construction!)</h2>
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
          <label>Subject(s):</label>
        <input
          list="subjects"
          id="subject-choice"
          name="subject-choice"
          value={curSubject}
          onChange={(e) => setCurSubject(e.target.value)}
        />
        <datalist id="subjects"> 
          {allSubjects.map((sub) => (
            <option key = {sub}value={sub}></option>
          ))}
        </datalist>
        <div className="subject-list">
          {Array.from(subjects).map((subject) => (
            <p key={subject}>{subject}</p>
          ))}
        </div>
        <button onClick={(e) => onAddSubjectClick(e)}>Add Subject</button>
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
          {isPending && <button disabled>Searching...</button>}
        </form>
      </div>
      {error && <div>{error}</div>}
      <div className="results">
        <h2></h2>
        <BookList bookCount={5} books={searchResults} title="Result Entries" />
      </div>
    </div>
  );
};

export default AdvancedSearch;
