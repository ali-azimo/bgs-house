import { FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  signOutUserStart,
  deleteUserFailure,
  deleteUserSuccess
} from '../redux/user/userSlice';
import logo from '../assets/img/logo.png';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/auth/signout`);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/about', label: 'Sobre' },
    { path: '/imo-home', label: 'Imo & Investiment' },
    { path: '/agri', label: 'Agro-Pecuária' },
    { path: '/saude', label: 'Saúde' },
    { path: '/minin', label: 'Mineração' },
    { path: '/diver', label: 'Serviços diversos' },
    { path: '/team', label: 'Contacto' },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Menu Mobile Button */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-20 w-auto" />
            </Link>
            
            {/* Links de Navegação (Desktop) */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="hover:text-sky-400 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Barra de Pesquisa e Conta do Usuário */}
          <div className="flex items-center gap-4">
            {/* Barra de Pesquisa (Desktop) */}
            <form
              onSubmit={handleSubmit}
              className="hidden md:flex items-center border rounded-lg px-4 py-2 bg-slate-800 border-slate-700 focus-within:ring-2 focus-within:ring-sky-500"
            >
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent outline-none w-64 text-sm placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="text-sky-400 hover:text-sky-300 ml-2">
                <FaSearch size={16} />
              </button>
            </form>

            {/* Ícone do Menu Mobile */}
            <button 
              className="md:hidden text-white hover:text-sky-400"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Ícone do Usuário */}
            <div className="relative" ref={menuRef}>
              {currentUser ? (
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2"
                >
                  <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center border border-sky-500">
                    <FaUser size={16} />
                  </div>
                </button>
              ) : (
                <Link to="/sign-in" className="flex items-center gap-2 hover:text-sky-400">
                  <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center">
                    <FaUser size={16} />
                  </div>
                </Link>
              )}

              {/* Dropdown do Usuário */}
              {showUserDropdown && currentUser && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 overflow-hidden">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-slate-700 transition-colors"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-700 text-red-400 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-800">
            {/* Barra de Pesquisa Mobile */}
            <form onSubmit={handleSubmit} className="flex items-center mb-6">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-slate-800 rounded-lg px-4 py-2 outline-none w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="ml-2 text-sky-400">
                <FaSearch size={16} />
              </button>
            </form>

            {/* Links de Navegação Mobile */}
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="py-2 hover:text-sky-400"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}