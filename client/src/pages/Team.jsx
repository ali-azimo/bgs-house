import React from "react";
import TeamCard from "./TeamCard";
import ContactForm from "./ContactForm";
import mungoy from "../assets/img/mungoy.jpg";

export default function Team() {
  const teamMember = {
    name: "Dércio Mauricio Mungoy",
    role: "Especialista em Vendas",
    description:
      "Com mais de 10 anos de experiência, Dércio é um especialista em vendas que ajuda os clientes a encontrar a propriedade perfeita. Profissional comprometido com a excelência e com uma visão clara sobre o mercado imobiliário moçambicano.",
    social: {
      facebook: "https://www.facebook.com/dercio.mungoy",
      whatsapp: "https://chat.whatsapp.com/L2ylfd89TG8JymjjG65sft",
      linkedin: "https://www.linkedin.com/in/dercio-mungoy",
    },
    image: mungoy,
    name: "Dércio Mauricio Mungoy",
    role: "Especialista em Vendas",
    description:
      "Com mais de 10 anos de experiência, Dércio é um especialista em vendas que ajuda os clientes a encontrar a propriedade perfeita. Profissional comprometido com a excelência e com uma visão clara sobre o mercado imobiliário moçambicano.",
    social: {
      facebook: "https://www.facebook.com/dercio.mungoy",
      whatsapp: "https://chat.whatsapp.com/L2ylfd89TG8JymjjG65sft",
      linkedin: "https://www.linkedin.com/in/dercio-mungoy",
    },
    image: mungoy,
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1F2E54] mb-4">A Nossa Equipa</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Conheça os profissionais que tornam a Imobiliária BGS uma referência em confiança, excelência e compromisso no mercado moçambicano.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <TeamCard member={teamMember} />
        <ContactForm />
      </div>
    </section>
  );
}