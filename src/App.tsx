import MyMap from './components/MyMap.jsx'
import './App.css'
import React, { createContext, useState, useRef, useEffect } from 'react';
import LeftBox from './components/LeftBox';
import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

interface MapContextType {
	globalMap: unknown[];
	setGlobalMap: React.Dispatch<React.SetStateAction<unknown[]>>;
	mapLayers: VectorLayer[];
	setMapLayers: React.Dispatch<React.SetStateAction<VectorLayer[]>>;
	selectedBaseMap: number;
	setSelectedBaseMap: React.Dispatch<React.SetStateAction<number>>;
	layerNumRef: React.MutableRefObject<number>;
}


export const MapContext = createContext<MapContextType>();

function App() {

	const layerNumRef = useRef(1);
	const [mapLayers, setMapLayers] = useState(() => {
		const apis = localStorage.getItem('mapLayerApis');
	  
		if (apis) {
		  const parsedApis = JSON.parse(apis);
		  
		  const layers = parsedApis.map(api => {
			const vectorSourceSelectedShapes = new VectorSource({
			  format: new GeoJSON(),
			  url: api, 
			});
		
			const vectorLayerSelectedShapes = new VectorLayer({
			  source: vectorSourceSelectedShapes,
			  style: new Style({
				fill: new Fill({
				  color: '#8bac88', 
				}),
				stroke: new Stroke({
				  color: '#000000', 
				  width: 2, 
				}),
			  }),
			});
			vectorLayerSelectedShapes.set('id', layerNumRef.current);
			const currentLayerNum = layerNumRef.current;
            layerNumRef.current = currentLayerNum + 1;
		
			return vectorLayerSelectedShapes;  // Her bir katmanı döndürüyoruz
		  });
	  
		  // Burada state'e sadece katmanları bir kerede ekliyoruz
		  return layers;
		}
	  
		return []; // Eğer mapLayerApis yoksa boş dizi döner
	});


	const [globalMap, setGlobalMap] = useState([]); 
	
  
	const [selectedBaseMap, setSelectedBaseMap] = useState(() => {
		const savedBaseMap = localStorage.getItem('selectedBaseMap');
		return savedBaseMap ? JSON.parse(savedBaseMap) : 1;
	  });
	
	  useEffect(() => {
		localStorage.setItem('selectedBaseMap', JSON.stringify(selectedBaseMap));
	  }, [selectedBaseMap]);

	return (
		<MapContext.Provider value={{ globalMap,setGlobalMap, mapLayers, setMapLayers, selectedBaseMap, setSelectedBaseMap,layerNumRef }}>
		<div>
			<LeftBox/>
			<MyMap />
		</div>
		</MapContext.Provider>
	)
}

export default App
