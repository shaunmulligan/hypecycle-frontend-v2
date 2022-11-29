<script>
    import { videocam, camera, stop } from "ionicons/icons";
    export let data;
    let state = data.wsStore
    let recordingIcons = [videocam, stop]
    let recordingState = 0
    let photo;

    function toggleRecord() {
        if (recordingState){
            recordingState = 0
        }else{
            recordingState = 1
        }
    }

    function photoUpdater() {
        fetchImage.then(
        (value) => {
            photo = value
            console.log(value); // Success!
        },
        (reason) => {
            console.error(reason); // Error!
        },
    )
    }

    const fetchImage = (async () => {
		const response = await fetch('http://localhost:8001/camera/snap') // TODO: Need to not hardcode this
        let blob = await response.blob()
        let src = URL.createObjectURL(blob)
        return src
	})()

    const fetchVideoList = (async () => {
        const response = await fetch('http://localhost:8001/camera/videos')
        let videos = await response.json()
        console.log(videos)
        return videos
    })()

    fetchImage.then(
        (value) => {
            photo = value
            console.log(value); // Success!
        },
        (reason) => {
            console.error(reason); // Error!
        },
    )
</script>

<ion-content fullscreen>
    <ion-card>
        <ion-card-header>
            <ion-card-subtitle>Camera View</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <div id=image-container>
                    <!-- {#await fetchImage}
                        <ion-spinner color="primary" class="ion-justify-content-center"/>
                    {:then data} -->
                <img src={$photo} alt="A camera snap" />
                    <!-- {:catch error}
                        <p>Camera is busy recording!</p>
                    {/await} -->
            </div>
        </ion-card-content>
    </ion-card>
    <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button color="primary" on:click={ toggleRecord }>
            <ion-icon icon={recordingIcons[recordingState]} />
        </ion-fab-button>
    </ion-fab>
    <ion-fab horizontal="start" vertical="bottom" slot="fixed">
        <ion-fab-button color="danger" on:click={ photoUpdater }>
            <ion-icon icon={camera} />
        </ion-fab-button>
    </ion-fab>
    <ion-list>
        <ion-list-header>Recent Recordings</ion-list-header>
        {#await fetchVideoList}
            <ion-list>
                <ion-list-header>
                    <ion-skeleton-text animated style="width: 80px" />
                </ion-list-header>
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
            </ion-list>
        {:then data}
            {#each data as video}
                <ion-item>
                    <ion-label>
                        <h2>{video}</h2>
                    </ion-label>
                </ion-item>
            {/each}
        {:catch error}
            <p>Error loading video list</p>
        {/await}
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