<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      
      <ion-tab-bar slot="bottom" class="minimal-tab-bar" translucent="true">
        <ion-tab-button tab="tasks" href="/tabs/tasks" class="minimal-tab-button">
          <ion-icon :icon="listOutline" />
          <ion-label>Tasks</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="completed" href="/tabs/completed" class="minimal-tab-button">
          <ion-icon :icon="checkmarkDoneOutline" />
          <ion-label>Completed</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings" class="minimal-tab-button">
          <ion-icon :icon="settingsOutline" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/vue';
import { listOutline, checkmarkDoneOutline, settingsOutline } from 'ionicons/icons';
</script>

<style scoped>
.minimal-tab-bar {
  --background: rgba(255, 255, 255, 0.95);
  --border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.03); 
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.03);
  height: 64px; 
  padding-bottom: env(safe-area-inset-bottom);
}

.minimal-tab-button {
  --color: #999999;
  --color-selected: #222222;
  transition: color 0.2s ease;
}

.minimal-tab-button ion-icon {
  font-size: 22px; 
  margin-bottom: 2px;
}

.minimal-tab-button ion-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}
</style>