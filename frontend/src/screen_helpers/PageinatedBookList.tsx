import { Pagination } from "@mui/material";
import BookList from "./BookList";

const PageinatedBookList = (
  {error,
  bookResultCount,
  books,
  resultPageNumber,
  handlePageChange,
  isPending}
) => {
  return (
    <div className="PageinatedBookList">
     
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
      <Pagination
        page={resultPageNumber}
        count={Math.ceil(bookResultCount / 25)}
        color="primary"
        onChange={handlePageChange}
      />
    </div>
  );
};
export default PageinatedBookList;