import React from "react";
import { FaFacebook, FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedin,
};

export default function TeamCard({ member }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center">
        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#F4B400] mb-6"
          loading="lazy"
        />
        <h2 className="text-xl md:text-2xl font-semibold text-[#1F2E54] text-center">
          {member.name}
        </h2>
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
      <div className="mt-10 text-[#1F2E54]">
        <div className="grid lg:grid-cols-2 gap-6 mt-4">
          <div className="text-center">
            <p className="font-thin py-2">Azimo</p>
            <span className="font-semibold text-[#1F2E54]">
              Desenvolvedor Web
            </span>
            <p>+25884314455</p>
            <div className="flex justify-center gap-2 mt-4">
              <a
                href="https://wa.me/25884314455"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1D6978] transition-colors duration-200"
                aria-label="Whatsapp de Azimo"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.linkedin.com/in/ali-azimo-0240142b0/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1D6978] transition-colors duration-20"
                aria-label="LinkedIn de Azimo"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/azimo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1D6978] transition-colors duration-20"
                aria-label="GitHub de Azimo"
              >
                <FaGithub />
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="font-thin py-2">Aderito</p>
            <span className="font-semibold text-[#1F2E54]">BGS Manager</span>
            <p>+258 84 250 7746</p>
            <div className="flex justify-center gap-2 mt-4">
              <a
                href="https://wa.me/+258842507746"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1D6978] transition-colors duration-200"
                aria-label="Whatsapp de Azimo"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.linkedin.com/in/azimo/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1D6978] transition-colors duration-20"
                aria-label="LinkedIn de Azimo"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
