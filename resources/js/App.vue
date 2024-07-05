<script setup>
import { ref } from 'vue';
import LogoutButton from '@/components/LogoutButton.vue';
import SideBar from './components/SideBar.vue';

const menuActive = ref(false);


const toggleMenu = () => {
    menuActive.value = !menuActive.value;
};

</script>


<template>

        <header>

            <div class="logo">
                <router-link to="/" >
                    <img src="/public/images/FAM FUN Z Entdecken, Erfahren, Austauschen.png" alt="logo">
                </router-link>
            </div>
            

            <nav class="nav">
               
                <div class="nav-toggle" @click="toggleMenu">
                    ☰
                </div>
                <div class="nav-links" :class="{ active: menuActive }">
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                    <router-link to="/blog/beiträge">Blog/<br>Beiträge</router-link>
                    <router-link to="/login">Register/<br>Login</router-link>
                    <LogoutButton/>
                </div>  
                <!-- Fügen Sie hier weitere Links hinzu -->
              
            </nav>
        </header>

        <body>
           
        <main>
            <div class="slogan">
                <h3>Entdecken, Erfahren, Austauschen</h3>

                <h1>Das Portal von Eltern für Eltern</h1>
            </div>     

        </main>

        <div class="sidebar">
            <SideBar/>
        </div>

            <div class="hintergrund">
                <img src="/public/images/Hintergrund.png" alt="hintergrund-image" class="hintergrund" />
            </div>

            <router-view v-slot="{ Component, route }">
                <div :key="route.name" class="page">
                    <Component :is="Component" />
                </div>
            </router-view>
        </body>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');




* {
    box-sizing: border-box;
}

body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* Verhindert horizontales Scrollen */
}

header {
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(214, 155, 167, 0.6);
    color: rgba(70, 28, 11);
    height: 70px;
    width: 100%;
    padding: 0 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.logo {
    z-index: 1000;
}

.logo img {
    height: 50px;
}

.nav {
    display: flex;
    align-items: center;
}

.nav-toggle {
    display: none;
    cursor: pointer;
    font-size: 1.5em;
    margin-left: 20px;
}

.nav-links {
    display: flex;
    gap: 20px;
}

.nav-links a {
    text-decoration: none;
    color: rgba(70, 28, 11);
    font-size: 1em;
    padding: 5px 10px;
}

.nav-links a:hover {
    background-color: rgba(70, 28, 11, 0.1);
    border-radius: 5px;
}

.nav-links.active {
    display: none;
}

/* .sidebar {
    position: fixed;
    top: 0;
    height: 100%;
    width: 20%;
    background-color: rgba(106, 163, 175, 0.38);
    display: flex;
    align-items: start;
    justify-content: center;
} */

.hintergrund {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(70, 28, 11);
}

.slogan {
    padding-left: 25%;
    text-align: center;
}

h3 {
    color: rgba(70, 28, 11);
}

/* Media Queries für Responsivität */
@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        height: 30%;
        display: none;
    }

    header {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .logo {
        order: 1;
        margin-bottom: 10px;
    }

    .logo img {
        margin: 0 auto;
    }

    .nav {
        order: 2;
        width: 100%;
        justify-content: center;
    }

    .nav-toggle {
        display: block;
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .nav-links {
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(214, 155, 167, 0.95);
        gap: 0;
    }

    .nav-links.active {
        display: flex;
    }

    .nav-links a {
        padding: 10px;
        margin: 0;
        border-bottom: 1px solid rgba(70, 28, 11, 0.1);
    }

    .slogan {
        padding-left: 10%;
    }
}

@media (max-width: 480px) {
    .slogan {
        padding-left: 5%;
    }
}
</style>