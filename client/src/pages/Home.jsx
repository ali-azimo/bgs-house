import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItems from './ListingItems';



export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentlistings, setRentListings] = useState([]);
  SwiperCore.use([Navigation])

  console.log(saleListings);

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

      <Swiper navigation>
        {offerListings && 
          offerListings.length > 0 && 
          offerListings.map((listing) => (
            <SwiperSlide>
              <div 
                style={{
                  background: `url(${listing.imageUrls[0]}) 
                  center no-repeat`, 
                  backgroundSize:'cover', backgroundPosition: 'center center'
                }}
              className="h-[500px]" 
              key={listing._id}></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Top */}

    <div className="flex flex-col gap-6 py-24 px-6 max-w-6xl mx-auto text-center items-center">
      <h1 className="text-slate-800 font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight">
        Bem-vindo à <span className="text-blue-500">Imobiliária BGS</span>
      </h1>

      <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
        Na <strong>BGS</strong>, transformamos sonhos em realidade. A nossa missão é garantir que encontra o imóvel ideal — seja para viver, investir ou simplesmente começar um novo capítulo.
        <br className="hidden sm:block" />
        Com uma equipa dedicada, um portfólio variado e atenção personalizada, acompanhamos consigo cada passo da jornada.
      </p>

      <Link
        to={'/search'}
        className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
      >
        Descubra agora o seu próximo lar
      </Link>
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
      </div>
    </div>
  )
}