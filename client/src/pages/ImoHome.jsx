import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ImoItems from './ImoItems';
import ServicosSecao from '../components/Service';
import { FaClock, FaQuestionCircle, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import MapMoz from '../components/MapMoz';

export default function Home() {
  const [offerImos, setOfferImos] = useState([]);
  const [saleImos, setSaleImos] = useState([]);
  const [rentImos, setRentImos] = useState([]);
  const [buildImos, setBuildImos] = useState([]);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Navigation, Autoplay, EffectFade]);

  useEffect(() => {
    const fetchOfferImos = async () => {
      try {
        // Buscar imóveis com oferta, ordenados do mais antigo para o mais novo
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/imo/get?offer=true&limit=8&sort=createdAt&order=asc`,
          { credentials: 'include' }
        );
        const data = await res.json();
        setOfferImos(data);
        fetchRentImos();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentImos = async () => {
      try {
        // Buscar imóveis para arrendamento, ordenados do mais antigo para o mais novo
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/imo/get?type=rent&limit=8&sort=createdAt&order=asc`,
          { credentials: 'include' }
        );
        const data = await res.json();
        setRentImos(data);
        fetchSaleImos();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleImos = async () => {
      try {
        // Buscar imóveis para venda, ordenados do mais antigo para o mais novo
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/imo/get?type=sale&limit=8&sort=createdAt&order=asc`,
          { credentials: 'include' }
        );
        const data = await res.json();
        setSaleImos(data);
        fetchBuildImos();
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchBuildImos = async () => {
      try {
        // Buscar imóveis para construção, ordenados do mais antigo para o mais novo
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/imo/get?type=build&limit=8&sort=createdAt&order=asc`,
          { credentials: 'include' }
        );
        const data = await res.json();
        setBuildImos(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchOfferImos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm font-medium">A carregar conteúdo...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Swiper - Slider de Imóveis em Destaque */}
      <Swiper
        loop={true}
        autoplay={{
          delay: offerImos.length > 0 ? 9000 / offerImos.length : 9000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        pagination={{ clickable: true }}
        speed={1000}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        modules={[Autoplay, Navigation]}
        className="w-full"
        navigation
      >
        {offerImos.map((imo) => (
          <SwiperSlide key={imo._id}>
            <div
              className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
              style={{
                background: `url(${imo.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            >
              <div className="absolute inset-0 bg-black/30 bg-opacity-20"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white max-w-2xl ml-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                  {imo.name}
                </h2>
                <p className="text-sm sm:text-base md:text-lg mb-4 drop-shadow-md">
                  {imo.description?.substring(0, 100)}...
                </p>
                <Link
                  to={`/imo/${imo._id}`}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300"
                >
                  Ver mais detalhes
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Conteúdo Principal - Grid de 8 itens por secção */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-12 my-10">
        
        {/* Secção: Mais recentes (Ofertas) */}
        {offerImos.length > 0 && (
          <div>
            <div className="flex justify-between items-center my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Ofertas Especiais</h2>
              <Link to="/search?offer=true&sort=createdAt&order=asc" className="text-sm text-blue-800 hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {offerImos.map((imo) => (
                <ImoItems imo={imo} key={imo._id} />
              ))}
            </div>
          </div>
        )}

        {/* Secção: Casas para Arrendar */}
        {rentImos.length > 0 && (
          <div>
            <div className="flex justify-between items-center my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Casas para Arrendar</h2>
              <Link to="/search?type=rent&sort=createdAt&order=asc" className="text-sm text-blue-800 hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rentImos.map((imo) => (
                <ImoItems imo={imo} key={imo._id} />
              ))}
            </div>
          </div>
        )}

        {/* Secção: Casas para Venda */}
        {saleImos.length > 0 && (
          <div>
            <div className="flex justify-between items-center my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Casas para Venda</h2>
              <Link to="/search?type=sale&sort=createdAt&order=asc" className="text-sm text-blue-800 hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {saleImos.map((imo) => (
                <ImoItems imo={imo} key={imo._id} />
              ))}
            </div>
          </div>
        )}

        {/* Secção: Construção & Investimento */}
        {buildImos.length > 0 && (
          <div>
            <div className="flex justify-between items-center my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Construção & Investimento</h2>
              <Link to="/search?type=build&sort=createdAt&order=asc" className="text-sm text-blue-800 hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {buildImos.map((imo) => (
                <ImoItems imo={imo} key={imo._id} />
              ))}
            </div>
          </div>
        )}

        {/* Mapa de Moçambique */}
        <MapMoz />
      </div>
    </div>
  );
}