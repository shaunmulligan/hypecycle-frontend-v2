<script>
    import Status from "./Status.svelte";
    /**
	* @type {any}
	*/
    export let title
    export let state

</script>

<ion-toolbar>
    <ion-menu-button slot="start" color="primary" mode="ios"/>
    <ion-title mode="ios">{title}</ion-title>
    <ion-label slot="end" >
        <Status gpsFix={state.gps_fix} hasPower={state.power} hasHR={state.heart_rate} batteryVolts={state.battery}></Status>
    </ion-label>
</ion-toolbar>