import { FaSearch, FaMoon, FaSun, FaSignOutAlt, FaUser } from 'react-icons/fa';
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
  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef();

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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`${
        darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'
      } shadow-md sticky top-0 z-50 transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          <span className="font-bold text-xl hidden sm:inline">
            BGS Imobiliária
          </span>
        </Link>

        {/* PESQUISA */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center border rounded-md px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-sky-500"
        >
          <input
            type="text"
            placeholder="Buscar imóveis..."
            className="bg-transparent outline-none w-32 sm:w-64 text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 text-sky-600 dark:text-sky-400 hover:text-sky-800"
          >
            <FaSearch />
          </button>
        </form>

        {/* NAV */}
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-sky-600 hidden sm:inline">
            Início
          </Link>
          <Link to="/about" className="hover:text-sky-600 hidden sm:inline">
            Sobre
          </Link>
          <Link to="/team" className="hover:text-sky-600 hidden sm:inline">
            Contacto
          </Link>
          <Link to="/blog" className="hover:text-sky-600 hidden sm:inline">
            Blog
          </Link>

          {/* MODO ESCURO */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl hover:text-yellow-500"
            title="Alternar modo"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* PERFIL */}
          <div className="relative" ref={dropdownRef}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="Perfil"
                className="h-8 w-8 rounded-full object-cover border border-slate-300 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            ) : (
              <Link to="/profile" className="hover:text-sky-600">
                Entrar
              </Link>
            )}

            {/* DROPDOWN */}
            {showDropdown && currentUser && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-10">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <FaUser className="mr-2" /> Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-red-600 dark:text-red-400"
                >
                  <FaSignOutAlt className="mr-2" /> Sair
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
