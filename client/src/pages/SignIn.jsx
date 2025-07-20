import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signIFailure
} from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

export default function SignUp() {
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
      const res = await fetch('/api/auth/singin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signIFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signIFailure(error.message));
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

        <OAuth />
      </form>

      <div className="text-center mt-4">
        <Link to="/forgot-password">
          <span className="text-blue-700 font-medium underline text-sm hover:text-blue-800 transition">
            Esqueceu a senha?
          </span>
        </Link>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6 text-sm">
        <p className="text-gray-600">Não tem uma conta?</p>
        <Link to="/sign-up">
          <span className="text-blue-700 font-semibold hover:text-blue-800 transition">
            Criar conta
          </span>
        </Link>
      </div>

      {error && (
        <p className="text-red-500 text-center mt-4 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
