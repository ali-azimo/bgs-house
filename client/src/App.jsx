import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Search from './pages/Search'
import Listing from './pages/Listing'
import Footer from './components/Footer'
import Team from "./pages/Team";



export default function App() {
  return (
    
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/search' element={<Search />} />
            <Route path='/team' element={<Team />} />
            <Route path='/listing/:listingId' element={<Listing />} />
            <Route element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/create-listing' element={<CreateListing/>}/> 
            <Route 
              path='/update-listing/:listingId' element={<UpdateListing/>}/> 
            </Route>
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}
