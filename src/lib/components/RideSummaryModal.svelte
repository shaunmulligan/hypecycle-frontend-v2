<script lang="ts">
	import { modalController } from '$ionic/svelte';
    import MetricWidget from './MetricWidget.svelte';
    import Timer from './TimerWidget.svelte';
    import ZoneWidget from './ZoneWidget.svelte';
    export let ride
	console.log('Received props', ride);

	const closeOverlay = () => {
		modalController.dismiss({ data: Date.now() });
	};

    const getStartDate = (dateString) => {
        // the slice it to remove the z and set the time to local time
        const result = new Date(dateString.slice(0, -1));
        return result.toDateString()
    }
	
</script>

<svelte:head>
	<title>{ride.name} ({getStartDate(ride.start_time)}</title>
</svelte:head>

<ion-header translucent="true">
	<ion-toolbar>
		<ion-title>{ride.name} - {getStartDate(ride.start_time)}</ion-title>
		<ion-buttons slot="end">
			<ion-button on:click={closeOverlay}>Close</ion-button>
		</ion-buttons>
	</ion-toolbar>
</ion-header>
<ion-content fullscreen>
    <ion-grid>
        <ion-row>
            <ion-col>
                <div>
                    <MetricWidget label="Distance" value={ride.distance} unit="m" />
                </div>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <div>
                    <Timer seconds={ride.duration} />
                </div>
            </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div>
              <MetricWidget label="Avg. Speed" value={ride.avg_speed} unit="km/h" />
            </div>
          </ion-col>
          <ion-col>
              <div>
                <ZoneWidget label="Avg. Power" value={ride.avg_speed} unit="W" zones=[220,304] />
              </div>
          </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
              <div>
                <MetricWidget label="Avg. Heart Rate" value={ride.avg_hr} unit="bpm" />
              </div>
            </ion-col>
            <ion-col>
                <div>
                  <MetricWidget label="Climbed" value={ride.up_hill} unit="meters"/>
                </div>
            </ion-col>
          </ion-row>
    <ion-grid/>
</ion-content>