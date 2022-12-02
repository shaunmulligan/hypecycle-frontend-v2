<script>
    import { modalController } from '$ionic/svelte';
    import BleDiscoverModal from '$lib/components/BleDiscoverModal.svelte'
    import { loadingController } from '$ionic/svelte';
    import {
        sunny,
        wifi,
        bluetooth,
        cloudUpload,
    } from "ionicons/icons";
    import axios from "axios";

    export let data;
    let state = data.wsStore
    const endpoint = "http://localhost:8001/";
  
    let settings = {
      "wifi_enabled": true,
      "bluetooth_enabled": true,
      "lights_enabled": true,
      "upload_enabled": true,
      "lcd_brightness": 60
    }
    const response = axios.get(endpoint+"settings/")
      .then(response => {
        settings = response.data
      })
    
    const showModalController = async () => {
    const options = {
			message: 'Discovering BLE devices......',
		};
		const loading = await loadingController.create(options);
		loading.present();
    try {
        const response = await axios.get(endpoint+"discover");
        console.log(response.data);
        loading.dismiss();
        const modal = await modalController.create({
          component: BleDiscoverModal,
          componentProps: {
            deviceList: response.data,
          },
          showBackdrop: true,
          backdropDismiss: false
        });
		modal.onDidDismiss().then((value) => {
			console.log('Dismissed the modal', value);
			if (value.role === 'backdrop') console.log('Backdrop clicked');
		});
        await modal.present();
    } catch (error) {
        console.error(error);
    }
	};
    const connectSensors = async () => {
        console.log("Connecting Sensors")
        // Todo: Trigger BLE sensor connection API
        try {
            const response = await axios.get(endpoint+"connect");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const reloadFrontend = () => {
        console.log("Reloading Frontend")
        // Todo: Trigger BLE sensor connection API
        location.reload()
    }
    const updateSettings = () => {
      axios.post(endpoint+"settings/update", settings)
        .then(response => {
          settings = response.data
          console.log(settings);
        }).catch(response => {
          console.log("Failed to update settings")
        })
    }
    
    const setWifiState = (e) => {
        settings.wifi_enabled = e.detail.checked;
        updateSettings();
    }
    const setBluetoothState = (e) => {
        settings.bluetooth_enabled = e.detail.checked;
        updateSettings();
    }
    const setAutoUploadState = (e) => {
        settings.upload_enabled = e.detail.checked;
        updateSettings();
    }
    const setLightState = (e) => {
        settings.lights_enabled = e.detail.checked;
        updateSettings();
    }
    const setScreenBrightness = (e) => {
        settings.lcd_brightness = e.detail.value;
        updateSettings();
    }

</script>

<ion-content fullscreen>
    <ion-list>
        <ion-item>
            <ion-label>
            <ion-text>Display</ion-text>
            </ion-label>
            <ion-range min="0" max="100" step="10" value={settings.lcd_brightness} on:ionChange={setScreenBrightness}>
            <!-- <ion-icon size="small" slot="start" icon={sunny} ></ion-icon>
            <ion-icon slot="end" icon={sunny}></ion-icon> -->
            </ion-range>
            <ion-label>
            <ion-text>{settings.lcd_brightness}%</ion-text>
            </ion-label>
        </ion-item>
        <ion-item>
            <ion-icon slot="start" icon={wifi}></ion-icon>
            <ion-label>Wifi</ion-label>
            <ion-toggle checked={settings.wifi_enabled} on:ionChange={setWifiState}></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-icon slot="start" icon={bluetooth}></ion-icon>
            <ion-label>Bluetooth</ion-label>
            <ion-toggle checked={settings.bluetooth_enabled} on:ionChange={setBluetoothState}></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-icon slot="start" icon={cloudUpload}></ion-icon>
            <ion-label>Auto Upload</ion-label>
            <ion-toggle checked={settings.upload_enabled} on:ionChange={setAutoUploadState}></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-icon slot="start" icon={sunny}></ion-icon>
            <ion-label>Lights</ion-label>
            <ion-toggle checked={settings.lights_enabled} on:ionChange={setLightState}></ion-toggle>
        </ion-item>
        <ion-item-divider/>
    </ion-list>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <ion-button expand="full" color="primary" size="large" on:click={showModalController}>
    Discover Sensors
    </ion-button>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <ion-button expand="full" color="primary" size="large" on:click={connectSensors}>
    Connect to Sensors
    </ion-button>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <ion-button expand="full" color="primary" size="large" on:click={reloadFrontend}>
    Reload Frontend
    </ion-button>

</ion-content>