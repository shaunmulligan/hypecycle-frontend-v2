<script lang="ts">
	import { modalController } from '$ionic/svelte';
	import axios from "axios";
	import {
        bluetooth,
		heart,
		flash,
    } from "ionicons/icons";

	const endpoint = "http://localhost:8001/";
	const iconsMap = {"Cycling Power": flash, "Heart Rate": heart};
	export let deviceList = undefined;
	let pairingList = [];

	console.log('Received props', deviceList);

	const closeOverlay = () => {
		modalController.dismiss({ data: Date.now() });
	};

	const checkBoxChange = (event) => {
		if (event.detail.value) {
			if (event.detail.checked) {
				pairingList.push(event.detail.value)
			} else {
				const index = pairingList.findIndex(object => {
					return object.address === event.detail.value.address;
				});
				console.log("index is:", index)
				if (index > -1) { // only splice array when item is found
					pairingList.splice(index, 1); // 2nd parameter means remove one item only
				}
			}
			console.log(pairingList);
		}
	};
	
	const saveSensor = async (item, index) => {
		console.log("Saving:", item)
		try {
            const response = await axios.post(endpoint+"sensors",item);
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
	};

	const savePairingList = () => {
		console.log("Saving pairing list");
		pairingList.forEach(saveSensor)
		modalController.dismiss({ data: Date.now() });
	};

</script>

<svelte:head>
	<title>BLE Device Discovery</title>
</svelte:head>
<ion-header translucent="true">
	<ion-toolbar>
		<ion-title>Devices Found</ion-title>
		<ion-buttons slot="end">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<ion-button on:click={closeOverlay}>Close</ion-button>
		</ion-buttons>
	</ion-toolbar>
</ion-header>
<ion-content fullscreen>
	<ion-list>
		{#each deviceList as device}
			<ion-item>
				<ion-icon icon={(device.sensor_type in iconsMap) ? iconsMap[device.sensor_type] : bluetooth}></ion-icon>
				<ion-label>
					<h2>{device.name}</h2>
					<p>{device.address}</p>
				</ion-label>
				<ion-checkbox
						value={device}
						color="primary"
						slot="end"
						on:ionChange={checkBoxChange}
					/>
			</ion-item>
		{/each}
	</ion-list>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<ion-button expand="full" color="primary" size="large" on:click={savePairingList}>
        Pair BLE Devices
    </ion-button>
</ion-content>