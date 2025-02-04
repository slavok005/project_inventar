<script setup lang="ts">
import { ref } from 'vue';
import { useInventoryStore } from '../stores/inventoryStore'; // Импортируем store для работы с инвентарем
import InventoryList from '../components/InventoryList.vue'; // Импортируем компонент для отображения списка предметов

const store = useInventoryStore(); // Получаем доступ к store

// Модель для нового предмета
const newItem = ref({
  name: '',
  description: '',
  color: '#ff0000',  // Добавлен цвет по умолчанию
  x: 0,
  y: 0,
});

const addItem = () => {
  if (newItem.value.name.trim()) {
    store.addItem({
      id: Date.now().toString(),  // Генерация уникального id
      name: newItem.value.name,
      description: newItem.value.description,
      color: newItem.value.color,  // Передаем цвет
      position: { x: newItem.value.x, y: newItem.value.y },
      zIndex: 0,  // Начальный zIndex
    });
    newItem.value = { name: '', description: '', color: '#ff0000', x: 0, y: 0 };  // Сброс формы
  }
};
</script>

<template>
  <div>
    <h1>Инвентарь</h1>
    <!-- Форма для добавления предметов -->
    <form @submit.prevent="addItem">
      <input v-model="newItem.name" placeholder="Название" required />
      <input v-model="newItem.description" placeholder="Описание" required />
      <input v-model="newItem.color" type="color" /> <!-- Поле для выбора цвета -->
      <button type="submit">Добавить предмет</button>
    </form>

    <!-- Список предметов -->
    <InventoryList />
  </div>
</template>

<style lang="scss" scoped>
form {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>
