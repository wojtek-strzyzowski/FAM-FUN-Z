import { createRouter, createWebHistory } from 'vue-router';
import VerifyEmail from './components/VerifyEmail.vue';
import Home from './pages/Home.vue';
import Register from './pages/Register.vue';
import Login from './pages/Auth/Login.vue';


export const routes = [
    {
        path: "/",
        component: () => import("./pages/Home.vue"),
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import("./pages/Register.vue"),
      },

    {
        path: "/login",
        name: "Login",
        component: () => import("./pages/Auth/Login.vue"),
    },

    {
        path: "/dashboard",
        component: () => import("./pages/Dashboard.vue"),
        meta: { requiresAuth: true },
    },

    {
        path: "/all-blogs",
        component: () => import("./pages/AllBlogs.vue"),
    },

    {
        path:"/blog",
        component: () => import("./pages/Blog.vue"),
    },
    
    {
        path:"/blog/:id",
        component: () => import("./pages/SingleBlog.vue"),
    },

    {
        path:"/about",
        component: () => import("./pages/About.vue"),
    },

    {
        path:"/create-Blog",
        component: () => import("./pages/CreateBlog.vue"),
    },

    {
        path:"/edit-blog",
        component: () => import("./pages/EditBlog.vue"),
    },

    {
        path:"/edit-blog/:id",
        component: () => import("./pages/EditBlog.vue"),
    },
    {
        path: '/verify-email',
        name: 'verify-email',
        component: VerifyEmail
      } 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;





