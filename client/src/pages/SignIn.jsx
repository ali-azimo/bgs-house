import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signIFailure
} from '../redux/user/userSlice.js';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
         credentials: 'include'
      });

      const contentType = res.headers.get('content-type');

      if (!res.ok) {
        throw new Error(`Erro HTTP ${res.status}`);
      }

      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();

        if (data.success === false) {
          dispatch(signIFailure(data.message));
          return;
        }

    // 🔐 Aqui salvas o token após login bem-sucedido
    localStorage.setItem('', data.access_token);

    // (opcional) Salva também os dados do utilizador atual
    localStorage.setItem('user', JSON.stringify(data.user));

        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        const text = await res.text();
        throw new Error(`Resposta inesperada do servidor: ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      console.error('Erro personalizado:', error.message);
      dispatch(signIFailure('Falha ao logar. Verifica os dados ou tenta mais tarde.'));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-12 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl text-center font-bold text-slate-800 mb-6">
        Entrar na Conta
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-md font-medium uppercase hover:opacity-90 transition disabled:opacity-70"
        >
          {loading ? 'A entrar...' : 'Entrar'}
        </button>

      </form>

      {error && (
        <p className="text-red-500 text-center mt-4 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
