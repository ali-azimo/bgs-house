import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  signOutUserStart,
  deleteUserFailure,
  deleteUserSuccess
} from '../redux/user/userSlice';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/auth/signout`);
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      localStorage.removeItem('token'); // limpa token do localStorage
      navigate('/login'); // redireciona para login
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div
      onClick={handleSignOut}
      className="text-red-700 cursor-pointer hover:underline"
    >
      Terminar Sessão
    </div>
  );
}
