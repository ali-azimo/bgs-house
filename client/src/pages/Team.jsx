import React, { useRef } from "react";
import mungoy from "../assets/img/mungoy.jpg";
import { FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import emailjs from '@emailjs/browser'


export default function Team() {
    // Inicialização do EmailJS
    const form = useRef();

    // Configuração do EmailJS
    const sendEmail = (e) => {
        e.preventDefault();
        
        emailjs
          .sendForm(
            "service_lj0ov55",
            "template_dx0lbmb",
            form.current,
            "lmivO-YGXOjgc6gF3"
          )
          .then(
            (result) => {
              console.log(result.text);
              alert("Mensagem enviada com sucesso!");
            },
            (error) => {
              console.log(error.text);
              alert("Erro ao enviar mensagem. Tente novamente.");
            }
          );
    }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#1F2E54]">
        A Nossa Equipa
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Conheça os profissionais que tornam a Imobiliária BGS uma referência em confiança, excelência e compromisso no mercado moçambicano.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Perfil */}
        <div className="bg-white p-8 rounded-2xl shadow-xl transition hover:shadow-2xl">
          <img
            src={mungoy}
            alt="Dércio Mauricio Mungoy"
            className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-[#F4B400] object-cover"
          />
          <h2 className="text-2xl font-semibold text-center text-[#1F2E54]">
            Dércio Mauricio Mungoy
          </h2>
          <p className="text-[#00AEEF] text-center font-medium mt-1">Especialista em Vendas</p>
          <p className="text-gray-700 text-center mt-4 text-sm leading-relaxed">
            Com mais de 10 anos de experiência, Dércio é um especialista em vendas que ajuda os clientes a encontrar a propriedade perfeita. Profissional comprometido com a excelência e com uma visão clara sobre o mercado imobiliário moçambicano.
          </p>

          {/* Ícones de contato */}
          <div className="flex justify-center gap-6 mt-6 text-2xl text-[#1F2E54]">
            <a
              href="https://www.facebook.com/dercio.mungoy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4B400] transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://chat.whatsapp.com/L2ylfd89TG8JymjjG65sft"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4B400] transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.linkedin.com/in/dercio-mungoy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4B400] transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Formulário de mensagem */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-semibold mb-6 text-center text-[#1F2E54]">
            Envie-nos uma Mensagem
          </h3>
          <form className="space-y-5" ref={form} onSubmit={sendEmail}>
            <div>
              <label className="block text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                name="username"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Assunto</label>
              <input
                type="text"
                placeholder="Assunto"
                name="subject"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="useremail"
                placeholder="Seu email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Mensagem</label>
              <textarea
                rows="4"
                name="message"
                placeholder="Escreva sua mensagem..."
                className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              ></textarea>
            </div>
            <button
              className="w-full bg-[#F4B400] text-[#1F2E54] font-bold py-3 rounded-xl hover:bg-[#e3a800] transition-colors duration-200"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
