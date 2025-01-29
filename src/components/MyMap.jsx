import React, { useEffect, useState,useRef, useContext } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';

import { useGeographic } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Polygon, LineString, Point,Circle } from 'ol/geom';
import { Vector as VectorSource} from 'ol/source';
import {get} from 'ol/proj.js';
import { transform } from 'ol/proj';
import { getDistance } from 'ol/sphere';
import {TileWMS} from 'ol/source';
import LayerGroup from 'ol/layer/Group';
import BaseMapSelecter from './BaseMapSelecter';
import { MapContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faCircle,faDrawPolygon,faBroom,faArrowPointer } from '@fortawesome/free-solid-svg-icons'


import '../myMap.css';





import {Draw, Modify, Snap} from 'ol/interaction.js';






function MyMap() {

    const {setGlobalMap,globalMap, selectedBaseMap, setMapLayers, mapLayers,layerNumRef } = useContext(MapContext);

    useGeographic();
    const [locationInfo, setLocationInfo] = useState(null); 
    const[map,setMap] = useState(null);
    const[draw,setDraw] = useState(null);
    const[snap,setSnap] = useState(null);
    //const[shapeLayerList,setShapeLayerList] = useState([]);
    const[baseMapLayers,setBaseMapLayers] = useState([]);
    const[baseLayerGroup,setBaseLayerGroup] = useState(null);
    const[usedButton,setUsedButton] = useState(1);
    
    const[urls,setUrls] = useState(()=>{
        const xa =localStorage.getItem('mapLayerApis')
        if(xa){
            const parsedX = JSON.parse(xa);
            return parsedX;
        }
        return [];
    })
    /*
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });
    */

    useEffect(()=>{
        if(urls){
            localStorage.setItem('mapLayerApis', JSON.stringify(urls));
        }
    },[urls])

    const BaseUrl = "http://localhost:8080/geoserver/ws1/"

    const wfsUrl1 =
    `${BaseUrl}ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws1%3Aankara_il_alan&maxFeatures=50&outputFormat=application%2Fjson`;

    // WFS Verisini İşlemek için Vector Kaynağı
    const vectorSource1 = new VectorSource({
        format: new GeoJSON(),
        url: wfsUrl1, // WFS URL'si
    });

    const wfsUrl2 =
    `${BaseUrl}ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws1%3Agis_osm_buildings_a_free_1&maxFeatures=100&outputFormat=application%2Fjson`;

    const wfsUrl3 =
    `${BaseUrl}ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws1%3Aall_shapes&maxFeatures=100&outputFormat=application%2Fjson`;

    // WFS Verisini İşlemek için Vector Kaynağı
    const vectorSource2 = new VectorSource({
        format: new GeoJSON(),
        url: wfsUrl2, 
    });

    const vectorSource  = new VectorSource();
    const vectorLayer  = new VectorLayer({
    source: vectorSource,
    style: {
        'fill-color': 'rgba(255, 255, 255, 0.2)',
        'stroke-color': '#ffcc33',
        'stroke-width': 2,
        'circle-radius': 7,
        'circle-fill-color': '#ffcc33',
    },
    });

    useEffect(()=>{
        if(baseLayerGroup){
            const layersArray = baseLayerGroup.getLayers().getArray();


            layersArray[0].setVisible(false); // BaseMap1'i gizle
            layersArray[1].setVisible(false); // BaseMap2'yi gizle
            layersArray[2].setVisible(false); // BaseMap1'i gizle
            layersArray[3].setVisible(false); // BaseMap2'yi gizle


            if (selectedBaseMap === 1) {
                layersArray[0].setVisible(true);  // BaseMap1'i görünür yap
            } else if (selectedBaseMap === 2) {
                layersArray[1].setVisible(true);  // BaseMap2'yi görünür yap
            }else if (selectedBaseMap === 3) {
                layersArray[2].setVisible(true);  // BaseMap1'i görünür yap
            } else if (selectedBaseMap === 4) {
                layersArray[3].setVisible(true);  // BaseMap2'yi görünür yap
            }
        }
        
    },[selectedBaseMap,baseLayerGroup])

    useEffect(() => {


        const baseMap1 = new TileLayer({
            source: new OSM(),
            visible: true,
            title: "1"
        });

        const baseMap2 = new TileLayer({
            source: new XYZ({
                url: 'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}@2x.jpg',
                attributions: 'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://openstreetmap.org/">OpenStreetMap</a>, under <a href="https://www.openstreetmap.org/copyright">ODbL</a>.'
            }),
            visible: false,
            title: "2"
        });


        const baseMap3 = new TileLayer({
            source: new XYZ({
                url: 'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}@2x.png',
                attributions: 'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://openstreetmap.org/">OpenStreetMap</a>, under <a href="https://www.openstreetmap.org/copyright">ODbL</a>.'
            }),
            visible: false,
            title: "3"
        });

        const baseMap4 =new TileLayer({
            source: new OSM({
                url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}@2x.png',
                attributions: 'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://openstreetmap.org/">OpenStreetMap</a>, under <a href="https://www.openstreetmap.org/copyright">ODbL</a>.'
                
            }),
            title: "4",
            visible: false,
        });
        
        

        const baseLayerGroup = new LayerGroup({
            layers:[
                baseMap1,
                baseMap2,
                baseMap3,
                baseMap4
            ]
        })
        setBaseLayerGroup(baseLayerGroup);
        setBaseMapLayers((prevlist) => [...prevlist,baseMap1]);
        setBaseMapLayers((prevlist) => [...prevlist,baseMap2]);
        setBaseMapLayers((prevlist) => [...prevlist,baseMap3]);
        setBaseMapLayers((prevlist) => [...prevlist,baseMap4]);

        
        const mapInstance = new Map({
            target: "map",
            layers: [
                baseLayerGroup,

                /*
                new TileLayer({
                    source: new TileWMS({
                      url: "http://localhost:8080/geoserver/ws1/wms",
                      params: {
                        LAYERS: 'workspace:ankara_il_alan', // Katman adı
                        TILED: true,
                      },
                      serverType: 'geoserver',
                    }),
                  }),
                vectorLayer,
                */
               
                /*
                new TileLayer({
                    source: new TileWMS({
                      url: "http://localhost:8080/geoserver/ws1/wms",
                      params: {
                        LAYERS: 'workspace:all_shapes', // Katman adı
                        TILED: true,
                      },
                      serverType: 'geoserver',
                    }),
                  }),

                 
                new VectorLayer({
                    source: vectorSource1,
                    style: new Style({
                        fill: new Fill({
                            color: 'rgba(202, 177, 107, 0.14)', // Hafif saydam yeşil
                        }),
                        stroke: new Stroke({
                            color: '#000000', // Siyah kenar
                            width: 2, // Kenar genişliği
                        }),
                    }),
                }),
                new VectorLayer({
                    source: vectorSource2,
                    style: new Style({
                        fill: new Fill({
                            color: 'rgb(15, 145, 84)', // Hafif saydam yeşil
                        }),
                        stroke: new Stroke({
                            color: '#000000', // Siyah kenar
                            width: 1, // Kenar genişliği
                        }),
                    }),
                }),
                */   
            ],
            view: new View({
                center: [32.5, 39.5], 
                zoom: 8,
            }),

        });

        

        /*
        map.on('click', evt => {
            const coordinates = evt.coordinate; // Harita üzerindeki koordinatlar (x, y)
            //console.log('Coordinates:', coordinates);
            const lonLat = (coordinates); // Koordinatları WGS84'e dönüştür
            //findlocationInfo(lonLat, setLocationInfo, setLoading, setError);
            //addPoint(map,[0, 0])
            
        });
        */
        
        

        setMap(mapInstance);
        setGlobalMap(mapInstance)
        

        return () => {
            mapInstance.setTarget(null); 
        };
        
    }, []);

    
    
    const handleSelect = (e) => {
        const type = e.target.value;
        //console.log(baseMapLayers)


        


        //console.log(shapeLayerList)

        if (draw) map.removeInteraction(draw); 
        if (snap) map.removeInteraction(snap); 


        if(type==="None"){
                setUsedButton(1);
                return;
        }
        else if(type==="Polygon"){
            setUsedButton(2);
        }
        else if(type==="Circle"){
            setUsedButton(3);
        }

        const newDraw = new Draw({
            source: vectorSource,
            type,
        });

        const newSnap = new Snap({ source: vectorSource });

        setDraw(newDraw);
        setSnap(newSnap);

        map.addInteraction(newDraw);
        map.addInteraction(newSnap);

        newDraw.on('drawend', (event) => {
            const geometry = event.feature.getGeometry();
            fetchShapesInArea(geometry);
            // Layer numarasını artır
            const currentLayerNum = layerNumRef.current;
            layerNumRef.current = currentLayerNum + 1;
            //setLayerNum((prev)=>prev+1);
            //console.log(shapeLayerList.length)
            
            
        });
    };


    const fetchShapesInArea = (geometry) => {
        let wfsUrlSelectedShapes;

        if (geometry.getType() === 'Circle') {
            const center = geometry.getCenter(); 

            const edgeCoordinate = [
                center[0] + geometry.getRadius(), 
                center[1],
            ]; 

            const distance = getDistance(center, edgeCoordinate);
            wfsUrlSelectedShapes =
            `http://localhost:8080/geoserver/ws1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws1:gis_osm_buildings_a_free_1&maxFeatures=100&outputFormat=application/json&CQL_FILTER=DWITHIN(geom,POINT(${center[0]} ${center[1]}),${distance},meters)`;
            
           
        }
        else if (geometry.getType() === 'Polygon') {
            const polygonCoordinates = geometry.getCoordinates(); 
            
            const wktPolygon = polygonCoordinates[0].map(coord => `${coord[0]} ${coord[1]}`).join(', ');
    
           
            wfsUrlSelectedShapes =
                `http://localhost:8080/geoserver/ws1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws1:gis_osm_buildings_a_free_1&maxFeatures=100&outputFormat=application/json&CQL_FILTER=INTERSECTS(geom, POLYGON((${wktPolygon})))`;           
        }
        



        // WFS Verisini İşlemek için Vector Kaynağı
        const vectorSourceSelectedShapes = new VectorSource({
            format: new GeoJSON(),
            url: wfsUrlSelectedShapes, 
        });

        // VectorLayer oluşturun
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
        
        setUrls(prev=> [...prev,wfsUrlSelectedShapes])
        
        map.addLayer(vectorLayerSelectedShapes);
        addToShapeLayerList(vectorLayerSelectedShapes);
    };

    const addToShapeLayerList = (vectorLayerSelectedShapes) => {
        setMapLayers((prevlist) => [...prevlist,vectorLayerSelectedShapes]);
        
    };

    const clearMap = () => {

       
        //console.log(shapeLayerList);
        //console.log(shapeLayerList.length)
        for (let i = 0; i < mapLayers.length; i++) {
            console.log("asdasd")
            const layer = mapLayers[i];
            //console.log(layer.name)
            map.removeLayer(layer);
        }
    };

    useEffect(()=>{
        const PolygonButton = document.getElementById('Polygon');
        const CircleButton = document.getElementById('Circle');
        const NoneButton = document.getElementById('None');
        PolygonButton.style.backgroundColor = '#272626';
        CircleButton.style.backgroundColor = '#272626';
        NoneButton.style.backgroundColor = '#272626';

        if(usedButton===1){
            NoneButton.style.backgroundColor = 'rgb(128, 43, 207)';
        }
        else if(usedButton===2){
            PolygonButton.style.backgroundColor = 'rgb(128, 43, 207)';
        }
        else if(usedButton===3){
            CircleButton.style.backgroundColor = 'rgb(128, 43, 207)';
        }

    },[usedButton]);
    
    return <div className='mapComp'>
            
        <button onClick={handleSelect} value="None" id='None'><FontAwesomeIcon icon={faArrowPointer} style={{ pointerEvents: 'none' }}/></button>
        <button onClick={handleSelect} value="Polygon" id='Polygon'><FontAwesomeIcon icon={faDrawPolygon} style={{ pointerEvents: 'none' }}/></button>
        <button onClick={handleSelect} value="Circle" id='Circle'><FontAwesomeIcon icon={faCircle} style={{ pointerEvents: 'none' }}/></button>
        {//<button onClick={clearMap} id='Clear'><FontAwesomeIcon icon={faBroom} style={{ pointerEvents: 'none' }}/></button>
        }
        
        <div id="map"></div>
    </div>
}


export default MyMap;