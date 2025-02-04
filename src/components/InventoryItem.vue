<script setup lang="ts">
import { ref } from 'vue';
import { useInventoryStore, type InventoryItem } from '../stores/inventoryStore';  // Импортируем store для работы с инвентарем
 

const props = defineProps<{ item: InventoryItem }>();
const store = useInventoryStore();
const isDragging = ref(false);

const cellSize = 150;  // Размер ячейки

const onDragStart = (event: DragEvent) => {
  isDragging.value = true;
  event.dataTransfer?.setData('text/plain', props.item.id);
};

const onDragEnd = (event: DragEvent) => {
  isDragging.value = false;

  // Привязываем позицию к ближайшей ячейке сетки
  const x = Math.floor(event.clientX / cellSize) * cellSize;
  const y = Math.floor(event.clientY / cellSize) * cellSize;

  const item = store.items.find(item => item.id === props.item.id);
  if (item) {
    item.position.x = x;
    item.position.y = y;

    // Обновляем смещение по оси Z для накладывания
    item.zIndex = store.items.filter(i => i.position.x === x && i.position.y === y).length;

    store.saveToLocalStorage();
  }
};
</script>

<template>
  <div
    class="inventory-item"
    :style="{
      left: props.item.position.x + 'px',
      top: props.item.position.y + 'px',
      backgroundColor: props.item.color,  // Применяем цвет из props
      zIndex: props.item.zIndex,
    }"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <span>{{ props.item.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.inventory-item {
  position: absolute;
  width: 150px;
  height: 150px;
  padding: 10px;
  border-radius: 8px;
  color: white;
  text-align: center;
  cursor: grab;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: transform 0.2s;
  
  background: rgba(0, 0, 0, 0.7); /* Полупрозрачный фон для лучшей видимости накладывания */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Добавляем тень */
  
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    cursor: grabbing;
  }
}
</style>
