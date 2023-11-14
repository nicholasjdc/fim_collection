import BookList from "./BookList";
import useGetEntries from "./useGetEntries";

const Home = () => {
    console.log('reached home')
    //grab data but rename it blogs
    const {data: books, isPending, error} = useGetEntries();

   
    //function runs every re-render
    //changing state withing useEffect can recurse infinitely 
    
    return (  
        <div className="home">
            {error && <div>{error}</div>}
            { isPending && <div>Loading...</div>}
            {/*Make sure blogs exists when loading*/ }
          {books && <BookList books = {books} title="All Books" />} 
          
        </div>
    );
}
 
export default Home;