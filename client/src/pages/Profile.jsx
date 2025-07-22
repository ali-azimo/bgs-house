import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState('');
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [showListingError, setShowListingError] = useState('');
  const [userListing, setUserListing] = useState([]);
  const [deleteError, setDeleteError] = useState('');
  const [signOutError, setSignOutError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed', // CORRIGIDO: 'storage_changed' → 'state_changed'
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError('Falha no upload da imagem. Por favor, tente novamente.');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
          setFileUploadError('');
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateError('');
    setUpdateSuccess(false);
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setUpdateError(data.message || 'Não foi possível atualizar o perfil.');
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      setUpdateError('Ocorreu um erro inesperado ao atualizar o perfil.');
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setDeleteError('');
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/user/delete/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setDeleteError(data.message || 'Falha ao apagar o utilizador.');
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      setDeleteError('Erro ao tentar apagar o utilizador.');
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    setSignOutError('');
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        setSignOutError(data.message || 'Falha ao sair da conta.');
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      setSignOutError('Erro ao tentar sair da conta.');
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    setShowListingError('');
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/user/listing/${currentUser._id}`
      );
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(data.message || 'Não foi possível carregar as listagens.');
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError('Erro ao carregar as listagens do utilizador.');
    }
  };

  const handleListingDelete = async (listingId) => {
    setDeleteError('');
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/delete/${listingId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setDeleteError(data.message || 'Falha ao apagar a listagem.');
        return;
      }
      setUserListing((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      setDeleteError('Erro ao tentar apagar a listagem.');
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center mt-7' >Perfil</h1>


      <form onSubmit={handleSubmit}
      className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" 
        ref={fileRef} 
        hidden 
        accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} 
        src={formData.avatar || currentUser.avatar} 
        alt='Profile' 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 bg-cover bg-center'/>

<p className='text-sm self-center'>
  {fileUploadError ? (
    <span className='text-red-700'>Erro ao carregar imagem, escolha uma imagem valida</span>
  ) : filPerc > 0 && filPerc < 100 ? (
    <span className='text-slate-700'>{`Carregando ${filPerc}%`}</span>
  ) : filPerc === 100 ? (
    <span className='text-green-700'>Carregado com sucesso</span>
  ) : (
  ""
)}
</p>
        <input type="text" 
        name="username" 
        id="username" 
        placeholder='username' 
        className='border border-gray-300 outline-blue-500 p-3 rounded-lg'
        defaultValue={currentUser.username}
        onChange={handleChange}/>

        <input 
        type="emai" 
        name="email" 
        id="email" 
        placeholder='email' 
        className='border border-gray-300 outline-blue-500 p-3 rounded-lg'
        defaultValue={currentUser.email}
        onChange={handleChange}/>

        <input 
        type="password" 
        name="password" 
        id="password" 
        placeholder='password' 
        className='border border-gray-300 outline-blue-500 p-3 rounded-lg'
        onChange={handleChange}/>


        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Carregando...' : "Atualizar"}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95'
        to={'/create-listing'}>
        Criar 
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser}
        className='text-red-700 cursor-pointer'>Apagar conta</span>
        <span onClick={handleSignOut}
         className='text-red-700 cursor-pointer'>Sair</span>
      </div>
      <p className='text-red-700'>
        {error?error:""}
      </p>
      <span className='text-green-700 self-center'>
        {updateSuccess ? 'Usuario atualizado com sucesso' : ""}
      </span>
      
      <button onClick={handleShowListing} className='text-green-700 w-full'>Mostar listagem</button>
      <p className='text-red-700 mt-5'>{showListintError ? 'Error showing listing' : ""}</p>



      {
        userListng &&
          userListng.length > 0 &&
          <div className='flex flex-col gap-4'>
            <h1 className='text-center text-2xl font-semibold'>Meus produtos</h1>
            {userListng.map((listing)=>(
            <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center mt-5 gap-4'>
                <Link to={`/listing/${listing._id}`}>
                  <img
                   src={listing.imageUrls[0]}
                    alt='listing image'
                    className='h-16 w-20 object-cover'
                  />
                </Link>
                <Link to={`listing/${listing._id}`} className='flex-1 text-slate-700 font-semibold hover:underline truncate'>
                <p>{listing.name}</p>
                </Link>

                <div className='flex flex-col items-center'>
                  <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Apagar</button>

                  <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Editar</button>
                  </Link>
                </div>
            </div>
          ))}
          </div>
      }
    </div>
  )
}