import { useContext, useState } from "react";
import { MapContext } from "../App";
import './styles/layerList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Style,Fill,Stroke } from "ol/style";
import { useEffect } from "react";
import React from "react";
import { Layer } from 'ol/layer'
import VectorLayer from "ol/layer/Vector";


interface LayerState {
    [key: string]: boolean;  // Herhangi bir anahtar (string) ve onun değeri boolean olacak
}
  


function LayerList() {
    const context = useContext(MapContext);
    if (!context) {
    throw new Error("BaseMapSelecter must be used within a MapContext.Provider");
    }

    const { mapLayers, globalMap } = context;

    
    // Katman görünürlüğü için bir state
    const [layerVisibility, setLayerVisibility] = useState<Object>(()=>{
        const vis = localStorage.getItem('layerVisibility');
        if(vis){
            const parsedVis = JSON.parse(vis);
            return parsedVis;
        }
        
        return {};
    });

    const [layerColor, setLayerColor] = useState<Object>(()=>{
        const color = localStorage.getItem('layerColor');
        if(color){
            const parsedColor = JSON.parse(color);
            return parsedColor;
        }
        
        return {};
    });

    

    const [layerName, setLayerName] = useState<Object>(()=>{
        const names = localStorage.getItem('layerName');
        if(names){
            const parsedNames = JSON.parse(names);
            return parsedNames;
        }
        
        return {};
    });





    useEffect(() => {
        const initialLayerNames:object = {};
        mapLayers.forEach( (layer :VectorLayer) => {
            const layerId = layer.get("id");
            initialLayerNames[layerId] = `Layer ${layerId}`;
            let bool=true;
            if(layerVisibility[layer.get('id')]===false)
            {
                bool=false;
            }
            let color :string='#8bac88';
            if(!layerColor[layer.get('id')]){
                setLayerColor(prevState => ({
                    ...prevState,
                    [layerId]:'#8bac88',  // Katmanı göster
                }));
            }
            else{
                color = layerColor[layer.get('id')]; // Yeni renk değeri
            }

            const currentStyle: any = layer.getStyle();
            currentStyle.getFill().setColor(color);
            layer.setStyle(currentStyle); // Güncellenmiş stili katmana uygula

            setLayerVisibility(prevState => ({
                ...prevState,
                [layerId]: bool,  // Katmanı göster
            }));
            
        });
        setLayerName(initialLayerNames);
        
    }, [mapLayers]);


    useEffect(()=>{
        if(globalMap.length!==0){
            mapLayers.forEach((layer:Layer) => {
                if(layerVisibility[layer.get('id')]===true)
                {
                    globalMap.addLayer(layer);
                }
                
            });
        }
    },[globalMap]);


    useEffect(()=>{
        localStorage.setItem('layerColor', JSON.stringify(layerColor));
    },[layerColor])

    useEffect(()=>{
        localStorage.setItem('layerName', JSON.stringify(layerName));
    },[layerName])

    useEffect(()=>{
        localStorage.setItem('layerVisibility', JSON.stringify(layerVisibility));
    },[layerVisibility])



    const handleSeeButton = (layer :Layer) => {
        const layerId = layer.get('id');
        const layerExists = globalMap.getLayers().getArray().some(existingLayer => existingLayer.get('id') === layerId);
        
        if (layerExists) {
            globalMap.removeLayer(layer);
            setLayerVisibility(prevState => ({
                ...prevState,
                [layerId]: false,  // Katmanı gizle
            }));
        } else {
            globalMap.addLayer(layer);
            setLayerVisibility(prevState => ({
                ...prevState,
                [layerId]: true,  // Katmanı göster
            }));
        }
    };

    const handleColorChange = (event:any,layer: VectorLayer) => {
        const layerId = layer.get('id');

        const color = event.target.value; // Yeni renk değeri
        const currentStyle:any = layer.getStyle();
        currentStyle.getFill().setColor(color);
        layer.setStyle(currentStyle); // Güncellenmiş stili katmana uygula
        
        setLayerColor(prevState => ({
            ...prevState,
            [layerId]:color,

        }));
    
    };

    
    

    


   

    return (
        <div className="layerList" id="first">
            {
                mapLayers.map((layer :any) => {
                    const isVisible = layerVisibility[layer.get('id')] !== false; // Katmanın görünürlük durumu
    
                   

                    return (
                        <div  key={layer.get('id')}>
                            {//<label className="label">{layerName[layer.get('id')]}</label>
                            }
                            <input 
                                id={`${layer.get('id')}-input`}
                                className="inputLayerName"
                                type="text" 
                                defaultValue={layerName[layer.get('id')]} 
                                onChange={(event) => {
                                    const updatedName = event.target.value;
                                    const layerId = layer.get('id');
                                    
                                    setLayerName((prevState) => ({
                                        ...prevState,
                                        [layerId]: updatedName, // Katman adını güncelle
                                    }));
                                }}
                            />
                            <div className="buttonContainer">
                                <input className="colorPicker" type="color"  value={layer.getStyle()?.getFill()?.getColor() || "#8bac88"} onChange={(event) => handleColorChange(event,layer)}/>
                                <button 
                                    onClick={() => handleSeeButton(layer)} 
                                    className="seeButton"
                                    style={{
                                        backgroundColor: isVisible ? 'rgba(32, 183, 189, 0.8)' :'rgba(209, 58, 58, 0.8)', 
                                    }}
                                >
                                    {/* Icon, görünürlük durumuna göre değişir */}
                                    <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} style={{ pointerEvents: 'none' }} />
                                </button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default LayerList;
