<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="minimal-toolbar">
        <ion-title class="minimal-title">Completed</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      
      <ion-list v-if="completedTasks.length > 0" inset="true" lines="inset" class="minimal-list">
        <ion-item 
          v-for="task in completedTasks" 
          :key="task.id" 
          @click="goToDetail(task.id)"
          button
          detail="false" 
          class="minimal-item"
        >
          <ion-icon :icon="checkmarkCircleOutline" color="success" slot="start" class="task-icon"></ion-icon>
          
          <ion-label class="task-label">
            {{ task.name }}
          </ion-label>
          
          <ion-note slot="end" class="done-note">Done</ion-note>
        </ion-item>
      </ion-list>

      <div v-else class="empty-state">
        <ion-icon :icon="layersOutline" class="empty-icon"></ion-icon>
        <ion-text color="medium">
          <p>No completed tasks yet.</p>
        </ion-text>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';

// Added IonIcon, IonNote, and the specific icons from ionicons
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonNote
} from '@ionic/vue';
import { checkmarkCircleOutline, layersOutline } from 'ionicons/icons';

const router = useRouter();
const taskStore = useTaskStore();
const { completedTasks } = storeToRefs(taskStore);

function goToDetail(taskId) {
  router.push(`/tabs/tasks/${taskId}`);
}
</script>

<style scoped>
/* --- Header & Toolbar --- */
.minimal-toolbar {
  --background: transparent;
}
.minimal-title {
  font-weight: 600;
  letter-spacing: -0.02em; /* Tighter letter spacing for a modern look */
}

/* --- List & Items --- */
.minimal-list {
  margin-top: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04); /* Very soft shadow */
}

.minimal-item {
  --padding-top: 8px;
  --padding-bottom: 8px;
}

.task-icon {
  font-size: 24px;
  opacity: 0.9; /* Softens the color slightly */
}

.task-label {
  font-weight: 500;
  color: #333333;
}

.done-note {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--ion-color-medium);
}

/* --- Empty State --- */
.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
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