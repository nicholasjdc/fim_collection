import {useNavigate, useParams } from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link"
import { deleteEntry } from "../function_helpers/sqlFunctions";
import useGetEntryMongo from "../hooks/useGetEntryMongo";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
const BookDetails = () => {
  const { user } = useAuthContext();
  const { id } = useParams(); //Grab route parameters from current route
    const { data: book, error, isPending } = useGetEntryMongo(id);
    console.log("KLAJDSL")
    console.log(book)
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteEntry(id, user.token);
    navigate("/");
  };
  const handleEdit = () => {
    navigate("/edit/" + id);
  };
  const {t} = useTranslation()

  return (
    <div className="blog-details">
      {isPending && <div>loading...</div>}
      {error && <div>{error}</div>}
      {book && (
        <article>
          <p>{t("entry-number")}: {book.entryNumber}</p>
           <p>{t("author")}: <Link to={"..//?resultPageNumber=1&OR%24%21authorAgg="+book.author+"&OR%24%21gen_type=book%2Cthesis%2Cscript%2Cscreenplay#bookList"}>{book.author}</Link></p>

          <p>{t("author")}(中文): <Link to={"..//?resultPageNumber=1&OR%24%21authorAgg="+book.authorc+"&OR%24%21gen_type=book%2Cthesis%2Cscript%2Cscreenplay#bookList"}>{book.authorc}</Link></p>
          <p>{t("author")}(Pinyin): <Link to={"..//?resultPageNumber=1&OR%24%21authorAgg="+book.authorp+"&OR%24%21gen_type=book%2Cthesis%2Cscript%2Cscreenplay#bookList"}>{book.authorp}</Link></p>
          <p>{t("title")}: {book.title}</p>
          <p>{t("title")}(中文): {book.titlec}</p>
          <p>{t("title")}(Pinyin): {book.titlep}</p>
          <p>{t("publication")}: {book.publication}</p>
          <p>{t("page-count")}: {book.pageCount}</p>
          <p>{t("subjects")}:</p>
          <div id="subjectList">
            
            {book.subjects &&book.subjects.map((subject) => (
              <Link to={"..//?resultPageNumber=1&OR%24%21subjects="+subject+"&OR%24%21gen_type=book%2Cthesis%2Cscript%2Cscreenplay#bookList"}><p key={subject}>{subject}</p></Link>
            ))} 
          </div>
          <p>{t("language-codes")}:</p>
          <div id="lcList">
            {book.languageCode &&book.languageCode.map((lc) => (
              <p key={lc}>{lc}</p>
            ))}
          </div>
          <p>{t("ISBN")}: {book.ISBN}</p>
          <p>{t("series-title")}: {book.seriesTitle}</p>
          <p>{t("note")}: {book.note}</p>
        </article>
      )}
      <div className="alterButtons">
        <button
          type="button"
          onClick={() => {
            handleEdit();
          }}
        >
          {t("edit")}
        </button>
        <button
          type="button"
          onClick={() => {
            handleDelete();
          }}
        >
          {t("delete")}
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
