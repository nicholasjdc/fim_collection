import { useState } from "react";
import BookList from "../screen_helpers/BookList";
import { massDocPost, queryEntriesByKeywords, queryEntriesByKeywordsPaginated } from "../function_helpers/personalFirebase";
import { BookEntry } from "../screen_helpers/BookEntry";
import { firebaseJSONPump } from "../function_helpers/qualityOfLifeFunctions";

const Home = () => {
  //grab data but rename it blogs
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<BookEntry[] | null>(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [error, setError] = useState(null);

  var lastViewedEntry;
  var docResultCount;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsPending(true);
    queryEntriesByKeywordsPaginated(search).then((result) => {
      var entries = result["pageinateResults"]["bookEntryResults"];
      lastViewedEntry = result["pageinateResults"]["lastEntry"];
      docResultCount = result["countSnapshot"];
      setBooks(entries as BookEntry[]);
    }).catch(err=>{ 
            setIsPending(false);
            setError(err.message);
    });
    setIsPending(false);
  };

  return (
    <div className="home">
      <div className ="oneTimeThing">
        <button id="BigBoom" onClick={massDocPost}></button>
      </div>
      <div className="search">
        <form id="form" onSubmit={handleSubmit}>
          <input
            type="search"
            id="query"
            name="q"
            placeholder="Search by author or title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            
            <img height="15px" id="searchimg" src="src/assets/searchbutton.svg" />
          </button>
        </form>
      </div>

      {error && <div>{error}</div>}
      {isPending && <div>Searching...</div>}
      {/*Make sure books exists when loading*/}
      {books && <BookList books={books} title="Found Entries" />}
    </div>
  );
};

export default Home;
