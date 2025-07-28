import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filPerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => setFileUploadError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData({ ...formData, avatar: url });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          credentials: 'include'
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/user/delete/${currentUser._id}`,
        { method: 'DELETE', credentials: 'include' }
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

  const handleSignOut = async () => {
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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mt-7">Perfil</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Avatar"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Erro ao carregar imagem</span>
          ) : filPerc > 0 && filPerc < 100 ? (
            <span className="text-slate-700">Carregando {filPerc}%</span>
          ) : filPerc === 100 ? (
            <span className="text-green-700">Imagem carregada</span>
          ) : (
            ''
          )}
        </p>

        <input
          type="text"
          id="username"
          placeholder="Nome de utilizador"
          className="border border-gray-300 outline-blue-500 p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border border-gray-300 outline-blue-500 p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Nova senha"
          className="border border-gray-300 outline-blue-500 p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Carregando...' : 'Atualizar'}
        </button>

        {/* Grid 1: Criar novas entradas */}
        <div className="m-auto mt-5">
          <Link to="/opcoes" className="bg-green-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95">
            Visualizar ou criar post
          </Link>
        </div>
      </form>

      {/* Ações finais */}
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">
          Apagar conta
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sair
        </span>
      </div>

      {error && <p className="text-red-700">{error}</p>}
      {updateSuccess && (
        <p className="text-green-700 self-center">Usuário atualizado com sucesso</p>
      )}
    </div>
  );
}
