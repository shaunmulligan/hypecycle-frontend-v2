<script lang="ts">
	import { goto } from '$app/navigation';
  import { menuController, registerMenu } from "$ionic/svelte";
  import {
    paperPlane,
    settings,
    archive,
    bicycle,
    analytics,
    camera,
  } from "ionicons/icons";
  import { onMount } from "svelte";

  const appPages = [
    { title: "Ride", url: "Ride", icon: bicycle },
    { title: "Analytics", url: "Analytics", icon: analytics },
    { title: "Navigation", url: "Navigation", icon: paperPlane },
    { title: "History", url: "History", icon: archive },
    { title: "Camera", url: "Camera", icon: camera},
    { title: "Settings", url: "Settings", icon: settings },
  ];

  const goMenuItem = (page: { title?: string; url: any; icon?: string; }) => {
    goto(page.url);
    menuController.close("mainmenu");
  };

  onMount(() => {
    registerMenu("mainmenu");
  });
</script>

<ion-menu content-id="main" menu-id="mainmenu">
  <ion-content class="ion-padding">
    <ion-list id="inbox-list">
      <ion-list-header>HypeCycle</ion-list-header>
      <ion-note>Push Watts!</ion-note>
      {#each appPages as p, i}
        <ion-menu-toggle auto-hide="false">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <ion-item
            routerDirection="root"
            on:click={() => {
              goMenuItem(p);
            }}
            lines="none"
            detail="false"
          >
            <ion-icon slot="start" icon={p.icon} />
            <ion-label>
              <h1>{p.title}</h1>
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
      {/each}
    </ion-list>

  </ion-content>
</ion-menu>

<style>

</style>