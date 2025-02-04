<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventoryStore';
import InventoryItem from './InventoryItem.vue';

const store = useInventoryStore();
const gridSize = 5;  // Количество ячеек в сетке по одной оси (5x5)
const cellSize = 100;  // Размер каждой ячейки (в пикселях)

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  const itemId = event.dataTransfer?.getData('text/plain');
  if (!itemId) return;

  const item = store.items.find(i => i.id === itemId);
  if (item) {
    // Находим ближайшую ячейку для предмета
    const x = Math.floor(event.clientX / cellSize) * cellSize;
    const y = Math.floor(event.clientY / cellSize) * cellSize;

    item.position.x = x;
    item.position.y = y;

    store.saveToLocalStorage();
  }
};

const allowDrop = (event: DragEvent) => {
  event.preventDefault(); // Нужно для того, чтобы разрешить "дроп" элемента
};
</script>

<template>
  <div
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
  border: 2px dashed #ccc;
  display: flex;
  flex-wrap: wrap;
}

.grid-row {
  display: flex;
}

.grid-cell {
  border: 1px solid #ddd;
  box-sizing: border-box;
  background-color: #f9f9f9;
}

.inventory-item {
  z-index: 10;
  cursor: grab;
}

.inventory-item {
  position: absolute;
  width: 80px;
  height: 80px;
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
