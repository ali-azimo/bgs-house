import React, { useRef, useState } from "react";
import { FaEnvelope, FaCheck } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center text-[#1F2E54]">
        Envie-nos uma Mensagem
      </h3>

      <form className="space-y-4" ref={form} onSubmit={sendEmail}>
        {[
          { id: "username", label: "Nome", type: "text", placeholder: "Seu nome" },
          { id: "subject", label: "Assunto", type: "text", placeholder: "Assunto" },
          { id: "useremail", label: "Email", type: "email", placeholder: "Seu email" },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-gray-700 mb-2">{label}</label>
            <input
              id={id}
              type={type}
              name={id}
              placeholder={placeholder}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition"
            />
          </div>
        ))}

        <div>
          <label htmlFor="message" className="block text-gray-700 mb-2">Mensagem</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Escreva a sua mensagem..."
            required
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition"
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
          className={`w-full py-3 px-4 rounded-lg font-bold transition duration-200 flex items-center justify-center gap-2 text-[#1F2E54] ${
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
  );
}
