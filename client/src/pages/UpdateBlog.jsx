import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [erroSubmit, setErrorSubmit] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/get/${listingId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      seteFormData(data);
      if (data.success === false) {
        console.log(data.message);
      }
    }
    fetchListing();
  }, []);

  const [formData, seteFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
  });

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        seteFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        setImageUploadError('Erro ao carregar imagem (tamanho máximo 2MB por imagem)');
        setUploading(false);
      });
    } else {
      setImageUploadError('Só é permitido carregar até 3 imagens');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Carregamento ${progress}% concluído`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downlodURL) => {
            resolve(downlodURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    seteFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea') {
      seteFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setErrorSubmit('Deves carregar pelo menos uma imagem');
      setLoadingSubmit(true);
      setErrorSubmit(false);
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoadingSubmit(false);
      if (data.success === false) {
        setErrorSubmit(data.message);
      }
      navigate(`/blog/${data._id}`);
    } catch (error) {
      setErrorSubmit(error.message);
      setLoadingSubmit(false);
    }
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-[#1F2E54]'>Atualizar Blog</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">

        {/* Lado Esquerdo */}
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type="text"
            placeholder='Nome do Imóvel'
            className='border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
        </div>
          <textarea
            placeholder='Descrição'
            className='border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm min-h-[120px] resize-none'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder='Endereço'
            className='border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />


        {/* Lado Direito */}
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold text-gray-700'>
            Imagens:
            <span className='font-normal text-gray-500 ml-2 text-sm'>
              A primeira imagem será a capa (máx. 6)
            </span>
          </p>

          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl shadow-sm w-full cursor-pointer'
              type="file"
              id='images'
              accept='image/*'
              multiple
            />
            <button
              disabled={uploading}
              type='button'
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded-xl uppercase hover:shadow-lg disabled:opacity-80 hover:bg-green-50 transition-colors'
            >
              {uploading ? 'Carregando...' : 'Carregar'}
            </button>
          </div>

          {imageUploadError && (
            <p className='text-red-600 text-sm'>{imageUploadError}</p>
          )}

          {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
            <div
              key={url}
              className='flex justify-between p-3 items-center border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition'
            >
              <img
                src={url}
                alt='Imagem do imóvel'
                className='w-20 h-20 object-cover rounded-lg'
              />
              <button
                type='button'
                onClick={() => handleRemoveImage(index)}
                className='p-2 text-red-700 bg-red-50 border border-red-100 rounded-lg uppercase hover:bg-red-100 transition-colors text-sm'
              >
                Apagar
              </button>
            </div>
          ))}

          <button
            disabled={loadingSubmit}
            className='p-3 bg-[#1F2E54] text-white rounded-xl uppercase hover:bg-[#2c3e6e] transition-colors disabled:opacity-80 shadow-md hover:shadow-lg'
          >
            {loadingSubmit ? 'Atualizando...' : 'Atualizar Blog'}
          </button>
          {erroSubmit && <p className='text-red-600 text-sm'>{erroSubmit}</p>}
        </div>
      </form>
    </main>
  )
}