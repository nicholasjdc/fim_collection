import { useNavigate, useParams } from "react-router-dom";
import useGetEntry from "../function_helpers/useGetEntry";

const BookDetails = () => {
    const { id:ISBN } = useParams(); //Grab route parameters from current route

    const {data: book, error, isPending} = useGetEntry(ISBN);
    const navigate = useNavigate();

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
                    <p>ISBN: {book.ISBN}</p>
                    <p>Series Title: {book.seriesTitle}</p>
                    <p>Note: {book.note}</p>
                    
                </article>
            )}
        </div>
    );
}
 
export default BookDetails;