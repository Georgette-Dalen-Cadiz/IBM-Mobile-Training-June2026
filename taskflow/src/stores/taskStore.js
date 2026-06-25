import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const STORAGE_KEY = 'taskflow-tasks';

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([]);
  const nextId = ref(1);

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }

  function loadTasks() {
    let restored = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) restored = parsed;
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      restored = [];
    }
    tasks.value = restored;
    nextId.value = restored.reduce((max, task) => Math.max(max, task.id || 0), 0) + 1;
  }

  const totalCount = computed(() => tasks.value.length);
  const doneCount = computed(() => tasks.value.filter((task) => task.done).length);
  const pendingCount = computed(() => tasks.value.filter((task) => !task.done).length);
  const completedTasks = computed(() => tasks.value.filter((task) => task.done));

  function addTask(name) {
    if (!name || name.trim() === '') return;
    tasks.value.push({
      id: nextId.value++,
      name: name.trim(),
      done: false,
      photo: null,
    });
    saveTasks();
  }

  function toggleTask(id) {
    const task = tasks.value.find((task) => task.id === id);
    if (task) task.done = !task.done;
    saveTasks();
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
    saveTasks();
  }

  function addPhotoToTask(id, photo) {
    const task = tasks.value.find((task) => task.id === id);
    if (task) task.photo = photo;
    saveTasks();
  }

  function removePhotoFromTask(id) {
    const task = tasks.value.find((task) => task.id === id);
    if (task) task.photo = null;
    saveTasks();
  }

  return {
    tasks,
    totalCount,
    doneCount,
    pendingCount,
    completedTasks,
    addTask,
    toggleTask,
    removeTask,
    addPhotoToTask,
    removePhotoFromTask,
    saveTasks,
    loadTasks,
  };
});