import KML from 'ol/format/KML';
import {map, layerPoints, layerLines} from './main.js';


//Экспорт в KML
document.getElementById("btn_download").onclick = function() {
    for (let layer of [layerPoints, layerLines]) {
        var features = layer.getSource().getFeatures();
        var string = new KML().writeFeatures(features, {
            featureProjection: map.getView().getProjection()
        });
        console.log(string);
        console.log(layer.values_.title);
        download(string, `${layer.values_.title}.kml`, 'text/plain');
    }
}


// Function to download data to a file
//Source: https://stackoverflow.com/a/30832210
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // for IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}