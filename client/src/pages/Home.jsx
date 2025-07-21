import { Link } from 'react-router-dom';

export default function BemVindo() {
  return (
    <div className="flex flex-col gap-6 py-24 px-6 max-w-6xl mx-auto text-center items-center">
      <h1 className="text-slate-800 font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight">
        Bem-vindo à <span className="text-blue-500">Imobiliária BGS</span>
      </h1>

      <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
        Na <strong>BGS</strong>, transformamos sonhos em realidade. A nossa missão é garantir que encontra o imóvel ideal — seja para viver, investir ou simplesmente começar um novo capítulo.
        <br className="hidden sm:block" />
        Com uma equipa dedicada, um portfólio variado e atenção personalizada, acompanhamos consigo cada passo da jornada.
      </p>

      <Link
        to={'/search'}
        className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
      >
        Descubra agora o seu próximo lar
      </Link>
    </div>
  );
}
