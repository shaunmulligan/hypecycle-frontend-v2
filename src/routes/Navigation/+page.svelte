<script>
import { LeafletMap, TileLayer, Marker} from 'svelte-leafletjs';

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

export let data;
let leafletMap;
let myStore = data.wsStore;
</script>

<div class="map" >
<LeafletMap bind:this={leafletMap} options={mapOptions = {center: [$myStore.latitude, $myStore.longitude], zoom: 17}} >
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    <Marker latLng={[$myStore.latitude, $myStore.longitude]}/>
</LeafletMap>
</div>

<style>
.map{
    height: 100%;
width: 100%;
}
</style>