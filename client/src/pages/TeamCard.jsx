import React from "react";
import { FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";

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
  );
}
