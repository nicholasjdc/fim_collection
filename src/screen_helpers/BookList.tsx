import { Link } from "react-router-dom";
import { BookEntry } from "./BookEntry";
import CheckboxList from "./CheckboxList";

interface BookListProps {
    books: BookEntry[];
    title: string;
    bookCount: number;
}
const BookList: React.FC<BookListProps> = ({books, title, bookCount}) => {

    return (  
        <div className="blog-list">
            <h2>{title}: {bookCount}</h2>
             {books.map((book) => (
                <div className="blog-preview" key={book.entryNumber}>
                    <Link to={`/books/${book.entryNumber}`}>
                        <h2>{book.title}</h2>
                        <h2>{book.titlep}</h2>
                        <h2>{book.titlec}</h2>
                        <p>Written by {book.author} {book.authorp} {book.authorc}</p>
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}
 
export default BookList;