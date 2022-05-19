import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Point, LineString} from 'ol/geom';
import Feature from 'ol/Feature';
import {Style, Circle, Fill, Stroke} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer, Group} from 'ol/layer';
import {Zoom, ScaleLine} from 'ol/control';
import {fromLonLat} from "ol/proj";
import LayerSwitcher from "ol-layerswitcher";

//Импорт координат
import magic_numbers from './magic_numbers.json';
import KML from "ol/format/KML.js";


//Слой для точки-отметки офиса
export var layerPoints = new VectorLayer({
  title: 'OfficePoint',
  source: new VectorSource({
    features: [
      new Feature({
        geometry: new Point(fromLonLat(magic_numbers.point_office))
      })
    ]
  }),
  style: new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({color: '#808080'}),
      stroke: new Stroke({
        color: 'black',
        width: 2
      })
    })
  })
});


//Слой для пути от метро
export var layerLines = new VectorLayer({
  title: 'Route',
  source: new VectorSource({
    features: [
      new Feature({
        geometry: new LineString(magic_numbers.coords),
        name: 'Line'
      })]
  }),
  style: new Style({
    stroke: new Stroke({
      color: '#808080',
      width: 5,
    })
  })
});


//Создание карты-подложки с векторными слоями
export var map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new Group({
      title: 'Data',
      layers: [
        layerPoints,
        layerLines
      ]
    })
  ],
  view: new View({
    center: magic_numbers.focus_point,
    zoom: 17
  }),
  controls: [
    new Zoom(),
    new ScaleLine()
  ]
});

var layerSwitcher = new LayerSwitcher({
  activationMode: 'click',
  startActive: true,
});

map.addControl(layerSwitcher);



