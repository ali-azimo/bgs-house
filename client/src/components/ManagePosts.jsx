import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const postTypes = [
  { key: 'imo', label: 'Imóvel' },
  { key: 'agri', label: 'Agricultura' },
  { key: 'saude', label: 'Saúde' },
  { key: 'diver', label: 'Diversos' },
  { key: 'minin', label: 'Minin' },
];

export default function ManagePosts() {
  const [selectedType, setSelectedType] = useState('imo');
  const navigate = useNavigate();

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const handleAction = (action) => {
    if (action === 'create') {
      navigate(`/create-${selectedType}`);
    } else {
      navigate(`/show-${selectedType}`);
    }
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-[#1F2E54] mb-6">
        Gerir Publicações
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tipo de Post */}
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-xl p-4 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Tipo de Publicação</h2>
            <ul className="flex flex-col gap-2">
              {postTypes.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleSelect(item.key)}
                    className={`w-full text-left px-4 py-2 rounded-xl font-medium transition-colors border ${
                      selectedType === item.key
                        ? 'bg-[#1F2E54] text-white border-[#1F2E54]'
                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ações */}
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-xl p-6 border border-gray-200 flex flex-col gap-6 justify-center items-center h-full">
            <h2 className="text-xl font-semibold text-gray-800">
              Ações para: <span className="text-[#1F2E54]">{postTypes.find(pt => pt.key === selectedType)?.label}</span>
            </h2>
            <div className="flex gap-6">
              <button
                onClick={() => handleAction('create')}
                className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-colors"
              >
                Criar Publicação
              </button>
              <button
                onClick={() => handleAction('view')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-colors"
              >
                Visualizar Publicações
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
