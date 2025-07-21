import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/auth/cadastro`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Erro ao cadastrar email ou senha invalida');
      }

      setLoading(false);
      navigate('/sign-in');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 outline-blue-500 p-3 rounded-lg"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 outline-blue-500 p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 outline-blue-500 p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Já tem uma conta?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
