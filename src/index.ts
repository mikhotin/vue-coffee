import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import './assets/styles/normalize.scss';

createApp(App).use(VueQueryPlugin).mount('#app');
