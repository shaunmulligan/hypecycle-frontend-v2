<script>
    import { videocam, camera, stop } from "ionicons/icons";
    import { onMount } from "svelte";
    export let data;
    let state = data.wsStore
    let recordingIcons = [videocam, stop]
    let recordingState = 0
    let photo;
    let videos = []

    async function toggleRecord() {
        if (recordingState){
            recordingState = 0
            console.log("recordingState = ", recordingState)
            const response = await fetch('http://localhost:8001/camera/stop',{
			    method: 'POST',
			    body: JSON.stringify({})
            }) // TODO: Need to not hardcode this
            console.log(response)
            videos = await getVideoList()
        }else{
            recordingState = 1
            console.log("recordingState = ", recordingState)
            const response = await fetch('http://localhost:8001/camera/record', {
			    method: 'POST',
			    body: JSON.stringify({})
            }) // TODO: Need to not hardcode this
            console.log(response)
        }
    }

    async function getPhoto() {
        const response = await fetch('http://localhost:8001/camera/snap') // TODO: Need to not hardcode this
        let blob = await response.blob()
        let src = URL.createObjectURL(blob)
        photo = src
        console.log("getPhoto Called")
        return src
    }

    async function getVideoList() {
        const response = await fetch('http://localhost:8001/camera/videos')
        let videos = await response.json()
        console.log(videos)
        return videos
    }
    
    const fetchVideoList = (async () => {
        videos = await getVideoList()
        return videos
    })()

    onMount(() => {
    async function foo() {
        videos = await getVideoList()
    }

    foo();

    });
</script>

<ion-content fullscreen>
    <ion-card>
        <ion-card-header>
            <ion-card-subtitle>Camera View</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <div id=image-container>
                {#if photo === undefined}
                    <ion-lable>No photo yet...</ion-lable>
                {:else}
                    <img src={photo} alt="A camera snap" />
                {/if}
            </div>
        </ion-card-content>
    </ion-card>
    <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button color="primary" on:click={ toggleRecord }>
            <ion-icon icon={recordingIcons[recordingState]} />
        </ion-fab-button>
    </ion-fab>
    <ion-fab horizontal="start" vertical="bottom" slot="fixed">
        <ion-fab-button color="danger" on:click={ getPhoto }>
            <ion-icon icon={camera} />
        </ion-fab-button>
    </ion-fab>
    <ion-list>
        <ion-list-header>Recent Recordings</ion-list-header>
            {#each videos as video}
                <ion-item>
                    <ion-label>
                        <h2>{video}</h2>
                    </ion-label>
                </ion-item>
            {/each}
    </ion-list>
</ion-content>

<style>
	ion-spinner {
		left: 50%;
        /* margin-left: -4em; */
	}
    .button-group {
        left: 50%
    }
</style>