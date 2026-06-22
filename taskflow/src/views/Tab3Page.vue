<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding-bottom">
      <div class="profile-header ion-padding">
        <ion-avatar class="profile-avatar">
          <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Profile Avatar" />
        </ion-avatar>
        <h2 class="profile-name">Alex Developer</h2>
        <p class="profile-email">alex@example.com</p>
        <ion-button fill="clear" size="small" class="edit-btn">
          Edit Profile
        </ion-button>
      </div>

   

      <ion-list-header>
        <ion-label>Account</ion-label>
      </ion-list-header>
      <ion-list lines="full" class="settings-list">
        <ion-item button detail="true">
          <ion-icon :icon="shieldCheckmarkOutline" slot="start" class="bg-success" />
          <ion-label>Privacy & Security</ion-label>
        </ion-item>
        <ion-item button detail="true">
          <ion-icon :icon="helpCircleOutline" slot="start" class="bg-warning" />
          <ion-label>Help & Support</ion-label>
        </ion-item>
      </ion-list>

      <div class="ion-padding ion-margin-top">
        <ion-button expand="block" color="danger" fill="outline" class="logout-btn">
          <ion-icon :icon="logOutOutline" slot="start" />
          Log Out
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonAvatar, IonButton, IonList, IonItem, IonLabel, 
  IonIcon, IonToggle, IonListHeader
} from '@ionic/vue';

// Icons
import { 
  moonOutline, notificationsOutline, shieldCheckmarkOutline, 
  helpCircleOutline, logOutOutline 
} from 'ionicons/icons';

// Simple Dark Mode Toggle Logic (Optional)
const darkMode = ref(false);

const toggleDarkMode = (e: any) => {
  document.body.classList.toggle('dark', e.detail.checked);
};
</script>

<style scoped>
/* Header */
ion-toolbar {
  --padding-top: 10px;
  --padding-bottom: 10px;
}
ion-title {
  font-weight: 600;
  letter-spacing: -0.5px;
}

/* Profile Section */
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 16px;
}
.profile-avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
  border: 3px solid var(--ion-color-step-100, #f4f5f8);
}
.profile-name {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--ion-color-dark);
}
.profile-email {
  margin: 4px 0 12px 0;
  font-size: 14px;
  color: var(--ion-color-medium);
}
.edit-btn {
  --color: var(--ion-color-primary);
  font-weight: 600;
  text-transform: none;
  letter-spacing: -0.2px;
}

/* Lists and Items */
ion-list-header {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ion-color-medium);
  margin-top: 8px;
}
.settings-list {
  background: transparent;
}
ion-item {
  --padding-start: 16px;
  --min-height: 60px;
  --border-color: var(--ion-color-step-100, #f4f5f8);
}
ion-label {
  font-size: 16px;
  font-weight: 500;
}

/* Colored Icon Wrappers */
ion-icon {
  font-size: 20px;
  margin-right: 16px;
  padding: 6px;
  border-radius: 8px;
}
.bg-dark { background: rgba(34, 36, 40, 0.1); color: var(--ion-color-dark); }
.bg-primary { background: rgba(56, 128, 255, 0.1); color: var(--ion-color-primary); }
.bg-success { background: rgba(45, 211, 111, 0.1); color: var(--ion-color-success); }
.bg-warning { background: rgba(255, 196, 9, 0.1); color: var(--ion-color-warning); }

/* Logout Button */
.logout-btn {
  --border-width: 2px;
  --border-radius: 12px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
}
</style>