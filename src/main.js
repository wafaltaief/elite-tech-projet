// // import { createApp } from 'vue'
// // import App from './App.vue'

// // createApp(App).mount('#app')
// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router'; // Import the router configuration

// createApp(App)
//   .use(router) // Use the router
//   .mount('#app'); // Mount the app on the #app element

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.mount('#app');
