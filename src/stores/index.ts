// src/stores/index.ts или в другом файле, где ты создаешь Pinia store
import { createPinia } from 'pinia';
import piniaPersistedstate from 'pinia-plugin-persistedstate';

// Создаешь и настраиваешь Pinia
const pinia = createPinia();

// Подключаем плагин persist
pinia.use(piniaPersistedstate);

export default pinia;
