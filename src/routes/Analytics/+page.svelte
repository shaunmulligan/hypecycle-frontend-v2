<script>
    export let data;
    let state = data.wsStore
</script>

<ion-content fullscreen>
    <ion-label>
        Analytics page
    </ion-label>
    <ion-text>
        {JSON.stringify($state)}
    </ion-text>
</ion-content>