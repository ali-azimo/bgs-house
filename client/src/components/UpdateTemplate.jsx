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

export default function UpdateTemplate({ type }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [erroSubmit, setErrorSubmit] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const params = useParams();

  const [formData, seteFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedroom: 1,
    bathroom: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    finished: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const id = params[`${type}Id`];
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/${type}/get/${id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      seteFormData(data);
      if (data.success === false) console.log(data.message);
    };
    fetchData();
  }, [params, type]);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = files.map(file => storeImage(file));
      Promise.all(promises).then((urls) => {
        seteFormData(prev => ({ ...prev, imageUrls: prev.imageUrls.concat(urls) }));
        setUploading(false);
      }).catch(() => {
        setImageUploadError('Erro ao carregar imagem (máx. 2MB por imagem)');
        setUploading(false);
      });
    } else {
      setImageUploadError('Máximo de 6 imagens permitido');
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', null, reject, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve);
      });
    });
  };

  const handleRemoveImage = (index) => {
    seteFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, checked, type: inputType } = e.target;
    if (id === 'sale' || id === 'rent') {
      seteFormData(prev => ({ ...prev, type: id }));
    } else if (['parking', 'finished', 'offer'].includes(id)) {
      seteFormData(prev => ({ ...prev, [id]: checked }));
    } else if (['number', 'text', 'textarea'].includes(inputType)) {
      seteFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) return setErrorSubmit('Carrega pelo menos uma imagem');
    if (+formData.regularPrice < +formData.discountPrice) return setErrorSubmit("Desconto não pode ser maior que o preço normal");

    try {
      setLoadingSubmit(true);
      const id = params[`${type}Id`];
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/${type}/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoadingSubmit(false);
      if (data.success === false) return setErrorSubmit(data.message);
      navigate(`/${type}/${data._id}`);
    } catch (error) {
      setErrorSubmit(error.message);
      setLoadingSubmit(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-[#1F2E54]'>Atualizar {type.charAt(0).toUpperCase() + type.slice(1)}</h1>

        {/* Aqui insira o mesmo formulário do UpdateImo.jsx reaproveitado */}
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
        </div>

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
                 onChange={(e) => setFiles(Array.from(e.target.files))}
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
                    Remover
                </button>
                </div>
            ))}

            <button
                disabled={loadingSubmit}
                className='p-3 bg-[#1F2E54] text-white rounded-xl uppercase hover:bg-[#2c3e6e] transition-colors disabled:opacity-80 shadow-md hover:shadow-lg'
            >
                {loadingSubmit ? 'Atualizando...' : 'Atualizar Imóvel'}
            </button>
            {erroSubmit && <p className='text-red-600 text-sm'>{erroSubmit}</p>}
            </div>
        </form>
    </main>
  );
}
