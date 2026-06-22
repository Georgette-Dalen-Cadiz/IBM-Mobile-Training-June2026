<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Progress Summary -->
      <div class="summary-section" v-if="totalCount > 0">
        <ion-text color="medium">
          <p class="summary-text">{{ doneCount }} of {{ totalCount }} completed</p>
        </ion-text>
        <ion-progress-bar
          :value="totalCount ? doneCount / totalCount : 0"
          color="primary"
          class="slim-progress"
        />
      </div>

      <!-- Task List with Swipe-to-Delete -->
      <ion-list v-if="tasks.length > 0" lines="full" class="ion-margin-top">
        <ion-item-sliding v-for="task in tasks" :key="task.id">
          <ion-item>
            <ion-checkbox
              :checked="task.done"
              @ionChange="toggleTask(task.id)"
              slot="start"
              class="minimal-checkbox"
            />
            <ion-label :class="{ done: task.done }">
              {{ task.name }}
            </ion-label>
          </ion-item>

          <ion-item-options side="end">
            <ion-item-option color="danger" @click="removeTask(task.id)">
              <ion-icon :icon="trashOutline" slot="icon-only" />
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <!-- Clean Empty State -->
      <div v-else class="empty-state">
        <ion-text color="medium">
          <p>No tasks yet.</p>
        </ion-text>
      </div>

      <!-- Single, prominent FAB -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openAddPrompt" color="dark">
          <ion-icon :icon="addOutline" />
        </ion-fab-button>
      </ion-fab>

      <!-- Alert for adding task -->
      <ion-alert
        :is-open="isAlertOpen"
        header="New Task"
        :inputs="[
          {
            name: 'taskName',
            type: 'text',
            placeholder: 'What needs to be done?'
          }
        ]"
        :buttons="[
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Save',
            handler: (data) => {
              if (data.taskName && data.taskName.trim()) {
                addTask(data.taskName.trim())
              }
            }
          }
        ]"
        @didDismiss="isAlertOpen = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'

// Ionic components
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
} from '@ionic/vue'

// Icons
import {
  trashOutline,
  addOutline,
} from 'ionicons/icons'

const taskStore = useTaskStore()
const { tasks, doneCount, totalCount } = storeToRefs(taskStore)
const { addTask, toggleTask, removeTask } = taskStore

const isAlertOpen = ref(false)

function openAddPrompt() {
  isAlertOpen.value = true
}
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

/* Summary Section */
.summary-section {
  padding: 16px 24px 0;
}
.summary-text {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 500;
}
.slim-progress {
  height: 4px;
  border-radius: 4px;
  opacity: 0.8;
}

/* List & Items */
ion-item {
  --padding-start: 24px;
  --padding-end: 24px;
  --min-height: 60px;
  --border-color: var(--ion-color-step-100, #f4f5f8);
}
.minimal-checkbox {
  margin-right: 16px;
  --size: 20px;
}
.done {
  text-decoration: line-through;
  color: var(--ion-color-medium);
  transition: all 0.3s ease;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  font-size: 16px;
  letter-spacing: -0.3px;
}

/* FAB */
ion-fab-button {
  margin: 16px;
  --box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}
</style>