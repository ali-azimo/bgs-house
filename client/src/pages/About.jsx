import { Link } from 'react-router-dom';
import {
  FaBalanceScale,
  FaEye,
  FaHandshake,
  FaKey,
  FaMapSigns,
  FaBullseye,
  FaRocket,
  FaBuilding,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';

const pontos = [
  {
    titulo: 'Visibilidade com Propósito',
    texto: 'Mais do que exibir o seu imóvel, posicionamo-lo no mercado certo, com um público realmente interessado.',
    icone: <FaEye className="text-[#3b3f52] text-4xl" />,
  },
  {
    titulo: 'Parceria de Confiança',
    texto: 'Conduzimos o processo com integridade. Aqui, o seu imóvel é tratado como investimento, não apenas como anúncio.',
    icone: <FaHandshake className="text-[#3b3f52] text-4xl" />,
  },
  {
    titulo: 'Experiência Local Autêntica',
    texto: 'Conhecemos o valor de cada província, bairro e rua. É com este conhecimento que guiamos cada negócio.',
    icone: <FaMapSigns className="text-[#3b3f52] text-4xl" />,
  },
  {
    titulo: 'Processo Claro e Ágil',
    texto: 'Publicação sem complicações, com apoio dedicado. Sem promessas exageradas. Apenas resultado e clareza.',
    icone: <FaKey className="text-[#3b3f52] text-4xl" />,
  },
  {
    titulo: 'Equilíbrio entre Valor e Tempo',
    texto: 'Aliamos avaliação criteriosa ao ritmo do mercado, para garantir decisões equilibradas e vantajosas.',
    icone: <FaBalanceScale className="text-[#3b3f52] text-4xl" />,
  },
];

const provincias = [
  {
    nome: "Maputo",
    imagem: "https://images.unsplash.com/photo-1693064972579-0c1c85c636e8?q=80&w=813&auto=format&fit=crop",
    texto: "Oferecemos soluções habitacionais e comerciais em Maputo e arredores, adaptadas à dinâmica local.",
  },
  {
    nome: "Gaza",
    imagem: "https://images.unsplash.com/photo-1738369350529-4c463d848acd?q=80&w=387&auto=format&fit=crop",
    texto: "Atuamos em Gaza com foco em imóveis rurais, agrícolas e urbanos, sempre com compromisso e qualidade.",
  },
  {
    nome: "Inhambane",
    imagem: "https://images.unsplash.com/photo-1684211757307-ccf7d147a48c?q=80&w=870&auto=format&fit=crop",
    texto: "Na costa de Inhambane promovemos imóveis voltados ao turismo, lazer e investimentos seguros.",
  },
  {
    nome: "Sofala",
    imagem: "https://images.unsplash.com/photo-1650215771520-818a44a7ea92?q=80&w=870&auto=format&fit=crop",
    texto: "Presença forte em Sofala com imóveis residenciais, comerciais e industriais, com suporte local dedicado.",
  },
  {
    nome: "Manica",
    imagem: "https://images.unsplash.com/photo-1689009704495-ca263474f520?q=80&w=870&auto=format&fit=crop",
    texto: "Oferecemos soluções habitacionais e rurais para Manica, sempre focados na qualidade e confiança.",
  },
  {
    nome: "Tete",
    imagem: "https://cdn.pixabay.com/photo/2020/04/29/10/20/tilapia-5108235_1280.jpg",
    texto: "Atuamos em Tete com foco em imóveis para mineração, indústria e residências, com atendimento local.",
  },
  {
    nome: "Zambézia",
    imagem: "https://cdn.pixabay.com/photo/2012/07/09/07/44/cashew-nut-52067_960_720.jpg",
    texto: "Presença ampla na Zambézia com imóveis residenciais e agrícolas, com suporte especializado.",
  },
  {
    nome: "Nampula",
    imagem: "https://cdn.pixabay.com/photo/2021/02/01/18/30/fruits-5971537_960_720.jpg",
    texto: "Oferecemos imóveis em Nampula com foco no crescimento urbano e oportunidades comerciais.",
  },
  {
    nome: "Cabo Delgado",
    imagem: "https://cdn.pixabay.com/photo/2020/07/17/03/37/seal-5412860_960_720.jpg",
    texto: "Atuação em Cabo Delgado, destacando imóveis para turismo, mineração e residenciais.",
  },
  {
    nome: "Niassa",
    imagem: "https://cdn.pixabay.com/photo/2014/02/06/17/53/beans-260210_960_720.jpg",
    texto: "Presença em Niassa com imóveis rurais e habitacionais, oferecendo soluções adaptadas ao mercado local.",
  },
];

export default function ParceriaImobiliaria() {
  return (
    <div className="bg-gray-50">
      {/* SOBRE A BGS */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <FaBuilding className="text-4xl text-[#1F2E54] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-[#1F2E54]">
              Quem Somos
            </h3>
            <p className="text-gray-700 text-sm">
              A BGS é uma empresa moçambicana com mais de 4 anos de experiência,
              dedicada à prestação de serviços nos setores de Instalações
              Especiais, Mineração, Imobiliária, Investimentos, Serralharias,
              Construção Civil, Agro-Pecuária, Saúde e Meio Ambiente.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FaBullseye className="text-4xl text-[#1F2E54] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-[#1F2E54]">
              Missão
            </h3>
            <p className="text-gray-700 text-sm">
              Com raízes firmes em Moçambique e visão global, a BGS tem como
              missão levar soluções inovadoras e sustentáveis a clientes em todo
              o mundo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FaRocket className="text-4xl text-[#1F2E54] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-[#1F2E54]">Visão</h3>
            <p className="text-gray-700 text-sm">
              Atuamos com profissionalismo, integridade e compromisso em cada
              projeto, contribuindo para o desenvolvimento econômico e social
              das comunidades onde operamos.
            </p>
          </div>
        </div>
      </section>

      {/* Swiper das províncias */}
      <div className="py-10 px-6 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-center text-[#1F2E54] mb-10">
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
                <h3 className="text-xl font-semibold text-[#1F2E54] mb-2">
                  {nome}
                </h3>
                <p className="text-gray-600 text-sm flex-grow">{texto}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Seção de Vantagens */}
      <section
        id="vantagens"
        className="bg-[#f7f7f7] w-full py-24 px-6 max-w-7xl mx-auto"
      >
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pontos.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
            >
              <div className="mb-4">{item.icone}</div>
              <h3 className="text-xl font-semibold text-[#1F2E54] mb-2">
                {item.titulo}
              </h3>
              <p className="text-gray-600 text-sm">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
