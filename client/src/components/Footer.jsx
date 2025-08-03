import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1F2E54] text-white pt-12 pb-6 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logotipo e descrição */}
        <div>
          <img src={logo} alt="Logo BGS" className="w-28 mb-4" />
          <p className="text-[#A0AEC0] text-sm mt-1">
            Realizando Sonhos, Construindo Futuros
          </p>
          <div className="flex gap-4 mt-4 text-2xl text-[#F4B400]">
            <a href="#" className="hover:text-white transition duration-200">
              <FaFacebook />
            </a>
            <a href="https://chat.whatsapp.com/L2ylfd89TG8JymjjG65sft" className="hover:text-white transition duration-200">
              <FaWhatsapp />
            </a>
            <a href="#" className="hover:text-white transition duration-200">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition duration-200">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Links rápidos */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#00AEEF]">Links Rápidos</h4>
          <ul className="space-y-2 text-[#CBD5E0]">
            <li><Link to="/" className="hover:text-white">Início</Link></li>
            <li><Link to="/search" className="hover:text-white">Imóveis</Link></li>
            <li><Link to="/about" className="hover:text-white">Sobre Nós</Link></li>
            <li><Link to="/team" className="hover:text-white">Contacte-nos</Link></li>
            <li><Link to="/imo-home" className="hover:text-white">Imobiliária & Investimentos</Link></li>
            <li><Link to="/agri" className="hover:text-white">Agro-Pecuária</Link></li>
            <li><Link to="/saude" className="hover:text-white">Saúde & meio ambiente</Link></li>
            <li><Link to="/minin" className="hover:text-white">Mineração</Link></li>
            <li><Link to="/diver" className="hover:text-white">Serviços diversos</Link></li>
          </ul>
        </div>

        {/* Serviços */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#00AEEF]">Serviços</h4>
          <ul className="space-y-2 text-[#CBD5E0]">
            <li><a href="https://www.bgs-imo.com/search?type=sale" className="hover:text-white">Compra e Venda</a></li>
            <li><a href="https://www.bgs-imo.com/search?type=sale" className="hover:text-white">Arrendamento</a></li>
            <li><a href="https://www.bgs-imo.com/team" className="hover:text-white">Consultoria Imobiliária</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#00AEEF]">Contacto</h4>
          <p className="text-[#CBD5E0] mb-2">Cidade de Maputo, Moçambique</p>
          <p className="text-[#CBD5E0] mb-2 text-sm">+258 82/84/872507746 / 875826662</p>
          <p className="text-[#CBD5E0]"> bgs.infomoz@gmail.com</p>
        </div>
      </div>

      <div className="text-center text-sm text-[#A0AEC0] mt-10 border-t border-gray-700 pt-6">
        &copy; 2025 Imobiliária BGS. Todos os direitos reservados.
      </div>
    </footer>
  );
}
