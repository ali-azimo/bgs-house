import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import Createblog from './pages/CreateBlog';
import UpdateListing from './pages/UpdateListing';
import UpdateBlog from './pages/UpdateBlog';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Team from './pages/Team';
import SignIn from './pages/SignIn';
import Footer from './components/Footer'
import ShowListing from './pages/ShowListing';
import ShowBlog from './pages/ShowBlog';
import Blog from "./pages/Blog";
import BlogHome from './pages/BlogHome';
import Service from './pages/Service';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/team" element={<Team />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/blog/:blogId" element={<Blog />} />
          <Route path="/service" element={<Service />} />
          <Route element={<PrivateRoute />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing />}/>
            <Route path="show-listing" element={<ShowListing />}/>
            <Route path="show-blog" element={<ShowBlog />}/>
            <Route path="/create-blog" element={<Createblog />} />
            <Route path="/update-blog/:blogId" element={<UpdateBlog />}/>
          </Route>
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
