<script setup lang="ts">
import { defineProps } from 'vue';
import { InventoryItem } from '@/stores/inventoryStore';

const props = defineProps<{
  item: InventoryItem;
  onDelete: (id: string) => void;
}>();
</script>

<template>
  <div class="item-details">
    <h3>{{ item.name }}</h3>
    <p>{{ item.description }}</p>
    <button @click="onDelete(item.id)">Удалить</button>
  </div>
</template>

<style scoped lang="scss">
.item-details {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  z-index: 10;
  width: 200px;
  border-radius: 8px;
}

.item-details button {
  margin-top: 10px;
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.item-details button:hover {
  background: #ff1a1a;
}
</style>
