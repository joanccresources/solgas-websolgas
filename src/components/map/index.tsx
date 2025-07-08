'use client'
import React, { useEffect, useState} from 'react'; 

import {APIProvider, Map, useMap} from '@vis.gl/react-google-maps';
import {ClusteredMarkers} from './components/clustered-markers'; 
import {  CastlesGeojson} from './castles';

import './style.css';
import {Feature, Point} from 'geojson';  
import { stationServiceAtom } from '@/store';
import { useAtom } from 'jotai'; 

const MapComponent = () => {
  const map = useMap();
  const [items] = useAtom(stationServiceAtom);
  useEffect(() => {
    if (map &&  items?.center ) {
      map.setCenter({ lat: items?.center.lat , lng: items?.center.lng});  
      map.setZoom(16);
    }
  }, [map, items]);
 
  return null; // Este componente no renderiza nada en la interfaz
};

const App = ({token_map}: {token_map: string}) => {
  const [geojson, setGeojson] = useState<CastlesGeojson | null>(null);
  const [latDefault, setLatDefault] = useState<number>(0);
  const [longDefault, setLongDefault] = useState<number>(0);
  const [, setNumClusters] = useState(0);
  const [items] = useAtom(stationServiceAtom);
 

  const [, setInfowindowData] = useState<{
    anchor: google.maps.marker.AdvancedMarkerElement;
    features: Feature<Point>[];
  } | null>(null);


  useEffect(() => { 
    if(items) {
      setGeojson({
        type: 'FeatureCollection',
        features: (items.data ?? []).map((item, index) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [Number(item.longitude), Number(item.latitude)],      
          },
          properties: {
            id: index,  // Se asigna un ID único con el índice
            name: item.name || 'No name available',  // Aseguramos que 'name' siempre esté presente
            wikipedia: item.name || 'No wikipedia link',  // En caso de que 'wikipedia' no esté, se asigna un valor predeterminado
            wikidata: item.name || 'No wikidata',  // Lo mismo para 'wikidata'
          },
        })),
      });

    if(items?.data) {
      const element = items.data.find((item) => item.latitude && item.longitude);
      if(element) setLatDefault(Number(element?.latitude));
      if(element) setLongDefault(Number(element?.longitude));
    } 
  }
  }, [items]); 
 



  return (
    <APIProvider apiKey={token_map} version={'beta'}>
      <Map
        mapId={'LIGHT'}
        defaultCenter={{lat: latDefault, lng: longDefault}}
        defaultZoom={16}
        gestureHandling={'FOLLOW_SYSTEM'}
        disableDefaultUI
        onClick={() => setInfowindowData(null)}
        className={'w-full lg:h-[620px] h-[290px]'}>
          <MapComponent />
        {geojson && (
          <ClusteredMarkers
            geojson={geojson}
            setNumClusters={setNumClusters}
            setInfowindowData={setInfowindowData}
          />
        )} 
      </Map> 
    </APIProvider>
  );
};

export default App;

 