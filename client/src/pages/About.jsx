import { FaHandshake, FaHouseChimney } from "react-icons/fa6";
import { FaSwimmingPool } from "react-icons/fa";
import { GiFarmTractor } from "react-icons/gi";

export default function About() {
  return (
    <div className="px-4 bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#1F2E54] mb-12">
          Sobre a Imobiliária BGS
        </h1>

        {/* Bloco de Serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="shadow-xl p-6 rounded-2xl bg-white hover:shadow-2xl transition">
            <FaHouseChimney className="text-[#1F2E54] text-4xl mx-auto mb-4" />
            <h3 className="text-[#1F2E54] font-semibold text-lg">Casas</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Ajudamos desde a escolha até ao processo final de aquisição, com total transparência.
            </p>
          </div>

          <div className="shadow-xl p-6 rounded-2xl bg-white hover:shadow-2xl transition">
            <FaSwimmingPool className="text-[#00AEEF] text-4xl mx-auto mb-4" />
            <h3 className="text-[#1F2E54] font-semibold text-lg">Piscinas</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Construção e manutenção de piscinas residenciais e comerciais, com design personalizado e segurança.
            </p>
          </div>

          <div className="shadow-xl p-6 rounded-2xl bg-white hover:shadow-2xl transition">
            <GiFarmTractor className="text-[#4CAF50] text-4xl mx-auto mb-4" />
            <h3 className="text-[#1F2E54] font-semibold text-lg">Campos</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Comercializamos terrenos agrícolas e espaços recreativos em várias províncias do país.
            </p>
          </div>

          <div className="shadow-xl p-6 rounded-2xl bg-white hover:shadow-2xl transition">
            <FaHandshake className="text-[#F4B400] text-4xl mx-auto mb-4" />
            <h3 className="text-[#1F2E54] font-semibold text-lg">Negócios</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Facilitamos a compra, venda e arrendamento de imóveis comerciais com soluções adaptadas.
            </p>
          </div>
        </div>

        {/* Descrição da Empresa */}
        <div className="mt-16 space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-[#1F2E54] mb-2">
              Quem Somos
            </h2>
            <p>
              A <strong>BGS</strong> é uma empresa moçambicana que atua no ramo imobiliário em todo o território nacional, destacando-se pela sua diversidade de serviços, qualidade e compromisso com os clientes.
            </p>
            <p className="mt-2">
              Presente em todas as províncias de Moçambique, a BGS adapta-se às realidades locais e oferece soluções personalizadas para clientes particulares e empresariais.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#1F2E54]">Construção de Piscinas e Infraestruturas</h2>
            <p className="mt-2">
              Contamos com uma equipa especializada em construção de piscinas residenciais e comerciais, utilizando materiais modernos e técnicas avançadas, com foco na durabilidade, conforto e estética.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#1F2E54]">Venda e Arrendamento de Imóveis</h2>
            <p className="mt-2">
              Oferecemos uma carteira diversificada de imóveis:
            </p>
            <ul className="list-disc ml-6 text-sm mt-2 space-y-1">
              <li>Casas (novas e usadas)</li>
              <li>Escritórios</li>
              <li>Espaços comerciais</li>
              <li>Campos agrícolas e recreativos</li>
            </ul>
            <p className="mt-2">
              Atuamos tanto no segmento residencial quanto corporativo, com soluções flexíveis e acompanhamento profissional.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#1F2E54]">Serviço Personalizado</h2>
            <p className="mt-2">
              Na BGS, o cliente está no centro. Garantimos um atendimento personalizado e transparente, do início ao fim do processo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
