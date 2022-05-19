import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import magic_numbers from './magic_numbers.json';


const raster = new TileLayer({
    source: new OSM(),
});

const source = new VectorSource({wrapX: false});
source.on('addfeature', function(evt){
    var feature = evt.feature;
    var coords = feature.getGeometry().getCoordinates();
    console.log(coords);
});

const vector = new VectorLayer({
    source: source,
});

const map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: magic_numbers.focus_point,
        zoom: 17,
    }),
});

const typeSelect = document.getElementById('type');

let draw; // global so we can remove it later
function addInteraction() {
    const value = typeSelect.value;
    if (value !== 'None') {
        draw = new Draw({
            source: source,
            type: typeSelect.value,
        });
        map.addInteraction(draw);
    }
}

/**
 * Handle change event.
 */
typeSelect.onchange = function () {
    map.removeInteraction(draw);
    addInteraction();
};

document.getElementById('undo').addEventListener('click', function () {
    draw.removeLastPoint();
});

addInteraction();
