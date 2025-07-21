import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '50%',
  height: '400px', // Altura padrão
};

const center = {
  lat: -25.944966,
  lng: 32.562411,
};

export default function MapMoz() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [open, setOpen] = useState(false);

  if (loadError) {
    return <div className="text-red-500 text-center">Erro ao carregar o mapa.</div>;
  }

  return (
    <div className="w-full my-10 px-4 m-auto flex justify-center">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: false, // Oculta botão de tela cheia
          }}
        >
          <Marker
            position={center}
            title="BGS Imobiliária"
            onClick={() => setOpen(true)}
          />
          {open && (
            <InfoWindow position={center} onCloseClick={() => setOpen(false)}>
              <div className="text-sm">
                <h3 className="font-semibold">BGS Imobiliária</h3>
                <p>Primeira rotunda circular de Maputo</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <p className="text-center text-gray-500">A carregar o mapa...</p>
      )}
    </div>
  );
}
