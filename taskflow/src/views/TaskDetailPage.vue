<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="minimal-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tasks" color="dark"></ion-back-button>
        </ion-buttons>
        <ion-title class="minimal-title">Task Details</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      <div v-if="task" class="detail-wrapper">
        
        <h1 class="task-title">{{ task.name }}</h1>

        <ion-list inset="true" lines="full" class="minimal-list">
          <ion-item class="minimal-item">
            <ion-label class="meta-label">Status</ion-label>
            <div slot="end" class="status-badge" :class="task.done ? 'badge-done' : 'badge-pending'">
              <ion-icon :icon="task.done ? checkmarkCircleOutline : timeOutline" class="badge-icon"></ion-icon>
              <span>{{ task.done ? 'Completed' : 'Pending' }}</span>
            </div>
          </ion-item>
          
          <ion-item class="minimal-item">
            <ion-label class="meta-label">Task ID</ion-label>
            <ion-note slot="end" class="id-note">#{{ task.id }}</ion-note>
          </ion-item>
        </ion-list>

        <div class="photo-section">
          <div class="photo-header">
            <span class="section-title">Attached Photo</span>
            <ion-button
              v-if="task.photo"
              fill="clear"
              size="small"
              color="danger"
              class="photo-remove-btn"
              @click="removePhoto"
            >
              <ion-icon slot="start" :icon="trashOutline"></ion-icon>
              Remove
            </ion-button>
          </div>

          <div v-if="task.photo" class="photo-frame">
            <ion-img :src="task.photo" alt="Task photo" class="task-photo" />
            
            <div class="photo-overlay-action">
              <ion-button fill="solid" color="dark" size="small" class="photo-fab-action" @click="takePhoto">
                <ion-icon slot="start" :icon="cameraOutline"></ion-icon>
                Replace Photo
              </ion-button>
            </div>
          </div>

          <div v-else class="photo-empty" @click="takePhoto">
            <div class="photo-empty-circle">
              <ion-icon :icon="cameraOutline" class="photo-empty-icon"></ion-icon>
            </div>
            <p class="photo-empty-text">Add a photo to this task</p>
            <p class="photo-empty-subtext">Tap to open camera or gallery</p>
          </div>
        </div>
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
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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
  IonIcon,
  IonButton,
  IonImg,
} from '@ionic/vue';
import {
  checkmarkCircleOutline,
  timeOutline,
  alertCircleOutline,
  cameraOutline,
  trashOutline,
} from 'ionicons/icons';

const route = useRoute();
const taskStore = useTaskStore();

const taskId = computed(() => Number(route.params.tid));
const task = computed(() =>
  taskStore.tasks.find((t) => t.id === taskId.value)
);

async function takePhoto() {
  if (!task.value) return;
  try {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });
    if (image.dataUrl) {
      taskStore.addPhotoToTask(task.value.id, image.dataUrl);
    }
  } catch (error) {
    console.debug('Photo capture cancelled or failed:', error);
  }
}

function removePhoto() {
  if (task.value) taskStore.removePhotoFromTask(task.value.id);
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

.detail-wrapper {
  padding: 16px 0 32px 0;
}

.task-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 8px 20px 24px 20px;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.minimal-list {
  margin: 0 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  border-radius: 14px;
  overflow: hidden;
}

.minimal-item {
  --padding-top: 12px;
  --padding-bottom: 12px;
  --background: #ffffff;
}

.meta-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #666666;
}

.id-note {
  font-size: 0.9rem;
  font-weight: 600;
  color: #a0a0a0;
  font-family: monospace;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 100px;
}

.badge-done {
  background-color: rgba(45, 211, 111, 0.12);
  color: #2dd36f;
}

.badge-pending {
  background-color: rgba(255, 196, 9, 0.12);
  color: #e09e00; 
}

.badge-icon {
  font-size: 14px;
}

.photo-section {
  margin: 28px 16px 0 16px;
}

.photo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 4px;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #222222;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.photo-remove-btn {
  --padding-start: 4px;
  --padding-end: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: none;
  margin: 0;
}

.photo-frame {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
  background-color: #eaeaea;
}

.task-photo {
  width: 100%;
  height: auto;
  max-height: 380px;
  object-fit: cover;
  display: block;
}

.photo-overlay-action {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
  display: flex;
  justify-content: center;
}

.photo-fab-action {
  --border-radius: 10px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 600;
  text-transform: none;
  font-size: 0.85rem;
  margin: 0;
}

.photo-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border: 2px dashed rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.photo-empty:active {
  background-color: rgba(0, 0, 0, 0.02);
  transform: scale(0.99);
}

.photo-empty-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #f4f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.photo-empty-icon {
  font-size: 24px;
  color: #666666;
}

.photo-empty-text {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #333333;
}

.photo-empty-subtext {
  margin: 4px 0 0 0;
  font-size: 0.8rem;
  color: #888888;
}

/* Empty Route Handling Layout Style View Rules */
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