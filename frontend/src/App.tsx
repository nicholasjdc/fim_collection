import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './screen_helpers/Navbar';
import Home from './screens/Home';
import Create from './screens/Create';
import BookDetails from './screen_helpers/BookDetails';
import AdvancedSearch from './screens/AdvancedSearch';
import Edit from './screens/Edit';
import Signup from './screens/Signup';
import Login from './screens/Login';
function App() {
  
 
  return (
    <Router>
      <div className="filmCollection">
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path = "/" element ={<Home />} />
          <Route path= "/edit/:id" element={<Edit />} />
          <Route path = "/create" element ={<Create />} />
          <Route path ="/books/:id" element = {<BookDetails/>}/>
          <Route path ="/search" element = {<AdvancedSearch/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />

        </Routes>
      </div>
    </Router>
    
  )
}

export default App
