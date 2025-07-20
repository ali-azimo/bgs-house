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
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      }catch(error){
        console.log(error)
      }
    }
  
    const fetchRentListings = async () =>{
      try{
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      }catch(error){
        console.log(error)
      }
    }
    const fetchSaleListings = async () =>{
      try{
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
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

      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
  <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
    Bem-vindo à <span className="text-slate-500">Imobiliária BGS</span><br />
    O lugar onde os seus sonhos ganham forma
  </h1>

  <div className="text-gray-500 text-xs sm:text-sm leading-relaxed">
    Na BGS, não vendemos apenas imóveis — entregamos confiança, conforto e qualidade de vida.
    <br className="hidden sm:block" />
    Com uma equipa experiente e uma ampla variedade de propriedades, ajudamo-lo a encontrar a solução perfeita para si e para a sua família.
    <br />
    Quer esteja à procura de comprar, arrendar ou investir, estamos prontos para o acompanhar em cada passo.
  </div>

  <Link to={'/search'} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
    Descubra agora o seu próximo lar com a BGS.
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