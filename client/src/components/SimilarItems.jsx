import { Link } from 'react-router-dom';

export default function SimilarContent({ items = [], type = 'blog' }) {
  if (!items || items.length === 0) {
    return (
      <div className="mt-16 text-center text-gray-500 text-lg">
        Sem item semelhante.
      </div>
    );
  }

  // Define o path base consoante o tipo
  const basePath = {
    blog: 'blog',
    agri: 'agri',
    diver: 'diver',
    minin: 'minin',
    saude: 'saude',
    imo: 'imo',
  }[type] || 'blog';

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {type === 'imo' ? 'Propriedades Relacionadas' : 'Artigos Relacionados'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition duration-300 overflow-hidden"
          >
            {item.imageUrls ? (
              <img
                src={item.imageUrls}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Sem imagem
              </div>
            )}

            <div className="p-4">
              <h3 className="text-md font-semibold text-slate-800 mb-2 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {item.description?.substring(0, 100) || 'Sem conteúdo'}...
              </p>
              <Link
                to={`/${basePath}/${item._id}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Ler mais →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
