import { Link } from "react-router-dom";
import { BookEntry } from "./BookEntry";

interface BookListProps {
    books: BookEntry[];
    title: string;
}
const BookList: React.FC<BookListProps> = ({books, title}) => {

    return (  
        <div className="blog-list">
            <h2>{title}</h2>
             {books.map((book) => (
                <div className="blog-preview" key={book.ISBN}>
                    <Link to={`/books/${book.ISBN}`}>
                        <h2>{book.title}</h2>
                        <p>Written by {book.author}</p>
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}
 
export default BookList;