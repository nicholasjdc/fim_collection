import { Pagination } from "@mui/material";
import BookList from "./BookList";
import { useTranslation } from "react-i18next";
const PageinatedBookList = (
  {error,
  bookResultCount,
  books,
  resultPageNumber,
  handlePageChange,
  isPending}
) => {
  const {t} = useTranslation()
  return (
    <div className="PageinatedBookList">
     
      {error && <div>{error}</div>}
      {isPending && <div>Searching...</div>}
      {/*Make sure books exists when loading*/}
      
      {books && (
        <BookList
          books={books}
          title={t("entries")}
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