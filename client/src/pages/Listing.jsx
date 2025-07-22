import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare, FaHeart, FaEnvelope } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import Contact from '../components/Contact';
import MapMoz from '../components/MapMoz';

export default function Listing() {
  SwiperCore.use([Navigation, Pagination]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);
  const [similarListings, setSimilarListings] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/get/${params.listingId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        fetchSimilarListings(data.type, data._id);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const fetchSimilarListings = async (type, excludeId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/listing/get?type=${type}&limit=3`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setSimilarListings(data.listings.filter(listing => listing._id !== excludeId));
      }
    } catch (error) {
      console.error('Error fetching similar listings:', error);
    }
  };

  return (
    <main className="bg-gray-50">
      {loading && (
        <div className="text-center my-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F2E54]"></div>
          <p className="mt-4 text-lg text-gray-600">Carregando detalhes do imóvel...</p>
        </div>
      )}

      {error && (
        <div className="text-center my-20">
          <p className="text-2xl text-red-600">Ocorreu um erro ao carregar este imóvel</p>
          <p className="text-gray-600 mt-2">Por favor, tente novamente mais tarde</p>
        </div>
      )}

      {listing && !loading && !error && (
        <div>
          {/* Carrossel de Imagens */}
          <div className="relative">
            <Swiper
              navigation
              pagination={{ clickable: true }}
              loop={true}
              className="mySwiper"
            >
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div 
                    className="h-[550px] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${url})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Botão de Compartilhamento */}
            <div className="fixed top-[13%] right-[3%] z-10">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <FaShare className="text-[#1F2E54]" />
              </button>
              {copied && (
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-white px-3 py-1 rounded-md shadow-md text-sm">
                  Link copiado!
                </div>
              )}
            </div>
          </div>

          {/* Detalhes do Imóvel */}
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#1F2E54]">{listing.name}</h1>
                    <div className="flex items-center mt-2 text-gray-600">
                      <FaMapMarkerAlt className="text-green-600 mr-2" />
                      <span>{listing.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className={`px-4 py-2 rounded-full text-white font-medium ${
                      listing.type === 'rent' ? 'bg-blue-600' : 'bg-orange-600'
                    }`}>
                      {listing.type === 'rent' ? 'Para Arrendar' : 'Para Venda'}
                    </div>
                    {listing.offer && (
                      <div className="px-4 py-2 rounded-full bg-green-600 text-white font-medium">
                        {((listing.regularPrice - listing.discountPrice) / listing.regularPrice * 100).toFixed(0)}% OFF
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-2xl font-semibold text-[#1F2E54] mb-2">
                    {listing.offer ? (
                      <>
                        <span className="text-gray-400 line-through mr-2">
                          {listing.regularPrice.toLocaleString('pt-PT')} MZN
                        </span>
                        {listing.discountPrice.toLocaleString('pt-PT')} MZN
                      </>
                    ) : (
                      `${listing.regularPrice.toLocaleString('pt-PT')} MZN`
                    )}
                    {listing.type === 'rent' && ' /mês'}
                  </h2>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-[#1F2E54] mb-3">Descrição</h3>
                  <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                    <FaBed className="text-2xl text-[#1F2E54]" />
                    <div>
                      <p className="text-gray-500 text-sm">Quartos</p>
                      <p className="font-semibold">{listing.bedrooms}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                    <FaBath className="text-2xl text-[#1F2E54]" />
                    <div>
                      <p className="text-gray-500 text-sm">Casas de Banho</p>
                      <p className="font-semibold">{listing.bathrooms}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                    <MdOutlineMeetingRoom className="text-2xl text-[#1F2E54]" />
                    <div>
                      <p className="text-gray-500 text-sm">Área</p>
                      <p className="font-semibold">120 m²</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                    <FaParking className="text-2xl text-[#1F2E54]" />
                    <div>
                      <p className="text-gray-500 text-sm">Parqueamento</p>
                      <p className="font-semibold">{listing.parking ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>
                </div>

                {currentUser && listing.userRef !== currentUser._id && (
                  <div className="mt-8">
                    {!contact ? (
                      <button
                        onClick={() => setContact(true)}
                        className="flex items-center gap-2 bg-[#1F2E54] hover:bg-[#2c3e6e] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        <FaEnvelope />
                        Contactar Proprietário
                      </button>
                    ) : (
                      <Contact listing={listing} />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#1F2E54] mb-4">Localização</h3>
                <div className="h-96 rounded-lg overflow-hidden">
                  <MapMoz address={listing.address} />
                </div>
              </div>
            </div>

            {/* Imóveis Semelhantes */}
            {similarListings.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-[#1F2E54] mb-6">Imóveis Semelhantes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarListings.map((similarListing) => (
                    <div key={similarListing._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${similarListing.imageUrls[0]})` }}></div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg">{similarListing.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          <FaMapMarkerAlt className="inline mr-1 text-green-600" />
                          {similarListing.address.substring(0, 30)}...
                        </p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="font-bold text-[#1F2E54]">
                            {similarListing.offer
                              ? similarListing.discountPrice.toLocaleString('pt-PT')
                              : similarListing.regularPrice.toLocaleString('pt-PT')} MZN
                          </span>
                          <button className="text-sm bg-[#1F2E54] text-white px-3 py-1 rounded hover:bg-[#2c3e6e] transition-colors">
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}