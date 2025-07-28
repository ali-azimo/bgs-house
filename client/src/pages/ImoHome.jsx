import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ImoItems from './ImoItems'; // supondo que mudou o nome do componente também
import ServicosSecao from '../components/Service';
import { FaClock, FaQuestionCircle, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Home() {
  const [offerImos, setOfferImos] = useState([]);
  const [saleImos, setSaleImos] = useState([]);
  const [rentImos, setRentImos] = useState([]);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Navigation, Autoplay, EffectFade]);

  useEffect(() => {
    const fetchOfferImos = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/imo/get?offer=true&limit=4`,
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
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/imo/get?type=rent&limit=4`,
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
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/imo/get?type=sale&limit=4`,
          { credentials: 'include' }
        );
        const data = await res.json();
        setSaleImos(data);
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
      {/* Swiper */}
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

      {/* Resto do conteúdo ... */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerImos.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Mais recentes</h2>
              <Link to="/search?offer=true" className="text-sm text-blue-800 hover:underline">
                Mostrar mais
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerImos.map((imo) => (
                <ImoItems imo={imo} key={imo._id} />
              ))}
            </div>
          </div>
        )}

        {rentImos.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Casas para arrendar</h2>
              <Link to="/search?type=rent" className="text-sm text-blue-800 hover:underline">
                Mostrar mais
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentImos.map((imo) => (
                <ImoItems imo={imo} key={imo._id} />
              ))}
            </div>
          </div>
        )}

        {saleImos.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Casas para venda</h2>
              <Link to="/search?type=sale" className="text-sm text-blue-800 hover:underline">
                Mostrar mais
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleImos.map((imo) => (
                <ImoItems imo={imo} key={imo._id} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
