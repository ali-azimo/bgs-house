import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { FaMapMarkerAlt, FaShare,FaChair, FaParking, FaBed, FaBath, FaCar, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import SimilarItems from '../components/SimilarItems';
import MapMoz from './MapMoz';

export default function GenericDetails({ type }) {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const idParam = `${type}Id`;
        const res = await fetch(
          `${import.meta.env.VITE_API_KEY_ONRENDER}/api/${type}/get/${params[idParam]}`,
          {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }
        );
        const data = await res.json();

        if (!data || data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setItem(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        console.error(`Erro ao buscar ${type}:`, err);
        setError(true);
        setLoading(false);
      }
    };

    fetchItem();
  }, [params, type]);

  return (
    <main className="bg-gray-50">
      {loading && (
        <div className="text-center my-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F2E54]"></div>
          <p className="mt-4 text-lg text-gray-600">
            Carregando detalhes do post...
          </p>
        </div>
      )}

      {error && (
        <div className="text-center my-20">
          <p className="text-2xl text-red-600">
            Ocorreu um erro ao carregar este post
          </p>
          <p className="text-gray-600 mt-2">
            Por favor, tente novamente mais tarde
          </p>
        </div>
      )}

      {item && !loading && !error && (
        <div>
          {/* Carrossel */}
          <div className="relative ">
            <Swiper
              navigation
              pagination={{ clickable: true }}
              loop
              className="mySwiper"
              modules={[Navigation, Pagination]}
            >
              {item.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[550px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center object-cover bg-top-10"
                      style={{ backgroundImage: `url(${url})` }}
                    />
                    {/* Camada de transparência (opcional) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Botão Copiar */}
            <div className="fixed top-[13%] right-[3%] z-10">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <FaShare className="text-[#1F2E54]" />
              </button>
              {copied && (
                <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-md shadow-md text-sm">
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
                    <h1 className="text-3xl font-bold text-[#1F2E54]">
                      {item.name}
                    </h1>
                    <div className="flex items-center mt-2">
                      <FaMapMarkerAlt className="text-[#1F2E54] mr-2" />
                      <span>{item.address}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row gap-8">
                  {/* Descrição */}
                  <div className="md:flex-[0_0_60%]">
                    <h3 className="text-xl text-[#1F2E54] font-semibold mb-2">Descrição</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-col gap-3 mt-4">
                      <a
                        href="https://wa.me/258845826662"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-green-600 hover:underline"
                      >
                        <FaWhatsapp /> WhatsApp: +258 875826662
                      </a>
                     <div className="grid lg:grid-cols-2 gap-4 p2-4 ">
                        <a
                          href="tel:+258845826662"
                          className="inline-flex items-center gap-2 text-blue-400 hover:underline"
                        >
                          <FaPhone /> Ligar: +258 82/84/872507746 
                        </a>
                        <a
                          href="tel:+258845826662"
                          className="inline-flex items-center gap-2 text-blue-400 hover:underline"
                        >
                          <FaPhone /> Ligar: +258 844314455  
                        </a>
                     </div>
                      <a
                        href="mailto: bgs.infomoz@gmail.com"
                        className="inline-flex items-center gap-2 text-red-600 hover:underline"
                      >
                        <FaEnvelope /> Email:  bgs.infomoz@gmail.com
                      </a>
                    </div>

                    <div className="mt-6">
                      <MapMoz address={item.address} />
                    </div>
                  </div>

                  {/* Semelhantes */}
                  <div className="md:flex-[0_0_40%] md:border-l md:border-gray-300 md:pl-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Itens Semelhantes
                    </h3>
                    <div className="overflow-x-auto">
                      <SimilarItems type={type} id={item._id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
