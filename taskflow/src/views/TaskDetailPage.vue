<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="minimal-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tasks" color="dark"></ion-back-button>
        </ion-buttons>
        <ion-title class="minimal-title">Task</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      <div v-if="task" class="detail-wrapper">
        
        <h1 class="task-title">{{ task.name }}</h1>

        <ion-list inset="true" lines="full" class="minimal-list">
          <ion-item class="minimal-item">
            <ion-label class="meta-label">Status</ion-label>
            <div slot="end" class="status-container" :class="task.done ? 'status-done' : 'status-pending'">
              <ion-icon :icon="task.done ? checkmarkCircleOutline : timeOutline" class="status-icon"></ion-icon>
              <span>{{ task.done ? 'Completed' : 'Pending' }}</span>
            </div>
          </ion-item>
          
          <ion-item class="minimal-item">
            <ion-label class="meta-label">Task ID</ion-label>
            <ion-note slot="end" class="id-note">#{{ task.id }}</ion-note>
          </ion-item>
        </ion-list>
      </div>

      <div v-else class="empty-state">
        <ion-icon :icon="alertCircleOutline" class="empty-icon"></ion-icon>
        <ion-text color="medium">
          <p>Task not found</p>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
  IonIcon
} from '@ionic/vue';
import { checkmarkCircleOutline, timeOutline, alertCircleOutline } from 'ionicons/icons';

const route = useRoute();
const taskStore = useTaskStore();

const taskId = computed(() => Number(route.params.tid));
const task = computed(() =>
  taskStore.tasks.find((t) => t.id === taskId.value)
);
</script>

<style scoped>
.minimal-toolbar {
  --background: transparent;
}
.minimal-title {
  font-weight: 600;
  letter-spacing: -0.02em;
}

.detail-wrapper {
  padding: 24px 0;
}

.task-title {
  font-size: 28px;
  font-weight: 700;
  color: #222222;
  margin: 0 20px 24px 20px;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.minimal-list {
  margin: 0 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.minimal-item {
  --padding-top: 10px;
  --padding-bottom: 10px;
}

.meta-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #666666;
}

.id-note {
  font-size: 0.95rem;
  font-weight: 500;
  color: #999999;
  letter-spacing: 0.05em;
}

.status-container {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-done {
  color: var(--ion-color-success);
}

.status-pending {
  color: #f5a623; 
}

.status-icon {
  font-size: 18px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  color: var(--ion-color-medium);
  opacity: 0.4;
  margin-bottom: 12px;
}

.empty-state p {
  margin: 0;
  font-size: 1rem;
  letter-spacing: 0.02em;
}
</style>