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
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="hidden sm:inline text-sm text-sky-400 font-bold ml-2">
            Bule Global Solution
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden sm:flex gap-4 items-center">
          <Link to="/about" className="hover:text-sky-400">Sobre</Link>
          <Link to="/imo-home" className="hover:text-sky-400">Imo & Investiment</Link>
          <Link to="/agri" className="hover:text-sky-400">Agro‑Pecuária</Link>
          <Link to="/saude" className="hover:text-sky-400">Saúde</Link>
          <Link to="/minin" className="hover:text-sky-400">Mineração</Link>
          <Link to="/diver" className="hover:text-sky-400">Serviços diversos</Link>
          <Link to="/team" className="hover:text-sky-400">Contacto</Link>

          {/* search input desktop */}
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

        {/* mobile right icons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setNavOpen(true)} className="sm:hidden text-white">
            <FaBars size={24} />
          </button>

          <div className="relative">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="Perfil"
                className="h-8 w-8 rounded-full cursor-pointer border border-slate-300"
                onClick={() => setUserOpen(open => !open)}
              />
            ) : (
              <button onClick={() => setUserOpen(open => !open)}>
                <FaUser size={24} />
              </button>
            )}
            {userOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-20">
                {currentUser
                  ? <>
                      <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-slate-700">
                        <FaUser className="mr-2" /> Perfil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 hover:bg-slate-700 text-red-400"
                      >
                        <FaSignOutAlt className="mr-2" /> Sair
                      </button>
                    </>
                  : (
                      <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-slate-700">
                        <FaUser className="mr-2" /> Entrar
                      </Link>
                    )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile full-screen menu */}
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
            {['/about','/imo-home','/agricultura','/saude','/minin','/diverso','/team'].map((path, idx) => (
              <Link key={idx} to={path}
                onClick={() => setNavOpen(false)}
                className="text-white hover:text-sky-400"
              >
                {path.slice(1).replace('-', ' ')}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
