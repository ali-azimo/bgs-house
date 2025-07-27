import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { FaMapMarkerAlt, FaPhone, FaShare, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import SimilarAgris from '../components/similarAgris';


export default function Agri() {
  const params = useParams();
  const [agri, setAgri] = useState(null);
  const [similarAgris, setSimilarAgris] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAgri = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/agri/get/${params.agriId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        const data = await res.json();

        if (!data || data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setAgri(data);
        fetchSimilarAgris(data.category, data._id);
        setLoading(false);
        setError(false);
      } catch (err) {
        console.error('Erro ao buscar agri:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchAgri();
  }, [params.agriId]);

  const fetchSimilarAgris = async (category, excludeId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/agri/get?category=${category}&limit=3`,
        {
          credentials: 'include',
        }
      );

      const data = await res.json();
      if (data.success) {
        setSimilarAgris(data.agris.filter((item) => item._id !== excludeId));
      }
    } catch (err) {
      console.error('Erro ao buscar agris semelhantes:', err);
    }
  };

  return (
    <main className="bg-gray-50">
      {loading && (
        <div className="text-center my-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F2E54]"></div>
          <p className="mt-4 text-lg text-gray-600">Carregando detalhes do post...</p>
        </div>
      )}

      {error && (
        <div className="text-center my-20">
          <p className="text-2xl text-red-600">Ocorreu um erro ao carregar este post</p>
          <p className="text-gray-600 mt-2">Por favor, tente novamente mais tarde</p>
        </div>
      )}

      {agri && !loading && !error && (
        <div>
          {/* Carrossel de Imagens */}
          <div className="relative">
            <Swiper
              navigation
              pagination={{ clickable: true }}
              loop={true}
              className="mySwiper"
            >
              {agri.imageUrls.map((url) => (
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

          {/* Detalhes */}
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#1F2E54]">{agri.name}</h1>
                    <div className="flex items-center mt-2 text-gray-600">
                      <FaMapMarkerAlt className="text-green-600 mr-2" />
                      <span>{agri.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3>Descrição</h3>
                  <p className="text-gray-700 leading-relaxed">{agri.description}</p>
                </div>

              </div>
            </div>

            {/* Itens semelhantes */}
            <SimilarAgris agri={agri} />
          </div>
        </div>
      )}
    </main>
  );
}
