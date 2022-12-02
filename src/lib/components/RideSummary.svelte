<script>
    import { bicycle } from "ionicons/icons";
    import { modalController } from '$ionic/svelte';
    import RideSummaryModal from "$lib/components/RideSummaryModal.svelte";
    export let ride;

    const secondsToHms = (seconds) => {
        const result = new Date(seconds * 1000).toISOString().slice(11, 19);
        return result
    }

    const getStartDate = (dateString) => {
        // the slice it to remove the z and set the time to local time
        const result = new Date(dateString.slice(0, -1));
        return result.toDateString()
    }

    const showModalController = async () => {
		const modal = await modalController.create({
			component: RideSummaryModal,
			componentProps: {
				ride: ride,
			},
			showBackdrop: true,
			backdropDismiss: false
		});

		modal.onDidDismiss().then((value) => {
			console.log('Dismissed the modal', value);
			if (value.role === 'backdrop') console.log('Backdrop clicked');
		});

		await modal.present();
	};
</script>
<ion-item on:click={showModalController}>
    <ion-icon slot="start" icon={bicycle} />
    <ion-label>
        <h2>{ride.name} ({getStartDate(ride.start_time)})</h2>
        <p>Distance: {ride.distance} Km | Duration : {secondsToHms(ride.duration)} | Speed: {ride.avg_speed} Km/h</p>
    </ion-label>
</ion-item>
