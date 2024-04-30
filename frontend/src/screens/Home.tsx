import { useEffect, useState } from "react";
import { allSubjects } from "../function_helpers/handyVariables";
import BookList from "../screen_helpers/BookList";
import { BookEntry } from "../screen_helpers/BookEntry";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getEntries } from "../function_helpers/mongoFunctions";
import { API_URL } from "../function_helpers/handyVariables";
import Pagination from "@mui/material/Pagination";
import { useAuthContext } from "../hooks/useAuthContext";
import searchbutton from "../assets/searchbutton.svg";
import Collapsible from "react-collapsible";
import PageinatedBookList from "../screen_helpers/PageinatedBookList";
const Home = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState<BookEntry[] | null>(null);
  const [bookResultCount, setBookResultCount] = useState(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [error, setError] = useState(null);
  const [resultPageNumber, setResultPageNumber] = useState(1);
  const [search, setSearch] = useSearchParams();
  const [curSubject, setCurSubject] = useState("");
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setResultPageNumber(value);
    const tempSearch = search;
    tempSearch.set("resultPageNumber", value.toString());
    setSearch(tempSearch);
  };
  const { user } = useAuthContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const queryParams = {};
    if (keyword) {
      queryParams["OR$!keyword"] = keyword;
    }
    if (curSubject) {
      queryParams["OR$!subjects"] = curSubject;
    }
    if (title) {
      queryParams["OR$!titleAgg"] = title;
    }
    if (author) {
      queryParams["OR$!authorAgg"] = author;
    }
    queryParams["resultPageNumber"] = 1;
    setResultPageNumber(1);
    console.log(createSearchParams(queryParams).toString())
    setSearch(createSearchParams(queryParams).toString());
  };
  useEffect(() => {
    setIsPending(true);

    if (search.get("resultPageNumber")) {
      setResultPageNumber(parseInt(search.get("resultPageNumber")));
    }
    if (user) {
      getEntries(API_URL + "film-entries?" + search, user.token)
        .then((result) => {
          var entries = result['entries'];
          setBookResultCount(result['count']);
          setBooks(entries as BookEntry[]);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }
    setIsPending(false);
  }, [search, user]);

  return (
    <div className="home">
      <div className="search">
        <form id="form" onSubmit={handleSubmit}>
          <div className="searchbar">
            <input
              type="search"
              id="query"
              name="q"
              placeholder="Search by keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button>
              <img height="15px" id="searchimg" src={searchbutton} />
            </button>
          </div>
          <input
            list="subjects"
            id="subject-choice"
            name="subject-choice"
            placeholder="Subject"
            value={curSubject}
            onChange={(e) => setCurSubject(e.target.value)} //setCurSubject(e.target.value)}
          />
          <p></p>
          <datalist id="subjects">
            {allSubjects.map((sub) => (
              <option key={sub} value={sub}></option>
            ))}
          </datalist>
          <input
            type="search"
            id="title_input"
            name="q"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p></p>
          <input
            type="search"
            id="author_input"
            name="q"
            placeholder="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

        </form>
        <Collapsible trigger="Boolean Search(Expandable)"></Collapsible>
      </div>
      {<PageinatedBookList books={books} bookResultCount={bookResultCount}
        resultPageNumber={resultPageNumber}
        handlePageChange={handlePageChange}
        isPending={isPending}
        error={error} />
  }
      {/*
      {error && <div>{error}</div>}
      {isPending && <div>Searching...</div>}
a      
      {books && (
        <BookList
          books={books}
          title="Found Entries"
          bookCount={bookResultCount}
        />
      )}
      <p></p>
      <Pagination
        page={resultPageNumber}
        count={Math.ceil(bookResultCount / 25)}
        color="primary"
        onChange={handlePageChange}
      />
      */}
    </div>
  );
};

export default Home;
