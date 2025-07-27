import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateAgri() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [erroSubmit, setErrorSubmit] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formData, seteFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
  });

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          seteFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError('Erro ao carregar imagem (máx. 2MB por imagem)');
          setUploading(false);
        });
    } else {
      setImageUploadError('Apenas 3 imagens são permitidas');
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
        () => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
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
      e.target.type === 'textarea'
    ) {
      seteFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setErrorSubmit('Deves carregar pelo menos uma imagem');

      setLoadingSubmit(true);
      setErrorSubmit(false);

      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/agri/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        return;
      }

      navigate(`/agri/${data._id}`);
    } catch (error) {
      setErrorSubmit(error.message);
      setLoadingSubmit(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Criar Agri
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        {/* Lado Esquerdo */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Nome"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
            className="border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm"
          />

          <textarea
            placeholder="Descrição"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
            className="border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm resize-none min-h-[120px]"
          />

          <input
            type="text"
            placeholder="Endereço"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
            className="border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm"
          />
        </div>

        {/* Lado Direito */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Imagens:
            <span className="font-normal text-gray-600 ml-2 text-sm">
              A primeira imagem será usada como capa (máx. 3)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl shadow-sm w-full cursor-pointer"
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded-xl uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? 'Carregando...' : 'Carregar'}
            </button>
          </div>

          {imageUploadError && (
            <p className="text-red-700 text-sm">{imageUploadError}</p>
          )}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between items-center p-3 border border-gray-300 rounded-xl shadow-md bg-white"
              >
                <img
                  src={url}
                  alt="Imagem"
                  className="w-35 h-24 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="ml-4 px-3 py-2 text-sm bg-red-100 text-red-700 border border-red-300 rounded-lg uppercase hover:bg-red-200"
                >
                  Apagar
                </button>
              </div>
            ))}

          <button
            disabled={loadingSubmit}
            className="p-3 bg-slate-700 text-white rounded-xl uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loadingSubmit ? 'A criar...' : 'Criar Agri'}
          </button>
          {erroSubmit && <p className="text-red-700 text-sm">{erroSubmit}</p>}
        </div>
      </form>
    </main>
  );
}
