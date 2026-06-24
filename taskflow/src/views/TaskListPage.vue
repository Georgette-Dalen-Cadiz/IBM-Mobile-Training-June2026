<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="minimal-toolbar">
        <ion-title class="minimal-title">Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">      
      <template v-if="!isDetailRoute">
        <div class="summary-section" v-if="totalCount > 0">
          <div class="summary-header">
            <span class="summary-label">Progress</span>
            <ion-text color="medium">
              <p class="summary-text">{{ doneCount }} of {{ totalCount }} completed</p>
            </ion-text>
          </div>
          <ion-progress-bar
            :value="totalCount ? doneCount / totalCount : 0"
            color="dark"
            class="slim-progress"
          />
        </div>

        <ion-list v-if="tasks.length > 0" inset="true" lines="inset" class="minimal-list">
          <ion-item-sliding v-for="task in tasks" :key="task.id" class="minimal-sliding-item">
            <ion-item @click="goToDetail(task.id)" button detail="false" class="minimal-item">
              
              <ion-checkbox
                :checked="task.done"
                @ionChange="toggleTask(task.id)"
                @click.stop
                slot="start"
                class="minimal-checkbox"
                color="dark"
              />

              <div v-if="task.photo" slot="start" class="task-thumbnail">
                <ion-img :src="task.photo" alt="Task photo" />
              </div>
              <div v-else slot="start" class="task-thumbnail placeholder-thumbnail">
                <ion-icon :icon="imageOutline" class="placeholder-icon" />
              </div>

              <ion-label :class="{ done: task.done }" class="task-label" text-wrap="true">
                {{ task.name }}
              </ion-label>
            </ion-item>

            <ion-item-options side="end">
              <ion-item-option color="danger" class="minimal-delete-option" @click="removeTask(task.id)">
                <ion-icon :icon="trashOutline" slot="icon-only" />
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>

        <div v-else class="empty-state">
          <ion-icon :icon="clipboardOutline" class="empty-icon"></ion-icon>
          <ion-text color="medium">
            <p>No tasks yet.</p>
          </ion-text>
        </div>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="openAddPrompt" color="dark" class="minimal-fab">
            <ion-icon :icon="addOutline" />
          </ion-fab-button>
        </ion-fab>

        <ion-alert
          :is-open="isAlertOpen"
          header="New Task"
          css-class="minimal-alert"
          :inputs="[{ name: 'taskName', type: 'text', placeholder: 'What needs to be done?' }]"
          :buttons="[
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Save',
              cssClass: 'alert-button-confirm',
              handler: (data) => {
                if (data.taskName && data.taskName.trim()) {
                  addTask(data.taskName.trim());
                }
              },
            },
          ]"
          @didDismiss="isAlertOpen = false"
        />
      </template>

      <ion-router-outlet v-else />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/taskStore';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonLabel,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonCheckbox,
  IonProgressBar,
  IonText,
  IonFab,
  IonFabButton,
  IonAlert,
  IonRouterOutlet,
  IonImg,
} from '@ionic/vue';

import { trashOutline, addOutline, clipboardOutline, imageOutline } from 'ionicons/icons';

const router = useRouter();
const route = useRoute();
const taskStore = useTaskStore();
const { tasks, doneCount, totalCount } = storeToRefs(taskStore);
const { addTask, toggleTask, removeTask } = taskStore;

const isAlertOpen = ref(false);
const isDetailRoute = computed(() => route.params.tid !== undefined);

function openAddPrompt() {
  isAlertOpen.value = true;
}

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

.summary-section {
  padding: 24px 20px 8px 20px;
}
.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}
.summary-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #222222;
  letter-spacing: -0.01em;
}
.summary-text {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.slim-progress {
  height: 3px;
  border-radius: 8px;
  --background: rgba(0, 0, 0, 0.05);
}

.minimal-list {
  margin-top: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}
.minimal-item {
  --padding-top: 10px;
  --padding-bottom: 10px;
  --min-height: 56px;
}
.task-label {
  font-weight: 500;
  color: #333333;
  transition: color 0.25s ease;
  padding-right: 8px;
}

.minimal-checkbox {
  margin-right: 12px;
  --size: 20px;
  --border-radius: 6px;
  --border-width: 1.5px;
}

.task-thumbnail {
  width: 60px;
  max-width: 60px;
  height: 60px;
  max-height: 60px;
  
  margin-right: 14px;
  border-radius: 10px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  flex: 0 0 44px !important; 
}

.task-thumbnail ion-img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.task-thumbnail :deep(img) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.done ~ .task-thumbnail,
.minimal-item:has(.done) .task-thumbnail {
  opacity: 0.5;
  filter: grayscale(40%);
  transition: all 0.25s ease;
}

.placeholder-thumbnail {
  background-color: #f0f0f2;
  border: 1px dashed rgba(0, 0, 0, 0.1);
  box-shadow: none;
}

.placeholder-icon {
  font-size: 18px;
  color: #8a8a8f;
}

.done {
  text-decoration: line-through;
  color: #aaaaaa;
  opacity: 0.7;
}

.minimal-delete-option {
  font-size: 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
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

.minimal-fab {
  margin: 16px;
  --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); 
  --border-radius: 16px; 
}
</style>