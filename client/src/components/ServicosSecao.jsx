// Componente para seção de serviços adicionais (mineração, agricultura, piscina, segurança)
// Usa React Icons e TailwindCSS

import { GiMining, GiFarmTractor, GiPoolDive, GiSecurityGate } from "react-icons/gi";

export default function ServicosSecao() {
  const servicos = [
    {
      titulo: "Mineração",
      descricao: "Oferecemos terrenos ideais para projetos de mineração, com localizações estratégicas e acesso facilitado.",
      icone: <GiMining className="text-4xl text-blue-600 mb-3" />,
    },
    {
      titulo: "Agricultura",
      descricao: "Terrenos planos e férteis, prontos para cultivo, ideais para agricultura familiar ou empresarial.",
      icone: <GiFarmTractor className="text-4xl text-green-600 mb-3" />,
    },
    {
      titulo: "Piscinas",
      descricao: "Imóveis com piscinas modernas, perfeitas para lazer e conforto em família.",
      icone: <GiPoolDive className="text-4xl text-cyan-600 mb-3" />,
    },
    {
      titulo: "Segurança",
      descricao: "Priorize sua tranquilidade com imóveis em condomínios fechados e segurança 24h.",
      icone: <GiSecurityGate className="text-4xl text-red-600 mb-3" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-10">Serviços Disponíveis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {servicos.map((servico, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center">{servico.icone}</div>
              <h3 className="text-xl font-semibold text-slate-700 mt-4">{servico.titulo}</h3>
              <p className="text-sm text-gray-600 mt-2">{servico.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
