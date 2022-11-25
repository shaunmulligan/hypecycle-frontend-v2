<ion-label id=status-container>
    <ion-icon icon={gpsFix ? navigate : navigateOutline}></ion-icon>
    <ion-icon icon={hasHR ? heart : heartOutline}></ion-icon>
    <ion-icon icon={hasPower ? flash : flashOutline}></ion-icon>
    <ion-label>
        <ion-icon icon={batteryHalfOutline}></ion-icon>
        <!-- Battery 0% => 1.5v and 100% => 2.1 -->
        <ion-label>{(100*((batteryVolts-1.5)/0.6)).toFixed(0)}%</ion-label> 
    </ion-label>
    
</ion-label>

<script lang="ts">
    import {
        navigate,
        navigateOutline,
        heart,
        heartOutline,
        flash,
        flashOutline,
        batteryHalfOutline,
    } from "ionicons/icons";
    export let gpsFix = false
    export let hasHR = false
    export let hasPower = false
    export let batteryVolts = 0.0 // TODO: calculate battery % and surface
</script>