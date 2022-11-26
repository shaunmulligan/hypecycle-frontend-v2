<script>
import { LeafletMap, TileLayer, Marker, GeoJSON } from 'svelte-leafletjs';

const updateTrackInterval = 1000; //Update every second might be heavy on browser perf

let mapOptions = {
    center: [41.483561819705194, 2.214374347050403],
    zoom: 17,
};

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
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
let updateTrack = true
function routeReloadTimer() {
            let timer = setInterval(function() {
                updateTrack = !updateTrack
            }, updateTrackInterval);
        }
routeReloadTimer()
</script>

<div class="map" >
<LeafletMap bind:this={leafletMap} options={mapOptions = {center: [$myStore.latitude, $myStore.longitude], zoom: 18}} >
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    <Marker latLng={[$myStore.latitude, $myStore.longitude]}/>
    
    {#key updateTrack} 
        <GeoJSON url="http://localhost:8001/geojson/file" options={geoJsonOptions}/>
    {/key}
</LeafletMap>
</div>

<style>
.map{
    height: 100%;
width: 100%;
}
</style>