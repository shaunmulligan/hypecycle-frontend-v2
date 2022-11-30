<script>
import { onMount } from 'svelte';
import { LeafletMap, TileLayer, Marker, GeoJSON } from 'svelte-leafletjs';
import 'leaflet.offline';
import L from 'leaflet';
import { urlTemplate } from '../../lib/services/offline-map-const';
import storageLayer from '$lib/services/storageLayer';

const updateTrackInterval = 1000; //Update every second might be heavy on browser perf

let mapOptions = {
    center: [41.483561819705194, 2.214374347050403], //TODO: these need to be dynamically centered if we have a fix
    zoom: 17,
};

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; //TODO: figure out how to store these offline
const tileLayerOptions = {
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 19,
    attribution: "© OpenStreetMap contributors",
};

const geoJsonOptions = {
    style: function(geoJsonFeature) {
        // console.log('style', geoJsonFeature);
        return {};
    },
    onEachFeature: function(feature, layer) {
        // console.log('onEachFeature', feature, layer);
    },
};

export let data;
let leafletMap;
let myStore = data.wsStore;
let updateTrack = true // This is tied to the #key so that we can periodically update the GeoJSON component.
let geoData = {"type": "FeatureCollection", "features": []}
function routeReloadTimer() {
            let timer = setInterval(function() {
                updateTrack = !updateTrack
                fetch("http://localhost:8001/geojson/")
                .then((response) => response.json())
                .then((data) => {
                    geoData = data
                });
            }, updateTrackInterval);
        }
routeReloadTimer()

onMount(async () => {
    let map = leafletMap.getMap()
    const baseLayer = L.tileLayer
        .offline(urlTemplate, {
            attribution: 'Map data {attribution.OpenStreetMap}',
            subdomains: 'abc',
            minZoom: 11,
        })
        .addTo(map)
    
    const control = L.control.savetiles(baseLayer, {
        zoomlevels: [15, 11], // optional zoomlevels to save, default current zoomlevel
        confirm(layer, successCallback) {
            // eslint-disable-next-line no-alert
            if (window.confirm(`Save ${layer._tilesforSave.length}`)) {
                console.log("saving tiles")
            successCallback();
            }
        },
        confirmRemoval(layer, successCallback) {
            // eslint-disable-next-line no-alert
            if (window.confirm('Remove all the tiles?')) {
            successCallback();
            }
        },
        saveText:
            '<i class="fa fa-download" aria-hidden="true" title="Save tiles"></i>',
        rmText: '<i class="fa fa-trash" aria-hidden="true"  title="Remove tiles"></i>',
    });
    control.addTo(map);

    map.setView(
    {
        lat: 41.393137,
        lng: 2.1363948,
    },
    15,);

    let progress;
    baseLayer.on('savestart', (e) => {
        progress = 0;
        let total = e._tilesforSave.length;
        console.log(total)
    });
    baseLayer.on('savetileend', () => {
        progress += 1;     
        console.log(progress)
    });
    });
</script>

<div class="map" >
<LeafletMap bind:this={leafletMap} options={mapOptions = {center: [$myStore.latitude, $myStore.longitude], zoom: 18}} >
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    <Marker latLng={[$myStore.latitude, $myStore.longitude]}/>
    
    {#key updateTrack} 
        <!-- TODO: Probably shouldn't hardcode the URL here -->
        <GeoJSON data={geoData} options={geoJsonOptions}/>
    {/key}
</LeafletMap>
</div>

<style>
.map{
    height: 100%;
width: 100%;
}
</style>