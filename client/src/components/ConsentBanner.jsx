// src/ConsentBanner.jsx
import { useState, useEffect } from 'react';
import { initGA, logPageView } from '../ga';

const STORAGE_KEY = 'bgs_consent'; // 'accepted' | 'denied'

export default function ConsentBanner({ measurementId }) {
  const [consent, setConsent] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEY);
  });

  // Inicializa GA se já tiver sido aceite
  useEffect(() => {
    if (consent === 'accepted') {
      initGA(measurementId);
      logPageView();
    }
  }, [consent, measurementId]);

  // Handler aceitação
  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
  };

  // Handler recusa
  const deny = () => {
    localStorage.setItem(STORAGE_KEY, 'denied');
    setConsent('denied');
  };

  // Não mostrar se já decidiu
  if (consent === 'accepted' || consent === 'denied') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between gap-3 z-50">
      <div className="flex-1 text-sm">
        Queremos melhorar a sua experiência neste site com dados anónimos.  
            Deseja ativar as estatísticas de navegação?  
        <div className="mt-1">
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Política de privacidade
          </a>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm"
        >
          Aceitar
        </button>
        <button
          onClick={deny}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
