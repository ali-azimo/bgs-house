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
    if (!searchTerm.trim()) return;
    
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
      localStorage.removeItem('token');
      navigate('/sign-in');
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
    { route: '/diver', label: 'Diversos serviços' },
    { route: '/team', label: 'Equipe Técnica' },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex  items-center gap-6">
          <Link to="/" className="flex flex-col">
            <img src={logo} alt="Logo" className="h-23 w-auto" />
            <span className="hidden sm:inline text-sm uppercase text-sky-400 font-bold ml-2">
              Bule Global Solution
            </span>
          </Link>

          {/* Links de navegação - Desktop */}
          <nav className="hidden sm:flex gap-4 items-center">
            {menuItems.map((item, idx) => (
              <Link 
                key={idx} 
                to={item.route} 
                className="hover:text-sky-400 text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Botão menu mobile */}
          <button 
            onClick={() => setNavOpen(true)} 
            className="sm:hidden text-white hover:text-sky-400"
            aria-label="Abrir menu"
          >
            <FaBars size={20} />
          </button>

          {/* Ícone do usuário */}
          <div className="relative">
            {currentUser ? (
              <div 
                onClick={() => setUserOpen(!userOpen)}
                className="cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt="Perfil"
                  className="h-8 w-8 rounded-full border border-sky-500"
                />
              </div>
            ) : (
              <button 
                onClick={() => setUserOpen(!userOpen)}
                className="text-white hover:text-sky-400"
                aria-label="Menu do usuário"
              >
                <FaUser size={20} />
              </button>
            )}

            {/* Dropdown do usuário */}
            {userOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-20">
                {currentUser ? (
                  <>
                    <Link 
                      to="/profile" 
                      onClick={() => setUserOpen(false)}
                      className="flex items-center px-4 py-2 hover:bg-slate-700"
                    >
                      <FaUser className="mr-2" /> Perfil
                    </Link>
                    <button 
                      onClick={() => { 
                        setUserOpen(false); 
                        handleSignout(); 
                      }}
                      className="w-full text-left flex items-center px-4 py-2 hover:bg-slate-700 text-red-400"
                    >
                      <FaSignOutAlt className="mr-2" /> Sair
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/sign-in" 
                    onClick={() => setUserOpen(false)}
                    className="flex items-center px-4 py-2 hover:bg-slate-700"
                  >
                    <FaUser className="mr-2" /> Entrar
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {navOpen && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-95 z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-slate-800">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <button 
              onClick={() => setNavOpen(false)}
              className="text-white hover:text-sky-400"
              aria-label="Fechar menu"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Campo de busca - Só aparece no mobile */}
          <form 
            onSubmit={handleSearch}
            className="px-6 py-4 border-b border-slate-800 relative"
          >
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-slate-800 text-white placeholder:text-slate-400 px-4 py-2 rounded-md"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-sky-400"
              disabled={!searchTerm.trim()}
            >
              <FaSearch size={18} />
            </button>
          </form>

          {/* Links de navegação - Mobile */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-4">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.route}
                    onClick={() => setNavOpen(false)}
                    className="block py-2 hover:text-sky-400 text-lg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Seção do usuário - Mobile */}
          <div className="p-6 border-t border-slate-800">
            {currentUser ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={() => setNavOpen(false)}
                  className="flex items-center py-2 hover:text-sky-400"
                >
                  <FaUser className="mr-2" /> Perfil
                </Link>
                <button 
                  onClick={() => {
                    setNavOpen(false);
                    handleSignout();
                  }}
                  className="flex items-center py-2 text-red-400 hover:text-red-300"
                >
                  <FaSignOutAlt className="mr-2" /> Sair
                </button>
              </>
            ) : (
              <Link 
                to="/sign-in" 
                onClick={() => setNavOpen(false)}
                className="flex items-center py-2 hover:text-sky-400"
              >
                <FaUser className="mr-2" /> Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}