import { Link } from 'react-router-dom';
import { GiMining, GiFarmTractor, GiStethoscope, GiReceiveMoney, GiToolbox } from "react-icons/gi";

export default function ServicosSecao() {
  const servicos = [
    {
      titulo: "Imobiliária e investimento",
      descricao: "Oportunidades seguras para comprar, vender e investir em imóveis residenciais e comerciais.",
      icone: <GiReceiveMoney className="text-4xl text-amber-600 mb-3" />,
      rota: "/imobiliaria",
    },
    {
      titulo: "Mineração e atividade conexas",
      descricao: "Terrenos estratégicos e serviços para operações de mineração e sectores relacionados.",
      icone: <GiMining className="text-4xl text-blue-600 mb-3" />,
      rota: "/minin",
    },
    {
      titulo: "Serviços diversos",
      descricao: "Espaços adequados para oficinas, armazéns e outros negócios variados.",
      icone: <GiToolbox className="text-4xl text-gray-600 mb-3" />,
      rota: "/diver",
    },
    {
      titulo: "Agropecuária",
      descricao: "Terrenos férteis e acessíveis para agricultura e criação de animais.",
      icone: <GiFarmTractor className="text-4xl text-green-600 mb-3" />,
      rota: "/agri",
    },
    {
      titulo: "Saúde",
      descricao: "Imóveis ideais para clínicas, farmácias ou centros de saúde com boa localização.",
      icone: <GiStethoscope className="text-4xl text-red-600 mb-3" />,
      rota: "/saude",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-10">Serviços Disponíveis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {servicos.map((servico, index) => (
            <Link
              key={index}
              to={servico.rota}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:underline"
            >
              <div className="flex justify-center">{servico.icone}</div>
              <h3 className="text-lg font-semibold text-slate-700 mt-4">{servico.titulo}</h3>
              <p className="text-sm text-gray-600 mt-2">{servico.descricao}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
