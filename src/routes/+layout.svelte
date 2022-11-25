<script lang="ts">
    import Menu from "$lib/components/Menu.svelte";
    import { page } from '$app/stores';
  
    import { setupIonicSvelte } from "ionic-svelte";
  
    /* Theme variables */
    import "../theme/variables.css";
    setupIonicSvelte();
    import Toolbar from "$lib/components/Toolbar.svelte";
    export let data; //This comes from layout.ts
    let state = data.wsStore; //Wesocket Store with default values
    
</script>

<ion-app>
  <ion-split-pane content-id="main">
    <Menu />
    <div class="ion-page" id="main">
      <ion-header>
        <Toolbar title={$page.data.title} state={$state}/>
      </ion-header>
      <!-- All our other content gets put here -->
      <slot /> 
    </div>
  </ion-split-pane>
  
</ion-app>
