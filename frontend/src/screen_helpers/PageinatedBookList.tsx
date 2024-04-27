import { Pagination } from "@mui/material";
import BookList from "./BookList";

const PageinatedBookList = (
  error,
  recordCount,
  searchResults,
  resultPageNumber,
  handlePageChange
) => {
  return (
    <div className="PageinatedBookList">
      {error && <div>{error}</div>}
      <div className="results">
        <h2></h2>
        <BookList
          bookCount={recordCount}
          books={searchResults}
          title="Result Entries"
        />
      </div>
      <Pagination
        page={resultPageNumber}
        count={Math.ceil(recordCount / 25)}
        color="primary"
        onChange={handlePageChange}
      />
    </div>
  );
};
