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

  const handleSearch = e => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('searchTerm', searchTerm);
    navigate(`/search?${params}`);
    setNavOpen(false);
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/auth/signout`
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const menuItems = [
    { route: '/about', label: 'Sobre' },
    { route: '/imo-home', label: 'Imobiliária' },
    { route: '/agri', label: 'Agricultura' },
    { route: '/saude', label: 'Saúde e meio ambiente' },
    { route: '/minin', label: 'Mineração' },
    { route: '/diverso', label: 'Diversos serviços' },
    { route: '/team', label: 'Equipe Técnica' },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
          <span className="hidden sm:inline text-sm text-sky-400 font-bold ml-2">
            Bule Global Solution
          </span>
        </Link>

        <nav className="hidden sm:flex gap-4 items-center">
          {menuItems.map((item, idx) => (
            <Link key={idx} to={item.route} className="hover:text-sky-400">
              {item.label}
            </Link>
          ))}
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
                onClick={() => setUserOpen(prev => !prev)}
              />
            ) : (
              <button onClick={() => setUserOpen(prev => !prev)}>
                <FaUser size={24} />
              </button>
            )}
            {userOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-20">
                {currentUser ? (
                  <>
                    <Link to="/profile" onClick={() => setUserOpen(false)} className="flex items-center px-4 py-2 hover:bg-slate-700">
                      <FaUser className="mr-2" /> Perfil
                    </Link>
                    <button onClick={() => { setUserOpen(false); handleSignout(); }} className="w-full text-left flex items-center px-4 py-2 hover:bg-slate-700 text-red-400">
                      <FaSignOutAlt className="mr-2" /> Sair
                    </button>
                  </>
                ) : (
                  <Link to="/profile" onClick={() => setUserOpen(false)} className="flex items-center px-4 py-2 hover:bg-slate-700">
                    <FaUser className="mr-2" /> Entrar
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {navOpen && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-95 z-50 flex flex-col">
          <div className="flex justify-end p-4">
            <button onClick={() => setNavOpen(false)}>
              <FaTimes size={28} />
            </button>
          </div>
          <form onSubmit={handleSearch} className="px-6 mb-8">
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
          </form>
          <nav className="flex flex-col items-center space-y-6 text-xl font-semibold mb-6">
            {menuItems.map((item, idx) => (
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
          <div className="mt-auto mb-12 flex flex-col items-center space-y-4">
            {currentUser ? (
              <>
                <Link to="/profile" onClick={() => setNavOpen(false)} className="flex items-center text-xl hover:text-sky-400">
                  <FaUser className="mr-2" /> Perfil
                </Link>
                <button onClick={() => {setNavOpen(false); handleLogout();}} className="flex items-center text-xl text-red-400 hover:text-red-500">
                  <FaSignOutAlt className="mr-2" /> Sair
                </button>
              </>
            ) : (
              <Link to="/profile" onClick={() => setNavOpen(false)} className="flex items-center text-xl hover:text-sky-400">
                <FaUser className="mr-2" /> Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
