<script>
    import axios from "axios";
    import RideSummary from "$lib/components/RideSummary.svelte";
    
    export let data;

    const endpoint = "http://localhost:8001/";
    
    async function lazyLoading() {
		console.log("Fetching ride summaries")
		try {
            const response = await axios.get(endpoint+"rides/summaries/");
            // console.log(response.data);
            return response.data
        } catch (error) {
            // console.error(error);
            return error
        }
	}
</script>

<ion-content fullscreen>
<ion-list-header>Recent Rides</ion-list-header>
{#await lazyLoading() then rides}
    <ion-list>
		{#each rides as ride}
            <RideSummary ride={ride}/>
		{/each}
	</ion-list>
{/await}
</ion-content>