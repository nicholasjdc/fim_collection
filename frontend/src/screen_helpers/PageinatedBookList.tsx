import { Pagination } from "@mui/material";
import BookList from "./BookList";

export const PageinatedBookList = (
  error,
  recordCount,
  searchResults,
  resultPageNumber,
  handlePageChange,
  isPending
) => {
  return (
    <div className="PageinatedBookList">
     {error && <div>{error}</div>}
      {isPending && <div>Searching...</div>}
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
