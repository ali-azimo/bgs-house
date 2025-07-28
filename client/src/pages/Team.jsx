import React, { useRef, useState } from "react";
import { FaEnvelope, FaCheck, FaFacebook, FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import mungoy from "../assets/img/mungoy.jpg";
import azimo from "../assets/img/Azimo.jpg";
import aderito from "../assets/img/Aderito.jpg";

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedin,
  github: FaGithub,
};

export default function Team() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const teamMembers = [
    {
      name: "Dércio Mauricio Mungoy",
      role: "Especialista em Vendas",
      description:
        "Com mais de 10 anos de experiência, Dércio é um especialista em vendas que ajuda os clientes a encontrar a propriedade perfeita. Profissional comprometido com a excelência e com uma visão clara sobre o mercado imobiliário moçambicano.",
      social: {
        facebook: "https://www.facebook.com/dercio.mungoy",
        whatsapp: "https://wa.me/258842507746",
        linkedin: "https://www.linkedin.com/in/dercio-mungoy",
      },
      image: mungoy,
    },
    {
      name: "Ali Azimo",
      role: "Programador Web",
      description:
        "Ali Azimo é responsável pelo desenvolvimento e manutenção das plataformas digitais da BGS. Com expertise em tecnologias web modernas, ele assegura uma presença online robusta e inovadora para a empresa.",
      social: {
        whatsapp: "https://wa.me/25884314455",
        linkedin: "https://www.linkedin.com/in/ali-azimo-0240142b0/",
        github: "https://github.com/azimo",
      },
      image: azimo,
    },
    {
      name: "Aderito Bule",
      role: "BGS Manager and Mining, Oil and Gas Advisor",
      description:
        "Com vasta experiência no sector de recursos naturais, Aderito contribui com visão estratégica e operacional para os projectos de mineração e energia da BGS.",
      social: {
        whatsapp: "https://wa.me/258842507746",
        linkedin: "https://www.linkedin.com/in/aderito-bule/",
      },
      image: aderito,
    },
  ];

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await emailjs.sendForm(
        "service_390rh7s",
        "template_6aib88t",
        form.current,
        "F1D4D-0fhmjkz2noB"
      );

      setIsSuccess(true);
      form.current.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError("Erro ao enviar. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1F2E54] mb-4">A Nossa Equipa</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Conheça os profissionais que tornam a BGS uma referência em confiança, excelência e compromisso em Moçambique e no mundo.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#F4B400] mb-6"
                loading="lazy"
              />
              <h2 className="text-xl md:text-2xl font-semibold text-[#1F2E54] text-center">{member.name}</h2>
              <p className="text-[#00AEEF] font-medium mt-2">{member.role}</p>
              <p className="text-gray-700 mt-4 text-sm md:text-base text-center leading-relaxed">
                {member.description}
              </p>
            </div>
            <div className="flex justify-center gap-6 mt-8 text-2xl text-[#1F2E54]">
              {Object.entries(member.social).map(([platform, url]) => {
                const Icon = SOCIAL_ICONS[platform];
                return Icon ? (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F4B400] transition-colors duration-200"
                    aria-label={`${platform} de ${member.name}`}
                  >
                    <Icon />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white p-6 md:p-10 rounded-2xl shadow-xl">
        <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center text-[#1F2E54]">
          Envie-nos uma Mensagem
        </h3>

        <form className="space-y-6" ref={form} onSubmit={sendEmail}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ id: "username", label: "Nome", type: "text", placeholder: "Seu nome" }, { id: "subject", label: "Assunto", type: "text", placeholder: "Assunto" }, { id: "useremail", label: "Email", type: "email", placeholder: "Seu email" }].map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-sm text-gray-700 mb-1 font-medium">{label}</label>
                <input
                  id={id}
                  type={type}
                  name={id}
                  placeholder={placeholder}
                  required
                  className="p-3 rounded-xl border border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:bg-white transition"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm text-gray-700 mb-1 font-medium">Mensagem</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Escreva a sua mensagem..."
              required
              className="p-3 rounded-xl border border-gray-300 bg-gray-50 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:bg-white transition"
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {isSuccess && (
            <div className="flex items-center gap-2 text-green-600">
              <FaCheck />
              <span>Mensagem enviada com sucesso!</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-xl font-bold transition duration-200 flex items-center justify-center gap-2 text-[#1F2E54] ${
              isSubmitting ? "bg-[#F4B400]/70 cursor-not-allowed" : "bg-[#F4B400] hover:bg-[#e3a800]"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <FaEnvelope />
                Enviar Mensagem
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}