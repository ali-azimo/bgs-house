import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';

const provincias = [
  {
    nome: "Maputo",
    imagem:
      "https://images.unsplash.com/photo-1693064972579-0c1c85c636e8?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    texto:
      "Oferecemos soluções habitacionais e comerciais em Maputo e arredores, adaptadas à dinâmica local.",
  },
  {
    nome: "Gaza",
    imagem:
      "https://images.unsplash.com/photo-1738369350529-4c463d848acd?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    texto:
      "Atuamos em Gaza com foco em imóveis rurais, agrícolas e urbanos, sempre com compromisso e qualidade.",
  },
  {
    nome: "Inhambane",
    imagem:
      "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    texto:
      "Na costa de Inhambane promovemos imóveis voltados ao turismo, lazer e investimentos seguros.",
  },
  {
    nome: "Sofala",
    imagem:
      "https://images.pexels.com/photos/681392/pexels-photo-681392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    texto:
      "Presença forte em Sofala com imóveis residenciais, comerciais e industriais, com suporte local dedicado.",
  },
  {
    nome: "Manica",
    imagem:
      "https://images.unsplash.com/photo-1500336624523-d727130c3328?auto=format&fit=crop&w=800&q=60",
    texto:
      "Oferecemos soluções habitacionais e rurais para Manica, sempre focados na qualidade e confiança.",
  },
  {
    nome: "Tete",
    imagem:
      "https://images.unsplash.com/photo-1580830471928-93a800f76f5d?auto=format&fit=crop&w=800&q=60",
    texto:
      "Atuamos em Tete com foco em imóveis para mineração, indústria e residências, com atendimento local.",
  },
  {
    nome: "Zambézia",
    imagem:
      "https://images.pexels.com/photos/1603656/pexels-photo-1603656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    texto:
      "Presença ampla na Zambézia com imóveis residenciais e agrícolas, com suporte especializado.",
  },
  {
    nome: "Nampula",
    imagem:
      "https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=800&q=60",
    texto:
      "Oferecemos imóveis em Nampula com foco no crescimento urbano e oportunidades comerciais.",
  },
  {
    nome: "Cabo Delgado",
    imagem:
      "https://images.pexels.com/photos/1819648/pexels-photo-1819648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    texto:
      "Atuação em Cabo Delgado, destacando imóveis para turismo, mineração e residenciais.",
  },
  {
    nome: "Niassa",
    imagem:
      "https://images.pexels.com/photos/602917/pexels-photo-602917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    texto:
      "Presença em Niassa com imóveis rurais e habitacionais, oferecendo soluções adaptadas ao mercado local.",
  },

];

export default function ProvinciasSwiper() {
  return (
    <section className="bg-gray-50 py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#1F2E54] mb-10">
        A Nossa Missão nas Províncias de Moçambique
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {provincias.map(({ nome, imagem, texto }, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col h-full">
              <img
                src={imagem}
                alt={nome}
                className="w-full h-48 object-cover rounded-xl mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-[#1F2E54] mb-2">{nome}</h3>
              <p className="text-gray-600 text-sm flex-grow">{texto}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
