import { defineStore } from 'pinia';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  zIndex: number;
  color: string; // Добавляем цвет
}


export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('inventory') || '[]') as InventoryItem[],
  }),

  actions: {
    addItem(item: InventoryItem) {
      this.items.push(item);
      this.saveToLocalStorage();
    },

  // Убедись, что функция удаления правильно обновляет items в store
removeItem(id: string) {
  this.items = this.items.filter(item => item.id !== id); // Убираем предмет с указанным id
  this.saveToLocalStorage(); // Сохраняем изменения в localStorage
}
,

    updatePosition(id: string, position: { x: number; y: number }) {
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.position = this.calculateSnapToGrid(position);
        item.zIndex = this.items.filter(i => i.position.x === item.position.x && i.position.y === item.position.y).length;
        this.saveToLocalStorage();
      }
    },
    

    calculateSnapToGrid(position: { x: number; y: number }) {
      const gridSize = 100;
      return {
        x: Math.floor(position.x / gridSize) * gridSize,
        y: Math.floor(position.y / gridSize) * gridSize,
      };
    },

    saveToLocalStorage() {
      localStorage.setItem('inventory', JSON.stringify(this.items));
    },
  },

  // Эта строка включает сохранение состояния в localStorage
  persist: true,
});
