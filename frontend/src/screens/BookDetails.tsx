import { useNavigate, useParams } from "react-router-dom";
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
          <p>Author: {book.author}</p>
          <p>Author(中文): {book.authorc}</p>
          <p>Author(Pinyin): {book.authorp}</p>
          <p>Title: {book.title}</p>
          <p>Title(中文): {book.titlec}</p>
          <p>Title(Pinyin): {book.titlep}</p>
          <p>Publication: {book.publication}</p>
          <p>Page Count: {book.pageCount}</p>
          <p>Subjects:</p>
          <div id="subjectList">
            {book.subjects.map((subject) => (
              <p key={subject}>{subject}</p>
            ))}
          </div>
          <p>Language Code(s):</p>
          <div id="lcList">
            {book.languageCode.map((lc) => (
              <p key={lc}>{lc}</p>
            ))}
          </div>
          <p>ISBN: {book.ISBN}</p>
          <p>Series Title: {book.seriesTitle}</p>
          <p>Note: {book.note}</p>
          <p>Missing Fields:</p>
          <p></p>
          {book.missingFields.map((field) => (
            <p>{field}</p>
          ))}
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
