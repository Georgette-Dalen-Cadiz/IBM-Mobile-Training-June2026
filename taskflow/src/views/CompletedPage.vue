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
          
          <div v-if="task.photo" slot="start" class="task-thumbnail">
            <ion-img :src="task.photo" alt="Task photo" />
          </div>
          <div v-else slot="start" class="task-thumbnail placeholder-thumbnail">
            <ion-icon :icon="imageOutline" class="placeholder-icon" />
          </div>

          <ion-label class="task-label" text-wrap="true">
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
  IonNote,
  IonImg
} from '@ionic/vue';
import { checkmarkCircleOutline, layersOutline, imageOutline } from 'ionicons/icons';

const router = useRouter();
const taskStore = useTaskStore();
const { completedTasks } = storeToRefs(taskStore);

function goToDetail(taskId) {
  router.push(`/tabs/tasks/${taskId}`);
}
</script>

<style scoped>
.minimal-toolbar {
  --background: transparent;
}
.minimal-title {
  font-weight: 600;
  letter-spacing: -0.02em; 
}

.minimal-list {
  margin-top: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04); 
}

.minimal-item {
  --padding-top: 10px;
  --padding-bottom: 10px;
  --min-height: 56px;
}

.task-icon {
  font-size: 22px;
  margin-right: 4px;
}

.task-label {
  font-weight: 500;
  color: #888888;
  text-decoration: line-through;
  opacity: 0.8;
  padding-right: 8px;
}

.done-note {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ion-color-success);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.task-thumbnail {
  width: 44px;
  max-width: 44px;
  height: 44px;
  max-height: 44px;
  
  margin-right: 14px;
  border-radius: 10px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f7;
  opacity: 0.6;
  filter: grayscale(50%);
  flex: 0 0 44px !important;
}

/* Ensure inside standard images track nicely */
.task-thumbnail ion-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Deeper shadow layer targets */
.task-thumbnail :deep(img) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* Unset photo fallback placeholder elements styling */
.placeholder-thumbnail {
  background-color: #ededf0;
  border: 1px dashed rgba(0, 0, 0, 0.08);
}

.placeholder-icon {
  font-size: 18px;
  color: #9a9a9f;
}

/* --- Empty States --- */
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