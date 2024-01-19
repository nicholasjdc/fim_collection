import { useEffect, useState } from "react";
import { BookEntry } from "../screen_helpers/BookEntry";
import BookList from "../screen_helpers/BookList";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { getEntries, getEntry } from "../function_helpers/mongoFunctions";
import { getSearchParamsForLocation } from "react-router-dom/dist/dom";
import { API_URL, allLC, allSubjects } from "../function_helpers/handyVariables";
import {Pagination} from "@mui/material"
import Collapsible from "react-collapsible";
const AdvancedSearch = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [entryNumber, setEntryNumber] = useState("");
  const [note, setNote] = useState("");
  const [ISBN, setISBN] = useState("");
  const [publication, setPublication] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [seriesTitle, setSeriesTitle] = useState("");
  const [languageCode, setLanguageCode] = useState(new Set(''));
  const [resource, setResource] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [searchResults, setSearchResults] = useState<BookEntry[]>([]);
  const [resultPageNumber, setResultPageNumber] = useState(1)
  const [search, setSearch] = useSearchParams();
  const [subjects, setSubjects] = useState(new Set(''))
  const [curSubject, setCurSubject] = useState("");
  const [recordCount, setRecordCount] = useState(null)
  const [curLC, setCurLC] = useState("");
  const navigate = useNavigate();
  const onDeleteSubject = (e:React.ChangeEvent<unknown>, subject: string)=>{
    e.preventDefault() 
    let tempSubjects = subjects
    tempSubjects.delete(subject)
    setSubjects(tempSubjects)

  }
  const onDeleteLC = (e:React.ChangeEvent<unknown>, lc: string)=>{
    e.preventDefault() 
    let tempLC = languageCode
    tempLC.delete(lc)
    setSubjects(tempLC)

  }
  const onAddSubjectClick = (e) => {
    e.preventDefault();
    let tempSubjects = subjects;
    tempSubjects.add(curSubject);
    setSubjects(tempSubjects);
    setCurSubject("");
  };
  const onAddLCClick = (e) => {
    e.preventDefault();
    let tempLC = languageCode;
    tempLC.add(curLC);
    setLanguageCode(tempLC);
    setCurLC("");
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
    if(languageCode.size >0){
      queryParams['languageCode'] = Array.from(languageCode).join('$#');
    }
    if(subjects.size > 0){
      queryParams['subjects'] = Array.from(subjects).join('$#')
    }
    setResultPageNumber(1);
    queryParams['resultPageNumber'] = 1

    setSearch(createSearchParams(queryParams).toString())
  };
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const queryParams ={}
    let tempSearch = search
    setResultPageNumber(value)
    tempSearch.set('resultPageNumber',value.toString())
    setSearch(tempSearch)
  };
  useEffect(() => {
    setIsPending(true);
    if(search.get('resultPageNumber')){
      setResultPageNumber(parseInt(search.get('resultPageNumber')))
    }
    if(search){
      const searchObject = Object.fromEntries(search.entries())
      setTitle(search.get('title'))
      if(search.get('subjects')){
        setSubjects(new Set(searchObject['subjects'].split('$#')))
      }
      
      setAuthor(search.get('author'))

      setEntryNumber(search.get('entryNumber'))
      setNote(search.get('note'))
      setISBN(search.get('ISBN'))
      setPublication(search.get('Publication'))
      setPageCount(search.get('PageCount'))
      setSeriesTitle(search.get('seriesTitle'))
      if(search.get('languageCode')){
        setLanguageCode(new Set(searchObject['languageCode'].split('$#')))
      }      
      setResource(search.get('resource'))

    }
    getEntries(API_URL+ '?' +search)
      .then((result) => {
        const entries: BookEntry[] = []
        result['entries'].forEach(e => {
          let newBE: BookEntry = e
          entries.push(newBE)
        });
        setError(null);
        setSearchResults(entries);
        setRecordCount(result['recordCount'])
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
        <h2>Advanced Search</h2>
        <Collapsible trigger="Search Paramaters (Collapsible)">

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
            <div id={subject}key={subject}>
            <p >{subject}</p>
            <button onClick={(e)=>onDeleteSubject(e, subject)}>
            <img
                height="15px"
                id={subject}
                src="src/assets/trashcan.svg"
              />
            </button>

              </div>
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

      <label>Language Code(s):</label>
        <input
          list="lc"
          id="lc-choice"
          name="lc-choice"
          value={curLC}
          onChange={(e) => setCurLC(e.target.value)}
        />
        <datalist id="lc"> 
          {allLC.map((sub) => (
            <option key={sub} value={sub}></option>
          ))}
        </datalist>
        <div className="lc-list">
          {Array.from(languageCode).map((lc) => (
            <p key={lc}>{lc}</p>
          ))}
        </div>
        <button onClick={(e) => onAddLCClick(e)}>Add Language Code</button>
          <label>Page Count:</label>
          <input
            type="text"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
          ></input>
          {!isPending && <button>Search!</button>}
          {isPending && <button disabled>Searching...</button>}
        </form>
        </Collapsible>

      </div>

      {error && <div>{error}</div>}
      <div className="results">
        <h2></h2>
        <BookList bookCount={recordCount} books={searchResults} title="Result Entries" />
      </div>
      <Pagination page={resultPageNumber}count={Math.ceil(recordCount/25)} color="primary" onChange={handlePageChange} />
    </div>
  );
};

export default AdvancedSearch;
