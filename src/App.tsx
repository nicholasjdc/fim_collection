import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './screen_helpers/Navbar';
import Home from './screens/Home';
import Create from './screens/Create';
import BookDetails from './screen_helpers/BookDetails';
import Search from './screens/Search';
function App() {
  
 
  return (
    <Router>
      <div className="filmCollection">
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path = "/" element ={<Home />} />
          <Route path = "/create" element ={<Create />} />
          <Route path ="/books/:id" element = {<BookDetails/>}/>
          <Route path ="/search/:queries" element = {<Search/>}/>
          <Route path ="/search" element = {<Search/>}/>
        </Routes>
      </div>
    </Router>
    
  )
}

export default App
