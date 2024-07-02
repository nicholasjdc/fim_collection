import {useNavigate, useParams } from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link"
import { deleteEntry } from "../function_helpers/sqlFunctions";
import useGetEntryMongo from "../hooks/useGetEntryMongo";
import { useAuthContext } from "../hooks/useAuthContext";
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

  return (
    <div className="blog-details">
      {isPending && <div>loading...</div>}
      {error && <div>{error}</div>}
      {book && (
        <article>
          <p>Entry Number: {book.entryNumber}</p>
           <p>Author: <Link to={"..//?resultPageNumber=1&OR%24%21authorAgg="+book.author+"&OR%24%21gen_type=book%2Cthesis%2Cscript%2Cscreenplay#bookList"}>{book.author}</Link></p>

          <p>Author(中文): <Link to={"..//?resultPageNumber=1&OR%24%21authorAgg="+book.authorc+"&OR%24%21gen_type=book%2Cthesis%2Cscript%2Cscreenplay#bookList"}>{book.authorc}</Link></p>
          <p>Author(Pinyin): <Link to={"..//?resultPageNumber=1&OR%24%21authorAgg="+book.authorp+"&OR%24%21gen_type=book%2Cthesis%2Cscript%2Cscreenplay#bookList"}>{book.authorp}</Link></p>
          <p>Title: {book.title}</p>
          <p>Title(中文): {book.titlec}</p>
          <p>Title(Pinyin): {book.titlep}</p>
          <p>Publication: {book.publication}</p>
          <p>Page Count: {book.pageCount}</p>
          <p>Subjects:</p>
          <div id="subjectList">
            
            {book.subjects &&book.subjects.map((subject) => (
              <Link to={"..//?resultPageNumber=1&OR%24%21subjects="+subject+"&OR%24%21gen_type=book%2Cthesis%2Cscript%2Cscreenplay#bookList"}><p key={subject}>{subject}</p></Link>
            ))} 
          </div>
          <p>Language Code(s):</p>
          <div id="lcList">
            {book.languageCode &&book.languageCode.map((lc) => (
              <p key={lc}>{lc}</p>
            ))}
          </div>
          <p>ISBN: {book.ISBN}</p>
          <p>Series Title: {book.seriesTitle}</p>
          <p>Note: {book.note}</p>
        </article>
      )}
      <div className="alterButtons">
        <button
          type="button"
          onClick={() => {
            handleEdit();
          }}
        >
          Edit
        </button>
        {/*
        <button
          type="button"
          onClick={() => {
            handleEdit();
          }}
        >
          Suggest Edit
        </button>
        */}
        <button
          type="button"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
