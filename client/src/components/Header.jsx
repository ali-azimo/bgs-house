import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import logo from '../assets/img/logo.png';

export default function Header() {
    const {currentUser} = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    //pesquisar
    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
   
  return (
    <header className='bg-white shadow-md border-b border-slate-200 sticky top-0 z-50'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
           <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex-wrap cursor-pointer'>
                    <img src={logo} alt="logo" className='w-25 h-25 object-cover'/>
                </h1>
           </Link>
            <form 
                onSubmit={handleSubmit}
                 className='border border-slate-200 p-2 rounded-lg flex items-center cursor-pointer'>
                <input type="text" placeholder='Pesquise...' className='bg-transparent focus:outline-none w-24 sm:w-84' 
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <button>
                <FaSearch className='text-slate-600'/> 
                </button>
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Sobre</li>
                </Link>
                <Link to='/team'>
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Contacto</li>
                </Link>
                <Link to='/profile'>
                    {currentUser ?(
                        <img className='rounded-full h-7 object-cover' src={currentUser.avatar} alt='profile'/>
                    ):(
                        <li className='sm:inline text-slate-700 hover:underline cursor-pointer'>Sign in</li>
                    )}
                </Link>
            </ul>
        </div>
    </header>
  )
}