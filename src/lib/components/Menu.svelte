<script lang="ts">
	import { goto } from '$app/navigation';
  import { menuController, registerMenu } from "$ionic/svelte";
  import {
    paperPlane,
    settings,
    archive,
    bicycle,
    analytics,
  } from "ionicons/icons";
  import { onMount } from "svelte";

  const appPages = [
    { title: "Ride", url: "Ride", icon: bicycle },
    { title: "Analytics", url: "Analytics", icon: analytics },
    { title: "Navigation", url: "Navigation", icon: paperPlane },
    { title: "History", url: "History", icon: archive },
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
  ion-menu ion-content {
    --background: var(--ion-item-background, var(--ion-background-color, #fff));
  }

  ion-menu.md ion-content {
    --padding-start: 8px;
    --padding-end: 8px;
    --padding-top: 20px;
    --padding-bottom: 20px;
  }

  ion-menu.md ion-list {
    padding: 20px 0;
  }

  ion-menu.md ion-note {
    margin-bottom: 30px;
  }

  ion-menu.md ion-list-header,
  ion-menu.md ion-note {
    padding-left: 10px;
  }

  ion-menu.md ion-list#inbox-list {
    border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
  }

  ion-menu.md ion-list#inbox-list ion-list-header {
    font-size: 22px;
    font-weight: 600;

    min-height: 20px;
  }

  ion-menu.md ion-item {
    --padding-start: 10px;
    --padding-end: 10px;
    border-radius: 4px;
  }

  ion-menu.md ion-item.selected {
    --background: rgba(var(--ion-color-primary-rgb), 0.14);
  }

  ion-menu.md ion-item.selected ion-icon {
    color: var(--ion-color-primary);
  }

  ion-menu.md ion-item ion-icon {
    color: #616e7e;
  }

  ion-menu.md ion-item ion-label {
    font-weight: 500;
  }

  ion-menu.ios ion-content {
    --padding-bottom: 20px;
  }

  ion-menu.ios ion-list {
    padding: 20px 0 0 0;
  }

  ion-menu.ios ion-note {
    line-height: 24px;
    margin-bottom: 20px;
  }

  ion-menu.ios ion-item {
    --padding-start: 16px;
    --padding-end: 16px;
    --min-height: 50px;
  }

  ion-menu.ios ion-item.selected ion-icon {
    color: var(--ion-color-primary);
  }

  ion-menu.ios ion-item ion-icon {
    font-size: 24px;
    color: #73849a;
  }

  ion-menu.ios ion-list-header,
  ion-menu.ios ion-note {
    padding-left: 16px;
    padding-right: 16px;
  }

  ion-menu.ios ion-note {
    margin-bottom: 8px;
  }

  ion-note {
    display: inline-block;
    font-size: 16px;

    color: var(--ion-color-medium-shade);
  }

  ion-item.selected {
    --color: var(--ion-color-primary);
  }
</style>