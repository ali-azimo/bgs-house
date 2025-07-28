import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { FaBath, FaBed, FaMapMarkerAlt, FaParking, FaShare, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdOutlineMeetingRoom } from 'react-icons/md';
import Contact from '../components/Contact';
import MapMoz from '../components/MapMoz';
import SimilarItems from '../components/SimilarItems';

export default function Imo() {
  SwiperCore.use([Navigation, Pagination]);

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [imo, setImo] = useState(null);
  const [similarImos, setSimilarImos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  // Buscar imóvel pelo id
  useEffect(() => {
    const fetchImo = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/imo/get/${params.imoId}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
          }
        );

        const data = await res.json();
        console.log('Resposta da API:', data);

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        // Ajusta conforme estrutura da resposta da API:
        const imoData = data.imo || data;
        setImo(imoData);

        // Busca imóveis semelhantes
        if (imoData.type && imoData._id) {
          fetchSimilarImos(imoData.type, imoData._id);
        }

        setLoading(false);
        setError(false);
      } catch (error) {
        console.error('Erro ao buscar imóvel:', error);
        setError(true);
        setLoading(false);
      }
    };

    // Função para buscar imóveis semelhantes
    const fetchSimilarImos = async (type, id) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/imo/get-similar?type=${type}&excludeId=${id}&limit=4`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
          }
        );
        const data = await res.json();

        if (data.success === false) {
          setSimilarImos([]);
          return;
        }
        setSimilarImos(data.imos || []);
      } catch (error) {
        console.error('Erro ao buscar imóveis semelhantes:', error);
        setSimilarImos([]);
      }
    };

    fetchImo();
  }, [params.imoId]);

  if (loading) {
    return (
      <div className="text-center my-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F2E54] mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Carregando detalhes do imóvel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-20">
        <p className="text-2xl text-red-600">Ocorreu um erro ao carregar este imóvel</p>
        <p className="text-gray-600 mt-2">Por favor, tente novamente mais tarde</p>
      </div>
    );
  }

  if (!imo) {
    return null; // ou uma mensagem alternativa caso `imo` seja nulo
  }

  return (
    <main className="bg-gray-50">
      {/* Carrossel de imagens */}
      <div className="relative">
        <Swiper navigation pagination={{ clickable: true }} loop={true} className="mySwiper">
          {imo.imageUrls?.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botão de compartilhar */}
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

      {/* Detalhes do imóvel */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#1F2E54]">{imo.name}</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <FaMapMarkerAlt className="text-green-600 mr-2" />
                  <span>{imo.address}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div
                  className={`px-4 py-2 rounded-full text-white font-medium ${
                    imo.type === "rent" ? "bg-blue-600" : "bg-orange-600"
                  }`}
                >
                  {imo.type === "rent" ? "Para Arrendar" : "Para Venda"}
                </div>
                {imo.offer && (
                  <div className="px-4 py-2 rounded-full bg-green-600 text-white font-medium">
                    {(
                      ((imo.regularPrice - imo.discountPrice) / imo.regularPrice) *
                      100
                    ).toFixed(0)}
                    % OFF
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-1">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">{imo.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                <FaBed className="text-2xl text-[#1F2E54]" />
                <div>
                  <p className="font-semibold">
                    {imo.bedroom > 1 ? `${imo.bedroom} quartos` : `${imo.bedroom} quarto`}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                <FaBath className="text-2xl text-[#1F2E54]" />
                <div className="font-semibold">
                  {imo.bathroom > 1
                    ? `${imo.bathroom} banheiros`
                    : `${imo.bathroom} banheiro`}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                <MdOutlineMeetingRoom className="text-2xl text-[#1F2E54]" />
                <div>
                  <p className="text-gray-500 text-sm">Área</p>
                  <p className="font-semibold">{imo.area ?? "120"} m²</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                <FaParking className="text-2xl text-[#1F2E54]" />
                <div>
                  <p className="text-gray-500 text-sm">Parqueamento</p>
                  <p className="font-semibold">{imo.parking ? "Sim" : "Não"}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
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
                <Contact imo={imo} />
              )}
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#1F2E54] mb-4">Localização</h3>
            <div className="h-96 rounded-lg overflow-hidden">
              <MapMoz address={imo.address} />
            </div>
          </div>
        </div>

        {/* Imóveis Semelhantes */}
         <SimilarItems type="imo" id={imo._id} />
      </div>
    </main>
  );
}
