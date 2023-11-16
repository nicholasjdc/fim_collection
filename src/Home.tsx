import { useState } from "react";
import BookList from "./BookList";
import { queryEntriesByKeywords } from "./personalFirebase";
import { BookEntry } from "./BookEntry";

const Home = () => {
  //grab data but rename it blogs
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<BookEntry[]>(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    queryEntriesByKeywords(search).then((entries) => {
      setBooks(entries as BookEntry[]);
    }).catch(err=>{ 
            setIsPending(false);
            setError(err.message);
    });
    setIsPending(false);
  };

  return (
    <div className="home">
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
            
            <img height="15px" id="searchimg" src="/searchbutton.svg" />
          </button>
        </form>
      </div>

      {error && <div>{error}</div>}
      {isPending && <div>Searching...</div>}
      {/*Make sure blogs exists when loading*/}
      {books && <BookList books={books} title="Found Entries" />}
    </div>
  );
};

export default Home;
