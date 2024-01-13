import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './screen_helpers/Navbar';
import Home from './screens/Home';
import Create from './screens/Create';
import BookDetails from './screen_helpers/BookDetails';
import AdvancedSearch from './screens/AdvancedSearch';
function App() {
  
 
  return (
    <Router>
      <div className="filmCollection">
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path = "/" element ={<Home />} />
          <Route path = "/:id" element ={<Home />} />
          <Route path = "/create" element ={<Create />} />
          <Route path ="/books/:id" element = {<BookDetails/>}/>
          <Route path ="/search" element = {<AdvancedSearch/>}/>
        </Routes>
      </div>
    </Router>
    
  )
}

export default App
