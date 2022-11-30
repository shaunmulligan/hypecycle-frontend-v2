<script>
    import { videocam, camera, stop, trash } from "ionicons/icons";
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

    async function deleteVideos() {
        const response = await fetch('http://localhost:8001/camera/videos/', {
			    method: 'Delete'
            }) // TODO: Need to not hardcode this
        console.log(response)
        videos = await getVideoList()
        return videos
    }
    
    const fetchVideoList = (async () => {
        videos = await getVideoList()
        return videos
    })()

    onMount(() => {
    async function loadVideos() {
        videos = await getVideoList()
    }
    loadVideos();

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
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <ion-fab-button color="primary" on:click={ toggleRecord }>
            <ion-icon icon={recordingIcons[recordingState]} />
        </ion-fab-button>
    </ion-fab>
    <ion-fab horizontal="start" vertical="bottom" slot="fixed">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <ion-fab-button color="danger" on:click={ getPhoto }>
            <ion-icon icon={camera} />
        </ion-fab-button>
    </ion-fab>
    <ion-list>
        <ion-list-header>
            <ion-toolbar>
                <ion-title>Recent Recordings</ion-title>
                <ion-button slot="end" on:click={ deleteVideos }>
					<ion-icon slot="icon-only" color="danger" icon={trash} />
				</ion-button>
            </ion-toolbar>
        </ion-list-header>
        {#if videos.length === 0}
        <ion-item>
            <ion-thumbnail slot="start">
                <ion-skeleton-text />
            </ion-thumbnail>
            <ion-label>
                <h3>
                    <ion-skeleton-text animated style="width: 80%" />
                </h3>
                <p>
                    <ion-skeleton-text animated style="width: 60%" />
                </p>
                <p>
                    <ion-skeleton-text animated style="width: 30%" />
                </p>
            </ion-label>
        </ion-item>
        <ion-item>
            <ion-thumbnail slot="start">
                <ion-skeleton-text />
            </ion-thumbnail>
            <ion-label>
                <h3>
                    <ion-skeleton-text animated style="width: 80%" />
                </h3>
                <p>
                    <ion-skeleton-text animated style="width: 60%" />
                </p>
                <p>
                    <ion-skeleton-text animated style="width: 30%" />
                </p>
            </ion-label>
        </ion-item>
        <ion-item>
            <ion-thumbnail slot="start">
                <ion-skeleton-text />
            </ion-thumbnail>
            <ion-label>
                <h3>
                    <ion-skeleton-text animated style="width: 80%" />
                </h3>
                <p>
                    <ion-skeleton-text animated style="width: 60%" />
                </p>
                <p>
                    <ion-skeleton-text animated style="width: 30%" />
                </p>
            </ion-label>
        </ion-item>
        {:else}
            {#each videos as video}
                <ion-item>
                    <ion-label>
                        <h2>{video}</h2>
                    </ion-label>
                </ion-item>
            {/each}
        {/if}
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