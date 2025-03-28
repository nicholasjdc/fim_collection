import { Link } from "react-router-dom";
import { BookEntry } from "./BookEntry";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../hooks/useAuthContext";
interface BookListProps {
    books: BookEntry[];
    title: string;
    bookCount: number;
}
const BookList: React.FC<BookListProps> = ({books, title, bookCount}) => {
    const {user} = useAuthContext()
    const {t} = useTranslation()
    return (  
        <div className="blog-list">
            <h2>{title}{user.userType=="Admin" && <div>: {bookCount}</div> }</h2>
             {books.map((book) => (
                <div className="blog-preview" key={book.id} id={book.id}>
                    <Link to={`/books/${book.id}`}>
                        <h2>{book.title}</h2>
                        <h2>{book.titlep}</h2>
                        <h2>{book.titlec}</h2>
                        <p>{t("written-by")} {book.author} {book.authorp} {book.authorc}</p>
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}
 
export default BookList;