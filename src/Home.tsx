import BookList from "./BookList";
import useGetEntries from "./useGetEntries";

const Home = () => {
    //grab data but rename it blogs
    const {data: books, isPending, error} = useGetEntries();

   
    //function runs every re-render
    //changing state withing useEffect can recurse infinitely 
    
    return (  
        <div className="home">
            {error && <div>{error}</div>}
            { isPending && <div>Loading...</div>}
            {/*Make sure blogs exists when loading*/ }
          {books && <BookList books = {books} title="All Entries" />} 
          
        </div>
    );
}
 
export default Home;