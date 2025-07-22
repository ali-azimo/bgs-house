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

export default function AtualizarImovel() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [imagemErro, setImagemErro] = useState(false);
  const [carregandoImagem, setCarregandoImagem] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(false);
  const [carregandoEnvio, setCarregandoEnvio] = useState(false);
  const params = useParams();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedroom: 1,
    bathroom: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    finished: false,
  });

  useEffect(() => {
    const buscarImovel = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) return console.log(data.message);
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    buscarImovel();
  }, [params.listingId]);

  const armazenarImagem = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const nomeArquivo = new Date().getTime() + file.name;
      const storageRef = ref(storage, nomeArquivo);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progresso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload: ${progresso.toFixed(0)}%`);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve);
        }
      );
    });
  };

  const enviarImagens = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      setCarregandoImagem(true);
      setImagemErro(false);

      const promessas = files.map((file) => armazenarImagem(file));

      Promise.all(promessas)
        .then((urls) => {
          setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...urls] }));
          setCarregandoImagem(false);
        })
        .catch(() => {
          setImagemErro('Erro ao carregar imagens (máx. 2MB por imagem)');
          setCarregandoImagem(false);
        });
    } else {
      setImagemErro('Máximo de 6 imagens por anúncio');
    }
  };

  const removerImagem = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const aoMudar = (e) => {
    const { id, value, checked, type } = e.target;

    if (id === 'sale' || id === 'rent') {
      setFormData((prev) => ({ ...prev, type: id }));
    } else if (['parking', 'finished', 'offer'].includes(id)) {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) return setErroEnvio('Adicione pelo menos uma imagem');
    if (+formData.regularPrice < +formData.discountPrice) return setErroEnvio('Preço com desconto deve ser menor');

    try {
      setCarregandoEnvio(true);
      setErroEnvio(false);

      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/update/${params.listingId}`, { 
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
        });

      const data = await res.json();
      setCarregandoEnvio(false);
      if (data.success === false) return setErroEnvio(data.message);

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setErroEnvio(error.message);
      setCarregandoEnvio(false);
    }
  };

  return (
    <main className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-6'>Atualizar Imóvel</h1>
      {/* ... aqui segue o mesmo JSX adaptado com os nomes em português e boas práticas ... */}
    </main>
  );
}
