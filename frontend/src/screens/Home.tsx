import { useEffect, useState } from "react";
import BookList from "../screen_helpers/BookList";
import { BookEntry } from "../screen_helpers/BookEntry";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {getEntries} from "../function_helpers/mongoFunctions";
import { API_URL } from "../function_helpers/handyVariables";
import Pagination from '@mui/material/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("")
  const [books, setBooks] = useState<BookEntry[] | null>(null);
  const [bookResultCount, setBookResultCount] = useState(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [error, setError] = useState(null);
  const [resultPageNumber, setResultPageNumber] = useState(1)
  const [search, setSearch] = useSearchParams();

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setResultPageNumber(value)
    const tempSearch = search
    tempSearch.set('resultPageNumber', value.toString())
    setSearch(tempSearch)
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    const queryParams = {}
    if(keyword){
      queryParams['keyword'] = keyword
    }
    queryParams['resultPageNumber'] = resultPageNumber.toString()
    setSearch(createSearchParams(queryParams).toString());
  };
  useEffect(() => {
    setIsPending(true);
    const queryParams = {}
    if(keyword){
      queryParams['keyword'] = keyword
    }
    queryParams['resultPageNumber'] = resultPageNumber.toString()
    if(search.get('resultPageNumber')){
      setResultPageNumber(parseInt(search.get('resultPageNumber')))
    }
    getEntries(API_URL + '?' +search).then((result) => {
      var entries = result['entries']
      setBookResultCount(result['recordCount']);
      setBooks(entries as BookEntry[]);
      setError(null);
    })
    .catch((err) => {
      setIsPending(false);
      setError(err.message);
    });
   
    setIsPending(false);
  }, [search]);

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
      <p></p>
             <Pagination page={resultPageNumber} count={Math.ceil(bookResultCount/25)} color="primary" onChange={handlePageChange} />

    </div>
  );
};

export default Home;
