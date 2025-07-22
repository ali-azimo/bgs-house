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
    type: "rent",
    bedroom: 1,
    bathroom: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    finished: false,
  });

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
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
      setImageUploadError('Só é permitido carregar até 6 imagens');
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
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      seteFormData({
        ...formData,
        type: e.target.id
      });
    };
    if (e.target.id === 'parking' || e.target.id === 'finished' || e.target.id === 'offer') {
      seteFormData({
        ...formData,
        [e.target.id]: e.target.checked
      });
    }

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
      if (+formData.regularPrice < +formData.discountPrice) return setErrorSubmit("O preço com desconto deve ser menor que o preço normal");
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
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setErrorSubmit(error.message);
      setLoadingSubmit(false);
    }
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-[#1F2E54]'>Atualizar Imóvel</h1>

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

          {/* Checkboxes */}
          <div className='flex gap-6 flex-wrap'>
            {[
              { id: 'sale', label: 'Venda', checked: formData.type === 'sale' },
              { id: 'rent', label: 'Arrendamento', checked: formData.type === 'rent' },
              { id: 'parking', label: 'Parqueamento', checked: formData.parking },
              { id: 'finished', label: 'Acabado', checked: formData.finished },
              { id: 'offer', label: 'Promoção', checked: formData.offer },
            ].map(({ id, label, checked }) => (
              <div key={id} className='flex gap-2 items-center'>
                <input
                  type="checkbox"
                  id={id}
                  className='w-5 h-5 accent-[#1F2E54]'
                  onChange={handleChange}
                  checked={checked}
                />
                <span className='text-gray-700'>{label}</span>
              </div>
            ))}
          </div>

          {/* Inputs Numéricos */}
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type="number"
                id='bedroom'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl shadow-sm w-24'
                onChange={handleChange}
                value={formData.bedroom}
              />
              <span className='text-gray-700'>Quartos</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type="number"
                id='bathroom'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl shadow-sm w-24'
                onChange={handleChange}
                value={formData.bathroom}
              />
              <span className='text-gray-700'>Casas de Banho</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type="number"
                id='regularPrice'
                min='50'
                max='1000000'
                required
                className='p-3 border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl shadow-sm w-36'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-start'>
                <p className='text-gray-700'>Preço normal</p>
                <span className='text-xs text-gray-500'>(MZN / mês)</span>
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type="number"
                  id='discountPrice'
                  min='0'
                  max='1000000'
                  required
                  className='p-3 border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl shadow-sm w-36'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-start'>
                  <p className='text-gray-700'>Preço com desconto</p>
                  <span className='text-xs text-gray-500'>(MZN / mês)</span>
                </div>
              </div>
            )}
          </div>
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
  )
}