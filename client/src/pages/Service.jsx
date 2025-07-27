import React from 'react';
import { FaHome, FaMoneyBillWave, FaMountain, FaTools, FaSwimmer, FaSeedling, FaUmbrellaBeach } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Service() {
  const services = [
    {
      title: 'Imobiliária',
      icon: <FaHome className="text-blue-600 text-4xl mb-4" />,
      description: 'Compra, venda e arrendamento de imóveis com segurança e transparência.'
    },
    {
      title: 'Investimentos',
      icon: <FaMoneyBillWave className="text-green-600 text-4xl mb-4" />,
      description: 'Oportunidades de investimento que garantem retorno e estabilidade financeira.'
    },
    {
      title: 'Mineração',
      icon: <FaMountain className="text-gray-700 text-4xl mb-4" />,
      description: 'Exploração de recursos naturais com responsabilidade ambiental e social.'
    },
    {
      title: 'Construção',
      icon: <FaTools className="text-yellow-600 text-4xl mb-4" />,
      description: 'Execução de obras civis com qualidade, eficiência e inovação técnica.'
    },
    {
      title: 'Construção de Piscinas',
      icon: <FaSwimmer className="text-cyan-600 text-4xl mb-4" />,
      description: 'Projetos de piscinas personalizadas com materiais duráveis e design moderno.'
    },
    {
      title: 'Agricultura',
      icon: <FaSeedling className="text-green-700 text-4xl mb-4" />,
      description: 'Produção agrícola sustentável com tecnologia e boas práticas agrícolas.'
    },
    {
      title: 'Turismo',
      icon: <FaUmbrellaBeach className="text-pink-600 text-4xl mb-4" />,
      description: 'Experiências turísticas inesquecíveis pelos melhores destinos locais.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#1F2E54]">Os Nossos Serviços</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center"
          >
            <div className="flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold text-[#1F2E54] mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link
          to="/team"
          className="inline-block bg-[#1F2E54] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#334b82] transition"
        >
          Saber mais sobre nós
        </Link>
      </div>
    </div>
  );
}
