import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './screen_helpers/Navbar';
import Home from './screens/Home';
import Create from './screens/Create';
import BookDetails from './screens/BookDetails';
import AdvancedSearch from './screens/AdvancedSearch';
import Edit from './screens/Edit';
import Signup from './screens/Signup';
import Login from './screens/Login';
import { useAuthContext } from './hooks/useAuthContext';
function App() {
  
 const {user} = useAuthContext()
  return (
    <Router>
      <div className="filmCollection">
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path = "/" element ={user ?<Home />: <Navigate to ='/login'/>} />
          <Route path= "/edit/:id" element={<Edit />} />
          <Route path = "/create" element ={<Create />} />
          <Route path ="/books/:id" element = {<BookDetails/>}/>
          <Route path ="/search" element = {<AdvancedSearch/>}/>
          <Route path="/login" element={user ? <Navigate to = "/"/>: <Login/>} />
          <Route path="/signup" element={user ? <Navigate to = "/"/>:<Signup/>} />

        </Routes>
      </div>
    </Router>
    
  )
}

export default App
