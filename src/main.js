import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import router from './router'; // Đảm bảo đã import router

// Create the app instance only once
const app = createApp(App);

// Use both router and store with the same app instance
app.use(router);

// Mount the app to the DOM
app.mount('#app');
