import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare, FaHeart, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdOutlineMeetingRoom } from 'react-icons/md';
import Contact from '../components/Contact';
import MapMoz from '../components/MapMoz';
import SimilarListings from '../components/SimilarListings';

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
        const res = await fetch(`${
            import.meta.env.VITE_API_KEY_ONRENDER
          }/api/listing/get/${params.listingId}`, {
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
      const res = await fetch(`${
            import.meta.env.VITE_API_KEY_ONRENDER
          }/api/listing/get?type=${type}&limit=3`, {
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
          <p className="mt-4 text-lg text-gray-600">
            Carregando detalhes do imóvel...
          </p>
        </div>
      )}

      {error && (
        <div className="text-center my-20">
          <p className="text-2xl text-red-600">
            Ocorreu um erro ao carregar este imóvel
          </p>
          <p className="text-gray-600 mt-2">
            Por favor, tente novamente mais tarde
          </p>
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
                    className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-cover bg-center"
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
                    <h1 className="text-3xl font-bold text-[#1F2E54]">
                      {listing.name}
                    </h1>
                    <div className="flex items-center mt-2 text-gray-600">
                      <FaMapMarkerAlt className="text-green-600 mr-2" />
                      <span>{listing.address}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div
                      className={`px-4 py-2 rounded-full text-white font-medium ${
                        listing.type === "rent"
                          ? "bg-blue-600"
                          : "bg-orange-600"
                      }`}
                    >
                      {listing.type === "rent" ? "Para Arrendar" : "Para Venda"}
                    </div>
                    {listing.offer && (
                      <div className="px-4 py-2 rounded-full bg-green-600 text-white font-medium">
                        {(
                          ((listing.regularPrice - listing.discountPrice) /
                            listing.regularPrice) *
                          100
                        ).toFixed(0)}
                        % OFF
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="mt-6">
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
                </div> */}

                <div className="">
                  <h3 className="">
                    Descrição
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                    <FaBed className="text-2xl text-[#1F2E54]" />
                    <div>
                      <p className="font-semibold">
                        {listing.bedroom > 1
                          ? `${listing.bedroom} quartos `
                          : `${listing.bedroom} quarto`}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                    <FaBath className="text-2xl text-[#1F2E54]" />
                    <div className="font-semibold">
                      {listing.bathroom > 1
                        ? `${listing.bathroom} banheiros `
                        : `${listing.bathroom} banheiro`}
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
                      <p className="font-semibold">
                        {listing.parking ? "Sim" : "Não"}
                      </p>
                    </div>
                  </div>
                </div>
                
                  {/* contact */}
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                           <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                <FaPhone className="text-xl" />
                           </div>
                            <div>
                            <p className="text-gray-500 text-sm">Telefone</p>
                            <a href="tel:+258845826662" className="font-semibold hover:text-blue-600 transition-colors">
                              +258 84 582 6662
                            </a>
                        </div>
                      </div>
                       <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                          <div className="p-3 bg-green-100 rounded-full text-green-600">
                             <FaWhatsapp className="text-xl" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">WhatsApp</p>
                            <a 
                              href="https://wa.me/258845826662" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-semibold hover:text-green-600 transition-colors"
                            >
                              +258 84 582 6662
                            </a>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="p-3 bg-red-100 rounded-full text-red-600">
                        <MdEmail className="text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <a 
                          href="mailto:bgs.soluction@gmail.com" 
                          className="font-semibold hover:text-red-600 transition-colors"
                        >
                          bgs.soluction@gmail.com
                        </a>
                      </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                         <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                        <FaPhone className="text-xl" />
                      </div>
                        <p className="text-gray-500 text-sm">Telefone Alternativo</p>
                        <a href="tel:+258875826662" className="font-semibold hover:text-purple-600 transition-colors">
                          +258 87 582 6662
                        </a>
                  </div>
                  </div>
                </div>

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
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#1F2E54] mb-4">
                  Localização
                </h3>
                <div className="h-96 rounded-lg overflow-hidden">
                  <MapMoz address={listing.address} />
                </div>
              </div>
            </div>

            {/* Imóveis Semelhantes */}
            <SimilarListings listing={listing} />
          </div>
        </div>
      )}
    </main>
  );
}