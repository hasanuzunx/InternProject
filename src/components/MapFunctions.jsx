// components/MapFunctions.js
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj'; // Koordinat dönüşümü için gerekli
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Icon } from 'ol/style';




export function addPoint(map, coordinates) {
    const vectorSource = map.getLayers().item(1).getSource(); // VectorSource'u alın
    const feature = new Feature({
      geometry: new Point(coordinates),
    });
    vectorSource.addFeature(feature);
    //console.log("Point eklendi: ", coordinates);
  }


export function addLine(map, coordinates) {
    const source = new VectorSource();
    const layer = new VectorLayer({
        source: source,
    });
    map.addLayer(layer);
    //console.log(coordinates);

    const line = new Feature({
        geometry: new LineString(coordinates),
        
    });
    source.addFeature(line);
}

export function addRectangle(map,coordinates){
    const source = new VectorSource();
    const layer = new VectorLayer({
        source:source
    });
    map.addLayer(layer);

    const rectangle = new Feature({
        geometry: new Polygon([coordinates]),
    });
    source.addFeature(rectangle);
}

// findlocationInfo fonksiyonu (harita tıklama ile çağrılacak veri çekme fonksiyonu)
export function findlocationInfo(coordinates, setLocationInfo, setLoading, setError) {
    const url =
      "http://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Places_CouSub_ConCity_SubMCD/MapServer/15/query" +
      `?outFields=*
      &geometryType=esriGeometryPoint
      &geometry=${coordinates[0]},${coordinates[1]}
      &inSR=4326
      &f=json`;
  
    const fetchLocationData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        //console.log("Data received from API: ", data.features[0].attributes.NAME); // API'den dönen veriyi logla
        if (data.features && data.features.length > 0) {
          setLocationInfo(data.features); // Dönen veriyi state'e kaydet
        } else {
          setLocationInfo([]); // Verinin boş olduğu durum
          console.error("No features found for the given coordinates.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLocationData();
  }


  
