<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      
      <div class="section-title">App Preferences</div>
      <ion-list inset="true" class="settings-list">
        <ion-item lines="full">
          <ion-icon :icon="moonOutline" slot="start" class="icon-bg bg-dark" />
          <ion-label>Dark Mode</ion-label>
          <ion-toggle slot="end" :checked="false"></ion-toggle>
        </ion-item>
        <ion-item lines="none">
          <ion-icon :icon="notificationsOutline" slot="start" class="icon-bg bg-primary" />
          <ion-label>Push Notifications</ion-label>
          <ion-toggle slot="end" :checked="true"></ion-toggle>
        </ion-item>
      </ion-list>

      <div class="section-title">Data & Sync</div>
      <ion-list inset="true" class="settings-list">
        <ion-item button detail="true" lines="full">
          <ion-icon :icon="cloudUploadOutline" slot="start" class="icon-bg bg-success" />
          <ion-label>Backup Data</ion-label>
        </ion-item>
        <ion-item button detail="true" lines="none">
          <ion-icon :icon="trashBinOutline" slot="start" class="icon-bg bg-danger" />
          <ion-label color="danger">Clear All Tasks</ion-label>
        </ion-item>
      </ion-list>

      <div class="section-title">About</div>
      <ion-list inset="true" class="settings-list">
        <ion-item button detail="true" lines="none">
          <ion-icon :icon="informationCircleOutline" slot="start" class="icon-bg bg-medium" />
          <ion-label>Version Info</ion-label>
          <ion-note slot="end">v1.0.0</ion-note>
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

// Icons
import { 
  moonOutline, 
  notificationsOutline, 
  cloudUploadOutline, 
  trashBinOutline, 
  informationCircleOutline 
} from 'ionicons/icons';
</script>

<style scoped>
/* Header */
ion-toolbar {
  --padding-top: 10px;
  --padding-bottom: 10px;
  --background: var(--ion-color-light); /* Matches content background */
}
ion-title {
  font-weight: 600;
  letter-spacing: -0.5px;
}

/* Section Titles */
.section-title {
  padding: 24px 20px 8px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ion-color-medium);
}

/* Lists and Items */
.settings-list {
  margin-top: 0;
  margin-bottom: 0;
}
ion-item {
  --min-height: 60px;
}
ion-label {
  font-size: 16px;
  font-weight: 500;
}

/* Colored Icon Wrappers */
.icon-bg {
  font-size: 20px;
  margin-right: 16px;
  padding: 6px;
  border-radius: 8px;
}
.bg-dark { background: rgba(34, 36, 40, 0.1); color: var(--ion-color-dark); }
.bg-primary { background: rgba(56, 128, 255, 0.1); color: var(--ion-color-primary); }
.bg-success { background: rgba(45, 211, 111, 0.1); color: var(--ion-color-success); }
.bg-danger { background: rgba(235, 68, 90, 0.1); color: var(--ion-color-danger); }
.bg-medium { background: rgba(146, 148, 156, 0.1); color: var(--ion-color-medium); }
</style>