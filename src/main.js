// src/main.js
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import ApiServices from './services/ApiServices';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
ApiServices.init();
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');