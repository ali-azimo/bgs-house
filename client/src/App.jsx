import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import CreateAgri from './pages/CreateAgri';
import UpdateListing from './pages/UpdateListing';
import UpdateAgri from './pages/UpdateAgri';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Team from './pages/Team';
import SignIn from './pages/SignIn';
import Footer from './components/Footer'
import ShowListing from './pages/ShowListing';
import ShowAgri from './pages/ShowAgri';
import Agri from "./pages/Agri";
import AgriHome from './pages/AgriHome';
import Service from './pages/Service';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agri" element={<AgriHome />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/team" element={<Team />} />
          <Route path="/imog/:imoId" element={<Listing />} />
          <Route path="/agri/:agriId" element={<Agri />} />
          <Route path="/service" element={<Service />} />
          <Route element={<PrivateRoute />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing />}/>
            <Route path="show-listing" element={<ShowListing />}/>
            <Route path="show-agri" element={<ShowAgri />}/>
            <Route path="/create-agri" element={<CreateAgri />} />
            <Route path="/update-agri/:agriId" element={<UpdateAgri />}/>
          </Route>
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
