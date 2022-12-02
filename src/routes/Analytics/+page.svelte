<script>
    import MetricWidget from "$lib/components/MetricWidget.svelte";
    import ZoneWidget from "$lib/components/ZoneWidget.svelte";
    import Timer from "$lib/components/TimerWidget.svelte"

    export let data;
    let state = data.wsStore
</script>

<ion-content fullscreen>
<ion-grid>
    <ion-row>
    <ion-col>
        <div>
        <MetricWidget label="Avg. Speed" value={$state.avg_speed} unit="km/h" />
        </div>
    </ion-col>
    <ion-col>
        <div>
            <MetricWidget label="Max. Speed" value={$state.max_speed} unit="km/h" />
        </div>
    </ion-col>
    </ion-row>
    <ion-row>
    <ion-col>
        <div>
            <ZoneWidget label="Avg. Heart Rate" value={$state.avg_hr} unit="bpm" zones={[148,177]}/>
        </div>
    </ion-col>
    <ion-col>
        <div>
        <ZoneWidget label="Max. Heart Rate" value={$state.max_hr} unit="bpm" zones={[220,301]}/>
        </div>
    </ion-col>
    </ion-row>
<ion-row>
    <ion-col>
        <div>
        <ZoneWidget label="Avg. Power" value={$state.avg_power} unit="W" zones={[148,177]}/>
        </div>
    </ion-col>
    <ion-col>
    <div>
        <ZoneWidget label="Max. Power" value={$state.max_power} unit="W" zones={[220,301]}/>
    </div>
    </ion-col>
</ion-row>
</ion-grid>
</ion-content>

<style>

</style>