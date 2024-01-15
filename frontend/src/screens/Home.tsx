import { useEffect, useState } from "react";
import BookList from "../screen_helpers/BookList";
import { BookEntry } from "../screen_helpers/BookEntry";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useGetEntries from "../function_helpers/useGetEntries";
import Collapsible from "react-collapsible";
import Suggestions from "../screen_helpers/Suggestions";
import { returnPossibleKeyWords } from "../function_helpers/keywordVariables";
import {getEntries} from "../function_helpers/mongoFunctions";
import { API_URL } from "../function_helpers/handyVariables";
const Home = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("")
  const [books, setBooks] = useState<BookEntry[] | null>(null);
  const [bookResultCount, setBookResultCount] = useState(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [error, setError] = useState(null);
  const [loadSearch, setLoadSearch] = useState("");
  const [search, setSearch] = useSearchParams();

  useGetEntries(search);
  var docResultCount;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadSearch(keyword)
    const queryParams = {}
    if(keyword){
      queryParams['keyword'] = keyword
    }
    navigate({pathname: "/",
    search: createSearchParams(queryParams).toString()});
  };
  useEffect(() => {
    setIsPending(true);
    getEntries(API_URL + '?' +search, 1).then((result) => {
      var entries = result
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

      <div className="search">
        <form id="form" onSubmit={handleSubmit}>
          <div className="searchbar">
            <input
              type="search"
              id="query"
              name="q"
              placeholder="Search by author or title"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
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
