import { useState } from 'react';
import{
    getDownloadURL, 
    getStorage, 
    ref, 
    uploadBytesResumable
} from 'firebase/storage';
import {app} from '../firebase';
import {useSelector}from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';

export default function CreateListing() {
    const Navigate = useNavigate();
    const {currentUser} = useSelector((state)=>state.user);
    const [files, setFiles] = useState([]); 
    
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [erroSubmit, setErrorSubmit] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);


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


    console.log(formData);
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
                setImageUploadError('Erro ao carregar imagem (apens 2mb por imagem)');
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
                    console.log(`O carregamento esta ${progress}% feito`);
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
            if(formData.imageUrls.length < 1) return setErrorSubmit('Deve carregar pelo menos uma imagem');
            if(+formData.regularPrice < +formData.discountPrice) return setErrorSubmit("O preço regular não pode ser menor que o preço com desconto");
            setLoadingSubmit(true);
            setErrorSubmit(false);
            const res = await fetch(`${
                                import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/create`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
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
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className='flex flex-col gap-4 flex-1'>
                    <input 
                        type="text" 
                        placeholder='Name' 
                        className='boder p-3 rounded-lg' 
                        id='name' 
                        maxLength='62' 
                        minLength='10' 
                        required
                        onChange={handChange}
                        value={formData.name}
                    />

                    <textarea
                        type="textarea" 
                        placeholder='Description' 
                        className='boder p-3 rounded-lg' 
                        id='description' 
                        required
                        onChange={handChange}
                        value={formData.description}
                    />

                    <input 
                        type="text" 
                        placeholder='adress' 
                        className='boder p-3 rounded-lg' 
                        id='address' 
                        required
                        onChange={handChange}
                        value={formData.address}
                    />

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id='sale' 
                                className='w-5' 
                                onChange={handChange}
                                checked={formData.type === 'sale'}
                            />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id='rent' 
                                className='w-5' 
                                onChange={handChange}
                                checked={formData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id='parking' 
                                className='w-5' 
                                onChange={handChange}
                                checked={formData.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id='finished' 
                                className='w-5' 
                                onChange={handChange}
                                checked={formData.finished}
                            />
                            <span>Finished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id='offer' 
                                className='w-5'
                                onChange={handChange}
                                checked={formData.offer} 
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="number" 
                                id='bedroom' 
                                min='1' 
                                max='10' 
                                required 
                                className='p-3 border border-gray-300 rounded-lg'
                                onChange={handChange}
                                value={formData.bedroom} />
                            <span>Beds</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="number" 
                                id='bathroom' 
                                min='1' 
                                max='10' 
                                required 
                                className='p-3 border border-gray-300 rounded-lg'
                                onChange={handChange}
                                value={formData.bathroom} />
                            <span>Bathrooms</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="number" 
                                id='regularPrice' 
                                min='50' 
                                max='1000000000' 
                                required 
                                className='p-3 border border-gray-300 rounded-lg'
                                onChange={handChange}
                                value={formData.regularPrice} />
                            <div className='flex flex-col items-center'>                           
                                <p>Regular price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className='flex items-center gap-2'>
                            <input 
                                type="number" 
                                id='discountPrice' 
                                min='0' 
                                max='1000000000' 
                                required 
                                className='p-3 border border-gray-300 rounded-lg'
                                onChange={handChange}
                                value={formData.discountPrice} />
                            <div className='flex flex-col items-center'>                           
                                <p>Discounted price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        )}
                        
                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                    <span className='font-normal text-gray-600 ml2'>A primeira imagem sera usada na entrada (max 6)</span>
                    </p>
                    <div className='flex gap-4'>

                        <input 
                         onChange={(e)=>setFiles(e.target.files)}
                         className='p-3 border border-gray-300 rounded w-full cursor-pointer' type="file" 
                         id='images' 
                         accept='image/*' 
                         multiple/>
                        <button 
                            disabled={uploading}
                            type='button'
                            onClick={handleImageSubmit}
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                            {uploading ? 'Carregando...' : 'Carregar imagens'}
                        </button>
                    </div>
                    <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>

                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
                            <div 
                                key={url}
                                className='flex justify-between p-3 items-center border'>
                                <img src={url}
                                alt='listing image' 
                                className='w-20 h-20 object-contain rounded-lg'/>
                                <button type='button' onClick={()=> handleRemoveImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>
                                    Delete
                                </button>
                            </div>
                        ))
                    }
                    <button
                    className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:m-80'>
                        {loadingSubmit ? 'Creating...' : 'Create listing'}
                    </button>
                    {erroSubmit && <p className='text-red-700 text-sm'>{erroSubmit}</p>}
                </div>

            </form>
    </main>
  )
}
