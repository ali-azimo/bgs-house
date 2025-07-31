import React from "react";
import {
  FaHome,
  FaIndustry,
  FaSeedling,
  FaHeartbeat,
  FaShieldAlt,
  FaFileAlt,
  FaUserCheck,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 prose prose-neutral dark:prose-invert prose-lg">
      <header className="mb-12">
        <div className="flex items-center gap-6 mb-6">
          <FaShieldAlt className="text-indigo-600 text-5xl flex-shrink-0" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Política de Privacidade da BGS
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
              Última atualização:{" "}
              {new Date().toLocaleDateString("pt-PT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          A BGS valoriza a sua privacidade e está comprometida com a proteção dos seus dados pessoais. 
          Esta política descreve como recolhemos, utilizamos, armazenamos e protegemos as suas informações 
          nas nossas diversas áreas de atuação: Imobiliária e Investimento, Mineração e Atividades Conexas, 
          Agropecuária e Saúde.
        </p>
      </header>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaFileAlt className="text-indigo-500 mr-3" />
            <span>1. Dados Recolhidos</span>
          </h2>
          <ul className="space-y-3 pl-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li className="leading-relaxed">Informações de contacto (nome, e-mail, telefone, morada)</li>
            <li className="leading-relaxed">Dados de navegação (endereço IP, tipo de dispositivo, páginas visitadas)</li>
            <li className="leading-relaxed">Informações fornecidas voluntariamente através de formulários</li>
            <li className="leading-relaxed">Dados transacionais (histórico de compras, contratos, pagamentos)</li>
            <li className="leading-relaxed">Dados demográficos (quando relevantes para os serviços prestados)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaUserCheck className="text-green-600 mr-3" />
            <span>2. Finalidades do Tratamento</span>
          </h2>
          <ul className="space-y-4">
            <li className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start gap-4">
                <FaHome className="text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg">Imobiliária e Investimento</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Gestão de propriedades, processamento de transações, avaliação de investimentos, 
                    comunicação com clientes e cumprimento de obrigações legais.
                  </p>
                </div>
              </div>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start gap-4">
                <FaIndustry className="text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg">Mineração e Atividades Conexas</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Gestão de operações, compliance regulatório, segurança no local de trabalho, 
                    comunicação com stakeholders e relatórios ambientais.
                  </p>
                </div>
              </div>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start gap-4">
                <FaSeedling className="text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg">Agropecuária</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Rastreabilidade de produtos, gestão da cadeia de suprimentos, certificações 
                    de qualidade e comunicação com parceiros comerciais.
                  </p>
                </div>
              </div>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start gap-4">
                <FaHeartbeat className="text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg">Saúde</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Prestação de serviços médicos, gestão de pacientes, agendamentos, faturação 
                    e conformidade com regulamentos de saúde, sempre com estrito sigilo.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaExclamationTriangle className="text-yellow-600 mr-3" />
            <span>3. Base Legal</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Consentimento</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Quando você nos fornece dados voluntariamente, como ao subscrever nossa newsletter.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Execução de Contrato</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Para cumprir nossas obrigações em contratos de compra/venda ou prestação de serviços.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Obrigação Legal</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Para cumprir com requisitos fiscais, regulatórios ou de compliance.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Interesse Legítimo</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Para melhorar nossos serviços, segurança e prevenção de fraudes.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaShieldAlt className="text-blue-600 mr-3" />
            <span>4. Segurança e Partilha de Dados</span>
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg">Medidas de Segurança</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Implementamos medidas técnicas e organizacionais robustas, incluindo:
              </p>
              <ul className="mt-2 space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-400">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controlos de acesso baseados em funções</li>
                <li>Monitorização contínua de segurança</li>
                <li>Procedimentos de resposta a incidentes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg">Partilha de Dados</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Podemos partilhar seus dados com:
              </p>
              <ul className="mt-2 space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-400">
                <li>Parceiros comerciais essenciais para prestação de serviços</li>
                <li>Fornecedores de serviços com obrigações contratuais de confidencialidade</li>
                <li>Autoridades reguladoras quando exigido por lei</li>
                <li>Instituições financeiras para processamento de pagamentos</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaFileAlt className="text-indigo-500 mr-3" />
            <span>5. Cookies e Tecnologias Similares</span>
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              Utilizamos cookies e tecnologias similares para melhorar a experiência do usuário, 
              analisar tráfego e personalizar conteúdo. Os cookies são classificados como:
            </p>
            <ul className="space-y-2 pl-5 list-disc">
              <li><strong>Essenciais:</strong> Necessários para o funcionamento básico do site</li>
              <li><strong>Desempenho:</strong> Para analisar uso do site e melhorar performance</li>
              <li><strong>Funcionalidade:</strong> Para lembrar preferências e personalizar experiência</li>
              <li><strong>Marketing:</strong> Para mostrar conteúdo relevante (requer consentimento explícito)</li>
            </ul>
            <p>
              Você pode gerir suas preferências de cookies através das configurações do seu navegador 
              ou do nosso banner de consentimento.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaUserCheck className="text-green-600 mr-3" />
            <span>6. Direitos do Titular</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Acesso e Retificação</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Solicitar cópia dos seus dados ou corrigir informações inexatas.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Eliminação</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Solicitar apagamento dos seus dados quando aplicável por lei.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Oposição e Restrição</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Opor-se a tratamentos específicos ou limitar o uso dos seus dados.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-indigo-600 dark:text-indigo-400">Portabilidade</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Receber seus dados em formato estruturado para transferência.
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Para exercer estes direitos, entre em contacto através dos canais indicados abaixo.
            Poderemos solicitar verificação de identidade para proteção dos seus dados.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FaHome className="text-purple-600 mr-3" />
            <span>7. Contactos e Dúvidas</span>
          </h2>
          <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-medium text-lg text-indigo-700 dark:text-indigo-300">Encarregado de Proteção de Dados</h3>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>Email:</strong> bgs.soluction@gmail.com</p>
              <p><strong>Telefone:</strong> +258 845826662 / 875826662</p>
              <p><strong>Horário de atendimento:</strong> Segunda a Sexta, 8h-17h</p>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Reservamo-nos o direito de atualizar esta política periodicamente. Alterações 
              significativas serão comunicadas através dos nossos canais oficiais.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}