import { useEffect, useState } from 'react';
import{
    getDownloadURL, 
    getStorage, 
    ref, 
    uploadBytesResumable
} from 'firebase/storage';
import {app} from '../firebase';
import {useSelector}from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom';

export default function CreateListing() {
    const Navigate = useNavigate();
    const {currentUser} = useSelector((state)=>state.user);
    const [files, setFiles] = useState([]); 
    
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [erroSubmit, setErrorSubmit] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const params = useParams();

    useEffect(()=>{
        const fetchListing = async()=>{
            const listingId = params.listingId;
            const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/get/${listingId}`,{
              credentials: 'include',
            });
            const data = await res.json();
            seteFormData(data);
            if(data.success ===false){
                console.log(data.message);
            }
        }
        fetchListing();
    },[]);

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


    const handleImageSubmit = (e) =>{
        if(files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for(let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls)=>{
                seteFormData({
                    ... formData, 
                    imageUrls: formData.imageUrls.concat(urls),
                });
                setImageUploadError(false);
                setUploading(false);
            }).catch((err) =>{
                setImageUploadError('Erro ao carregar imagem (máx. 2MB por imagem)');
                    setUploading(false);
            });
        }else{
            setImageUploadError('Apenas 6 imagens são permitidas');
                setUploading(false);
        }
    };
    const storeImage = async (file) =>{
        return new Promise((resolve, reject) =>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`O carregamento está ${progress}% concluído`);
                },
                (error) => {
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downlodURL) => {
                        resolve(downlodURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) =>{
        seteFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i)=> i !== index),
        });
    };
    const handChange = (e) =>{
        if(e.target.id === 'sale' || e.target.id === 'rent'){
            seteFormData({
                ...formData,
                type: e.target.id
            });
        };
        if(e.target.id === 'parking' || e.target.id === 'finished' || e.target.id === 'offer'){
            seteFormData({
                ...formData,
                [e.target.id]: e.target.checked
            });
        }

        if(
            e.target.type === 'number' || 
            e.target.type === 'text' || 
            e.target.type === 'textarea')
            {
            seteFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(formData.imageUrls.length < 1) return setErrorSubmit('Deves carregar pelo menos uma imagem');
            if(+formData.regularPrice < +formData.discountPrice) return setErrorSubmit("O preço regular não pode ser menor que o preço com desconto");
            setLoadingSubmit(true);
            setErrorSubmit(false);
            const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/update/${params.listingId}`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    credentials: 'include',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoadingSubmit(false);
            if(data.success === false){
                setErrorSubmit(data.message);
            }
            Navigate(`/listing/${data._id}`);
        }catch(error){
            setErrorSubmit(error.message);
            setLoadingSubmit(false);
        }
    }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Atualizar o imovel</h1>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className='flex flex-col gap-4 flex-1'>
                    <input 
                        type="text" 
                        placeholder='Nome do imóvel' 
                        id='name' 
                        maxLength='62' 
                        minLength='10' 
                        required
                        onChange={handChange}
                        value={formData.name}
                        className='border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm'
                    />

                    <textarea
                        type="textarea" 
                        placeholder='Description' 
                        id='description' 
                        required
                        onChange={handChange}
                        value={formData.description}
                        className="border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm resize-none min-h-[120px]"
                    />

                    <input 
                        type="text" 
                        placeholder='adress' 
                        id='address' 
                        required
                        onChange={handChange}
                        value={formData.address}
                        className="border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm"
                    />

                   {/* Checkboxes */}
          <div className="flex gap-6 flex-wrap">
            {[
              { id: 'sale', label: 'Venda', checked: formData.type === 'sale' },
              { id: 'rent', label: 'Arrendamento', checked: formData.type === 'rent' },
              { id: 'parking', label: 'Parqueamento', checked: formData.parking },
              { id: 'finished', label: 'Acabado', checked: formData.finished },
              { id: 'offer', label: 'Promoção', checked: formData.offer },
            ].map(({ id, label, checked }) => (
              <div key={id} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id={id}
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={checked}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Inputs Numéricos */}
          <div className="flex flex-wrap gap-6">
            {[
              { id: 'bedroom', label: 'Quartos', value: formData.bedroom },
              { id: 'bathroom', label: 'Casas de banho', value: formData.bathroom },
            ].map(({ id, label, value }) => (
              <div key={id} className="flex items-center gap-2">
                <input
                  type="number"
                  id={id}
                  min="1"
                  max="10"
                  required
                  onChange={handleChange}
                  value={value}
                  className="border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm w-24"
                />
                <span>{label}</span>
              </div>
            ))}

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className="border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm w-36"
              />
              <div className="flex flex-col items-center">
                <p>Preço normal</p>
                <span className="text-xs">(MZN / mês)</span>
              </div>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                  className="border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none rounded-xl p-3 shadow-sm w-36"
                />
                <div className="flex flex-col items-center">
                  <p>Preço com desconto</p>
                  <span className="text-xs">(MZN / mês)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lado Direito */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Imagens:
            <span className="font-normal text-gray-600 ml-2 text-sm">
              A primeira imagem será usada como capa (máx. 6)
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
                className="flex justify-between items-center p-3 border border-gray-300 rounded-xl shadow-md bg-white transition duration-20"
              >
                <img
                  src={url}
                  alt="Imagem do imóvel"
                  className="w-35 h-24 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="ml-4 px-3 py-2 text-sm bg-red-100 text-red-700 border border-red-300 rounded-lg uppercase hover:bg-red-200 transition"
                >
                  Apagar
                </button>
              </div>
            ))}

          <button
            disabled={loadingSubmit}
            className="p-3 bg-slate-700 text-white rounded-xl uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loadingSubmit ? 'A criar...' : 'Criar imóvel'}
          </button>
          {erroSubmit && <p className="text-red-700 text-sm">{erroSubmit}</p>}
        </div>

            </form>
    </main>
  )
}
