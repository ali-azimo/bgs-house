import React, { useState } from 'react';
import { FaBars, FaTimes, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signOutUserStart,
  deleteUserFailure,
  deleteUserSuccess
} from '../redux/user/userSlice';
import logo from '../assets/img/logo.png';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('searchTerm', searchTerm);
    navigate(`/search?${params.toString()}`);
    setNavOpen(false);
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/auth/signout`);
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message)); return;
      }
      dispatch(deleteUserSuccess(data));
      localStorage.removeItem('token');
      navigate('/sign-in');
    } catch(err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  return (
   <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
  <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
    <Link to="/" className="flex items-center">
      <img src={logo} alt="Logo" className="h-20 w-auto" />
      <span className="hidden sm:inline text-sm text-sky-400 font-bold ml-2">
        Bule Global Solution
      </span>
    </Link>

    {/* menu desktop */}
    <nav className="hidden sm:flex gap-4 items-center">
      {[
        { route: '/about', label: 'Sobre' },
        { route: '/imo-home', label: 'Imobiliária' },
        { route: '/agri', label: 'Agricultura' },
        { route: '/saude', label: 'Saúde e meio ambiente' },
        { route: '/minin', label: 'Mineração' },
        { route: '/diverso', label: 'Diversos serviços' },
        { route: '/team', label: 'Equipe Técnica' },
      ].map((item, idx) => (
        <Link key={idx} to={item.route} className="hover:text-sky-400">
          {item.label}
        </Link>
      ))}

      {/* campo de busca desktop */}
      <form onSubmit={handleSearch} className="flex items-center border rounded-md px-3 py-1.5 bg-slate-800 border-slate-700">
        <input
          type="text"
          placeholder="Buscar imóveis..."
          className="bg-transparent outline-none w-64 text-sm placeholder:text-slate-400"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="ml-2 text-sky-400 hover:text-sky-300">
          <FaSearch />
        </button>
      </form>
    </nav>

    {/* ícones mobile e usuário */}
    <div className="flex items-center gap-4">
      <button onClick={() => setNavOpen(true)} className="sm:hidden text-white">
        <FaBars size={24} />
      </button>
      ...
    </div>
  </div>

  {/* menu full-screen mobile */}
  {navOpen && (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-95 z-50 flex flex-col">
      <div className="flex justify-end p-4">
        <button onClick={() => setNavOpen(false)}>
          <FaTimes size={28} />
        </button>
      </div>
      <form onSubmit={handleSearch} className="px-6 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar imóveis..."
            className="w-full bg-slate-800 text-white placeholder:text-slate-400 text-lg px-4 py-3 rounded-md"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white">
            <FaSearch size={20} />
          </button>
        </div>
      </form>

      <nav className="flex flex-col items-center space-y-6 text-xl font-semibold">
        {[
          { route: '/about', label: 'Sobre' },
          { route: '/imo-home', label: 'Imobiliária' },
          { route: '/agri', label: 'Agricultura' },
          { route: '/saude', label: 'Saúde e meio ambiente' },
          { route: '/minin', label: 'Mineração' },
          { route: '/diverso', label: 'Diversos serviços' },
          { route: '/team', label: 'Equipe Técnica' },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.route}
            onClick={() => setNavOpen(false)}
            className="text-white hover:text-sky-400"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )}
</header>

  );
}
