<script setup lang="ts">

import { useInventoryStore } from '../stores/inventoryStore';
import InventoryItem from './InventoryItem.vue';
import { ref } from 'vue';

const store = useInventoryStore();
const gridSize = 5;  // Количество ячеек в сетке по одной оси (5x5)
const cellSize = 150;  // Размер каждой ячейки (в пикселях)


// ref для контейнера
const containerRef = ref<HTMLElement | null>(null);

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  const itemId = event.dataTransfer?.getData('text/plain');
  if (!itemId || !containerRef.value) return;

  const item = store.items.find(i => i.id === itemId);
  if (item) {
    // Получаем границы контейнера
    const rect = containerRef.value.getBoundingClientRect();

    // Корректируем координаты относительно контейнера
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;

    // Вычисляем координаты для выравнивания по сетке (в центре ячейки)
    const x = Math.floor(relativeX / cellSize) * cellSize + (cellSize - 120) / 2;
    const y = Math.floor(relativeY / cellSize) * cellSize + (cellSize - 120) / 2;

    // Обновляем позицию предмета
    item.position.x = x;
    item.position.y = y;

    // Сохраняем данные
    store.saveToLocalStorage();
  }
};

const allowDrop = (event: DragEvent) => {
  event.preventDefault(); // Нужно для того, чтобы разрешить "дроп" элемента
};
</script>

<template>
 <div
  ref="containerRef"  
  class="inventory-container"
  @dragover="allowDrop"
  @drop="onDrop"
  :style="{ width: gridSize * cellSize + 'px', height: gridSize * cellSize + 'px' }"
>

    <!-- Сетка -->
    <div
      v-for="row in gridSize"
      :key="'row-' + row"
      class="grid-row"
      :style="{ height: cellSize + 'px' }"
    >
      <div
        v-for="col in gridSize"
        :key="'col-' + col"
        class="grid-cell"
        :style="{ width: cellSize + 'px', height: cellSize + 'px' }"
      />
    </div>

    <!-- Предметы -->
    <InventoryItem
      v-for="item in store.items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.inventory-container {
  position: relative;
  border: 4px dashed #ccc;
  display: flex;
  flex-wrap: wrap;
}

.grid-row {
  display: flex;
}

.grid-cell {
  border: 3px solid #ddd;
  box-sizing: border-box;
  background-color: #f9f9f9;
}

.inventory-item {
  z-index: 10;
  cursor: grab;
}

.inventory-item {
  position: absolute;
  width: 120px;
  height: 120px;
  padding: 10px;
  border-radius: 8px;
  color: rgb(35, 215, 19);
  text-align: center;
  cursor: grab;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    cursor: grabbing;
  }
}
</style>
