import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([]);
  const nextId = ref(1);

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
  }

  function toggleTask(id) {
    const task = tasks.value.find((task) => task.id === id);
    if (task) task.done = !task.done;
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  function addPhotoToTask(id, photo) {
    const task = tasks.value.find((task) => task.id === id);
    if (task) task.photo = photo;
  }

  function removePhotoFromTask(id) {
    const task = tasks.value.find((task) => task.id === id);
    if (task) task.photo = null;
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
  };
});