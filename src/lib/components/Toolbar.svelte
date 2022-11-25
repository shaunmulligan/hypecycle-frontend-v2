<script>
    import Status from "./Status.svelte";
    /**
	* @type {any}
	*/
    export let title
    export let state

</script>

<ion-toolbar>
    <ion-button slot="start" color="light" fill="clear">
    <ion-menu-button />
    </ion-button>
    <ion-title>{title}</ion-title>
    <ion-label slot="end">
        <Status gpsFix={state.gps_fix} hasPower={state.power} hasHR={state.heart_rate} batteryVolts={state.battery}></Status>
    </ion-label>
</ion-toolbar>