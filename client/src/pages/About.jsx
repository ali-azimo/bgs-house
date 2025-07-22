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
      "https://images.unsplash.com/photo-1684211757307-ccf7d147a48c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    texto:
      "Na costa de Inhambane promovemos imóveis voltados ao turismo, lazer e investimentos seguros.",
  },
  {
    nome: "Sofala",
    imagem:
      "https://images.unsplash.com/photo-1650215771520-818a44a7ea92?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    texto:
      "Presença forte em Sofala com imóveis residenciais, comerciais e industriais, com suporte local dedicado.",
  },
  {
    nome: "Manica",
    imagem:
      "https://images.unsplash.com/photo-1689009704495-ca263474f520?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    texto:
      "Oferecemos soluções habitacionais e rurais para Manica, sempre focados na qualidade e confiança.",
  },
  {
    nome: "Tete",
    imagem:
      "https://w7.pngwing.com/pngs/244/240/png-transparent-tilapia-fish-fish-animals-seafood-fishing-rods-thumbnail.png",
    texto:
      "Atuamos em Tete com foco em imóveis para mineração, indústria e residências, com atendimento local.",
  },
  {
    nome: "Zambézia",
    imagem:
      "https://w7.pngwing.com/pngs/694/675/png-transparent-coconut-milk-coconut-water-nata-de-coco-coconut-oil-coconut-coconut-fruit-illustration-natural-foods-food-eating-thumbnail.png",
    texto:
      "Presença ampla na Zambézia com imóveis residenciais e agrícolas, com suporte especializado.",
  },
  {
    nome: "Nampula",
    imagem:
      "https://w7.pngwing.com/pngs/733/28/png-transparent-red-mangoes-juice-smoothie-mango-health-eating-mango-natural-foods-food-orange-thumbnail.png",
    texto:
      "Oferecemos imóveis em Nampula com foco no crescimento urbano e oportunidades comerciais.",
  },
  {
    nome: "Cabo Delgado",
    imagem:
      "https://cdn.pixabay.com/photo/2020/07/17/03/37/seal-5412860_960_720.jpg",
    texto:
      "Atuação em Cabo Delgado, destacando imóveis para turismo, mineração e residenciais.",
  },
  {
    nome: "Niassa",
    imagem:
      "https://w7.pngwing.com/pngs/377/40/png-transparent-legume-bean-protein-health-food-bean-natural-foods-dried-fruit-food-thumbnail.png",
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
