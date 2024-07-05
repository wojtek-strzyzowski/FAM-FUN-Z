import "./bootstrap";
import { routes } from "./router";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from 'pinia'
import { createApp } from "vue";
import { useAuthStore } from "./stores/AuthStore";
import App from "./App.vue";
import axios from 'axios';
import Login from "./pages/Auth/Login.vue";


const app = createApp(App);
app.use(createPinia());
const store = useAuthStore();


const router = createRouter({
    history: createWebHistory(),
    routes,
});

// authenticate routes
router.beforeEach((to, from, next) => {
    const authUser = store.authUser;
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
    
    if(reqAuth && !authUser) {
      store.getAuthUser().then(() => {
        if (!store.authUser) next('/login');
        else next();
      });
    } else {
      next(); // make sure to always call next()!
    }
});

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found');
}


app.use(router);
app.component("Login",Login);
app.mount("#app");