<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Overview</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="header-section">
        <ion-text color="dark">
          <h1 class="greeting">Hello! 👋</h1>
        </ion-text>
        <ion-text color="medium">
          <p class="subtitle">Here is your task summary for today.</p>
        </ion-text>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="icon-wrapper primary-bg">
            <ion-icon :icon="listOutline" />
          </div>
          <h2>{{ totalCount }}</h2>
          <p>Total Tasks</p>
        </div>

        <div class="stat-card">
          <div class="icon-wrapper warning-bg">
            <ion-icon :icon="timeOutline" />
          </div>
          <h2>{{ pendingCount }}</h2>
          <p>Pending</p>
        </div>

        <div class="stat-card">
          <div class="icon-wrapper success-bg">
            <ion-icon :icon="checkmarkDoneOutline" />
          </div>
          <h2>{{ doneCount }}</h2>
          <p>Completed</p>
        </div>
      </div>

      <ion-button router-link="/tabs/tasks" expand="block" color="dark" class="action-btn">
        Manage Tasks
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'

// Ionic Components
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonText, IonIcon
} from '@ionic/vue'

// Icons
import { listOutline, timeOutline, checkmarkDoneOutline } from 'ionicons/icons'

// Store setup
const taskStore = useTaskStore()
const { totalCount, pendingCount, doneCount } = storeToRefs(taskStore)
</script>

<style scoped>
/* Header Styling */
ion-toolbar {
  --padding-top: 10px;
  --padding-bottom: 10px;
}
ion-title {
  font-weight: 600;
  letter-spacing: -0.5px;
}
.header-section {
  margin-bottom: 32px;
  margin-top: 16px;
}
.greeting {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  letter-spacing: -1px;
}
.subtitle {
  font-size: 16px;
  margin: 0;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}
.stat-card {
  background: var(--ion-color-step-50, #f8f9fa);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-card:first-child {
  grid-column: 1 / -1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.stat-card:first-child h2 {
  margin: 0;
  order: 2;
}
.stat-card:first-child p {
  margin: 0;
  order: 1;
  flex-grow: 1;
  padding-left: 12px;
  font-size: 16px;
}

.stat-card h2 {
  font-size: 24px;
  font-weight: 700;
  margin: 16px 0 4px 0;
  color: var(--ion-color-dark);
}
.stat-card p {
  font-size: 14px;
  color: var(--ion-color-medium);
  margin: 0;
  font-weight: 500;
}

/* Icon Wrappers */
.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-wrapper ion-icon {
  font-size: 20px;
}
.primary-bg { background: rgba(56, 128, 255, 0.1); color: var(--ion-color-primary); }
.warning-bg { background: rgba(255, 196, 9, 0.1); color: var(--ion-color-warning); }
.success-bg { background: rgba(45, 211, 111, 0.1); color: var(--ion-color-success); }

/* Button */
.action-btn {
  margin-top: 24px;
  --border-radius: 12px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
}
</style>