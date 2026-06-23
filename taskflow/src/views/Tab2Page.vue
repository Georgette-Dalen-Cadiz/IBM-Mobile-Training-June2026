<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="minimal-toolbar">
        <ion-title class="minimal-title">Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      
      <div class="section-title">App Preferences</div>
      <ion-list inset="true" lines="inset" class="minimal-list">
        <ion-item class="minimal-item">
          <ion-icon :icon="moonOutline" slot="start" class="settings-icon" />
          <ion-label class="settings-label">Dark Mode</ion-label>
          <ion-toggle slot="end" color="dark" :checked="false"></ion-toggle>
        </ion-item>
        
        <ion-item class="minimal-item">
          <ion-icon :icon="notificationsOutline" slot="start" class="settings-icon" />
          <ion-label class="settings-label">Push Notifications</ion-label>
          <ion-toggle slot="end" color="dark" :checked="true"></ion-toggle>
        </ion-item>
      </ion-list>

      <div class="section-title">Data & Sync</div>
      <ion-list inset="true" lines="inset" class="minimal-list">
        <ion-item button detail="true" class="minimal-item">
          <ion-icon :icon="cloudUploadOutline" slot="start" class="settings-icon" />
          <ion-label class="settings-label">Backup Data</ion-label>
        </ion-item>
        
        <!-- Destructive action kept clean but visually distinct -->
        <ion-item button detail="true" class="minimal-item danger-item">
          <ion-icon :icon="trashBinOutline" slot="start" class="settings-icon" />
          <ion-label class="settings-label">Clear All Tasks</ion-label>
        </ion-item>
      </ion-list>

      <div class="section-title">About</div>
      <ion-list inset="true" lines="none" class="minimal-list">
        <ion-item class="minimal-item">
          <ion-icon :icon="informationCircleOutline" slot="start" class="settings-icon" />
          <ion-label class="settings-label">Version Info</ion-label>
          <ion-note slot="end" class="version-note">v1.0.0</ion-note>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonLabel, IonIcon, IonToggle, IonNote
} from '@ionic/vue';

import { 
  moonOutline, 
  notificationsOutline, 
  cloudUploadOutline, 
  trashBinOutline, 
  informationCircleOutline 
} from 'ionicons/icons';
</script>

<style scoped>
.minimal-toolbar {
  --background: transparent;
}
.minimal-title {
  font-weight: 600;
  letter-spacing: -0.02em;
}

.section-title {
  padding: 24px 20px 6px 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #222222;
  letter-spacing: -0.01em;
}

.minimal-list {
  margin-top: 4px;
  margin-bottom: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.minimal-item {
  --padding-top: 10px;
  --padding-bottom: 10px;
  --min-height: 56px;
}

.settings-label {
  font-weight: 500;
  color: #333333;
  font-size: 0.95rem;
}

.settings-icon {
  font-size: 20px;
  margin-right: 12px;
  color: #444444; 
}

.danger-item {
  --color: var(--ion-color-danger);
}
.danger-item .settings-icon {
  color: var(--ion-color-danger);
  opacity: 0.9;
}
.danger-item .settings-label {
  color: var(--ion-color-danger);
}

.version-note {
  font-size: 0.9rem;
  font-weight: 500;
  color: #999999;
}
</style>