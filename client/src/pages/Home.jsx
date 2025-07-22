import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItems from './ListingItems';
import ServicosSecao from '../components/ServicosSecao';
import { FaClock, FaQuestionCircle, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';



export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentlistings, setRentListings] = useState([]);
  SwiperCore.use([Navigation, Autoplay, EffectFade])

  useEffect(()=>{
    const fetchOfferListings = async () =>{
      try{
        const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/get?offer=true&limit=4`,{
          credentials: 'include',
        });        
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      }catch(error){
        console.log(error)
      }
    }
  
    const fetchRentListings = async () =>{
      try{
        const res = await fetch(
          `${
            import.meta.env.VITE_API_KEY_ONRENDER
          }/api/listing/get?type=rent&limit=4`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      }catch(error){
        console.log(error)
      }
    }
    const fetchSaleListings = async () =>{
      try{
        const res = await fetch(
          `${
            import.meta.env.VITE_API_KEY_ONRENDER
          }/api/listing/get?type=sale&limit=4`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setSaleListings(data);
       }catch(error){
        console.log(error)
      }
    }
    fetchOfferListings();
  }, []);

  return (
    
    <div>

       {/* Swiper */}

      <Swiper 
            loop={true}
            autoplay={{
              delay: offerListings.length > 0 ? 9000 / offerListings.length : 9000, // Tempo por slide (30s total)
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            speed={1000}
            effect='fade'
            fadeEffect={{ crossFade: true }}
            modules={[Autoplay, Navigation]}
            className='w-full'
            navigation
      >
        {offerListings && 
          offerListings.length > 0 && 
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
        <div
          className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
          style={{
            background: `url(${listing.imageUrls[0]}) center no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          {/* Sombra escura para melhor contraste */}
          <div className="absolute inset-0 bg-black/30 bg-opacity-20"></div>

            {/* Conteúdo sobre a imagem */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white max-w-2xl ml-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                {listing.name}
              </h2>
              <p className="text-sm sm:text-base md:text-lg mb-4 drop-shadow-md">
                {listing.description?.substring(0, 100)}...
              </p>
              <Link
                to={`/listing/${listing._id}`}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300"
              >
                Ver mais detalhes
              </Link>
            </div>
        </div>
      </SwiperSlide>
          ))}
      </Swiper>

      {/* Top */}

    <div className="flex flex-col gap-6 py-10 px-6 max-w-6xl mx-auto text-center items-center">
      <h1 className="text-slate-800 font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight">
        Bem-vindo à <span className="text-blue-500">Imobiliária BGS</span>
      </h1>

      <Link
        to={'/search'}
        className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
      >
        Descubra agora o seu próximo lar
      </Link>
    </div>
   

   {/* Localizacao */}
   <div className="max-w-6xl m-auto bg-white border border-blue-100 rounded-lg shadow-md p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-slate-700 text-sm sm:text-base">
      
      {/* Horário */}
      <div className="flex flex-col items-center text-center">
        <FaClock className="text-blue-600 w-6 h-6 mb-2" />
        <span className="font-semibold">Atendimento 24h</span>
        <span className="text-xs text-gray-500">Dom a Sex</span>
      </div>

      {/* Ajuda */}
      <div className="flex flex-col items-center text-center">
        <FaQuestionCircle className="text-blue-600 w-6 h-6 mb-2" />
        <span className="font-semibold">Ajuda</span>
        <span className="text-xs text-gray-500">+258 845826662 / 875826662</span>
      </div>

      {/* Email */}
      <div className="flex flex-col items-center text-center">
        <FaEnvelope className="text-blue-600 w-6 h-6 mb-2" />
        <span className="font-semibold">Email</span>
        <span className="text-xs text-gray-500">bgs.soluction@gmail.com</span>
      </div>

      {/* Localização */}
      <div className="flex flex-col items-center text-center">
        <FaMapMarkerAlt className="text-blue-600 w-6 h-6 mb-2" />
        <span className="font-semibold">Instalações</span>
        <span className="text-xs text-gray-500">Maputo</span>
      </div>
      
    </div>

      {/* Lisnting product */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Mais recentes</h2>
                <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:underline'>
                Mostrar mais
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing) => (
                    <ListingItems listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
    

        {
         rentlistings &&rentlistings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Casas para arrendar</h2>
                <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline'>
                Mostrar mais
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentlistings.map((listing) => (
                    <ListingItems listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }

        {/* Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl shadow-md p-6 my-10 max-w-6xl mx-auto">

      {/* 1. Publicidade */}
      <div className="bg-blue-600 text-white rounded-lg p-6 flex flex-col justify-center items-start shadow">
        <h2 className="text-2xl font-bold mb-2">Procura casa?</h2>
        <p className="text-sm">
          A BGS tem tudo para si — imóveis selecionados, atendimento 24h e apoio personalizado para encontrar o seu novo lar.
        </p>
      </div>

      {/* 2. Imagem ilustrativa */}
      <div className="rounded-lg overflow-hidden shadow">
        <img
          src="https://cdn.pixabay.com/photo/2022/11/22/10/37/house-7609267_1280.jpg"
          alt="Imagem de casa BGS"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. Conteúdo + botão */}
      <div className="flex flex-col justify-center items-start p-4">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">Imóveis verificados</h3>
        <p className="text-sm text-gray-600 mb-4">
          Todos os nossos imóveis são inspecionados, com localização privilegiada e preços competitivos. Descubra agora o seu!
        </p>
        <Link
          to="/search"
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-300 text-sm font-semibold"
        >
          Explorar mais
        </Link>
      </div>

    </div>
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Casas para venda</h2>
                <Link to={'/search?type=sale'} className='text-sm text-blue-800 hover:underline'>
                Mostrar mais
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((listing) => (
                    <ListingItems listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
        <ServicosSecao/>
      </div>
    </div>
  )
}