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
ion-menu-button {
    color: var(--ion-color-primary);
}

#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>