import MyMap from './components/MyMap.jsx'
import './App.css'
import React, { createContext, useState, useRef, useEffect } from 'react';
import LeftBox from './components/LeftBox';
import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import WalletConnect from './components/WalletConnect'; // ekle


interface MapContextType {
	globalMap: any;
	setGlobalMap: any;
	mapLayers: any;
	setMapLayers: any;
	selectedBaseMap: number;
	setSelectedBaseMap: any;
	layerNumRef: any;
<<<<<<< HEAD
	walletAddress: any;
	isConnected: any;
	setWalletAddress: any;
	setIsConnected: any;
}

import { useSyncProviders } from "./hooks/useSyncProviders"
import { EIP6963ProviderDetail } from 'web3';
=======
}


>>>>>>> 10b5e915fed64ff4f3140d0fc378549b4e759e7d
export const MapContext = createContext<MapContextType | undefined>(undefined);

function App() {


	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	const providers = useSyncProviders()
	
	const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
		try {
			const accounts = (await providerWithInfo.provider.request({
				method: "eth_requestAccounts",
			})) as string[];
	
			if (accounts && accounts.length > 0) {
				setWalletAddress(accounts[0]);
				setIsConnected(true);
				console.log("Bağlanan cüzdan adresi:", accounts[0]);
			}
		} catch (error) {
			console.error("Cüzdan bağlanırken hata:", error);
		}
	};
	

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
	
  
	const [selectedBaseMap, setSelectedBaseMap] = useState(0);
	
	useEffect(() => {
		if(selectedBaseMap!=0)
		{
			localStorage.setItem('selectedBaseMap', JSON.stringify(selectedBaseMap));

			const saveBaseMapToDatabase = async () => {
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			const raw = JSON.stringify({
			"id": 8,
			"selected_base_map": selectedBaseMap
			});

			const requestOptions: RequestInit = {
			method: "PATCH",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
			};

			fetch("http://localhost:3000/api/local_storage/selected_base_map", requestOptions)
			//.then((response) => response.text())
			//.then((result) => console.log(result))
			.catch((error) => console.error(error));
		};
		saveBaseMapToDatabase(); // Tanımladığın fonksiyonu çağır
	}
		
	}, [selectedBaseMap]);

	return (
		<MapContext.Provider value={{ globalMap,setGlobalMap, mapLayers, setMapLayers, selectedBaseMap, setSelectedBaseMap,layerNumRef,walletAddress,isConnected,setWalletAddress, setIsConnected }}>
		<div>
			<LeftBox/>
			<MyMap />
			<WalletConnect />
		</div>
		</MapContext.Provider>
		
	)
}

export default App
