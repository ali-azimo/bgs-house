import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function Signin() {

  //Segurar os dados do formulário
  //Usar o useState para armazenar os dados do formulário
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate =useNavigate();

  const handleChange = (e) =>{
      setFormData({
        ...formData,
        [e.target.id]:e.target.value,
    });
  };

  //Enviar os dados do formulário para o servidor
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch('/api/cad/signin',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success===false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null)
      navigate('/');
    }catch(error){
      setLoading(false);
      setError(error.message)
    }
  };

  return (
     <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Logar </h1>

        <form onSubmit={handleSubmit}
          className='flex flex-col gap-4'>

            <input type="email" placeholder='email' className='border border-gray-300 outline-blue-500 p-3 rounded-lg' id='email' 
                onChange={handleChange}
            />
            <input type="password" placeholder='password' className='border border-gray-300 outline-blue-500 p-3 rounded-lg' id='password'
                onChange={handleChange}
            />

          <button disabled={loading} 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
           {loading ? 'Logando...': 'Logar'}
          </button>

        <OAuth/>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
          <Link to={"/sign-up"}>
          <span className="text-blue-700">Sing In</span>
          </Link>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
    </div>
        
  )
}
