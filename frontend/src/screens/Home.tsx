import { useEffect, useState } from "react";
import BookList from "../screen_helpers/BookList";
import {
  massDocPost,
  queryEntriesByKeywordAndSubjects,
  queryEntriesByKeywords,
  queryEntriesByKeywordsPaginated,
} from "../function_helpers/personalFirebase";
import { BookEntry } from "../screen_helpers/BookEntry";
import { firebaseJSONPump } from "../function_helpers/qualityOfLifeFunctions";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useGetEntries from "../function_helpers/useGetEntries";
import { getSearchParamsForLocation } from "react-router-dom/dist/dom";
import CheckboxList from "../screen_helpers/CheckboxList";
import Checkbox from "../screen_helpers/Checkbox";
import Collapsible from "react-collapsible";
import { genSubjectKeyWords } from "../function_helpers/subjectKeywordGen";
import Suggestions from "../screen_helpers/Suggestions";
import { returnPossibleKeyWords } from "../function_helpers/keywordVariables";
import { deleteEntry, getEntry, patchEntry, postEntry } from "../function_helpers/mongoFunctions";
import { API_URL } from "../function_helpers/handyVariables";
const Home = () => {
  const { id: keywords } = useParams(); //Grab route parameters from current route
  const navigate = useNavigate();

  const [selectedSubjectList, setSelectedSubjectList] = useState([]);
  const [search, setSearch] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [subjectSuggestions, setSubjectSuggestions] = useState([]);
  const [books, setBooks] = useState<BookEntry[] | null>(null);
  const [bookResultCount, setBookResultCount] = useState(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [error, setError] = useState(null);
  const [loadSearch, setLoadSearch] = useState("");
  useGetEntries(search);
  var lastViewedEntry;
  var docResultCount;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadSearch(search);
    navigate(`/${search}`);
  };
  useEffect(() => {
    setIsPending(true);

    queryEntriesByKeywordAndSubjects(keywords, selectedSubjectList)
      .then((result) => {
        var entries = result["pageinateResults"]["bookEntryResults"];
        lastViewedEntry = result["pageinateResults"]["lastEntry"];
        docResultCount = result["countSnapshot"].data().count;

        setBookResultCount(docResultCount);
        setBooks(entries as BookEntry[]);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });

    setIsPending(false);
  }, [loadSearch]);

  return (
    <div className="home">
      {/*
      <div className ="oneTimeThing">
        <button id="BigBoom" onClick={handleSubmit}></button>
      </div>
    */}

      <div className="search">
        <form id="form" onSubmit={handleSubmit}>
          <div className="searchbar">
            <input
              type="search"
              id="query"
              name="q"
              placeholder="Search by author or title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>
              <img
                height="15px"
                id="searchimg"
                src="src/assets/searchbutton.svg"
              />
            </button>
          </div>
        </form>
        <Collapsible trigger="Subjects">
          <form id="subjectForm" onSubmit={handleSubmit}>
            <input
              type="search"
              id="query"
              name="q"
              placeholder="Search by Subject"
              value={subjectSearch}
              onChange={(e) => {
                setSubjectSearch(e.target.value);
                setSubjectSuggestions(
                  returnPossibleKeyWords(e.target.value.toLocaleLowerCase())
                );
              }}
            />
            {selectedSubjectList.map((subject) => (
              <p id={subject}>{subject}</p>
            ))}
            <button>Add Subject</button>
          </form>
          {
            <Suggestions
              suggestionList={subjectSuggestions}
              buttonfunction={(e) => {
                var tempSubjectList = selectedSubjectList.slice(0);
                tempSubjectList.push(e.target.innerText);
                setSelectedSubjectList(tempSubjectList);
              }}
            ></Suggestions>
          }
        </Collapsible>
      </div>

      {error && <div>{error}</div>}
      {isPending && <div>Searching...</div>}
      {/*Make sure books exists when loading*/}
      {books && (
        <BookList
          books={books}
          title="Found Entries"
          bookCount={bookResultCount}
        />
      )}
    </div>
  );
};

export default Home;
