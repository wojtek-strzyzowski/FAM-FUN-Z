import { createRouter, createWebHistory } from 'vue-router';


export const routes = [
    {
        path: "/",
        component: () => import("./pages/Home.vue"),
    },

    {
        path: "/login",
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
        path:"/edit-blog/:id",
        component: () => import("./pages/EditBlog.vue"),
    },
];





