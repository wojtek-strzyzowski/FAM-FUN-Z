<script setup>
import { useAuthStore } from '@/stores/AuthStore';

const store = useAuthStore();
</script>

<template>
  <div class="sidebar">
    <!-- Überprüfen, ob ein Benutzer eingeloggt ist -->
    <div class="sidebar-links" v-if="store.user">
      <router-link to="/dashboard">Profil</router-link>
      <router-link to="/create-blog">Blog ertsellen</router-link>
      <router-link to="/edit-blog">Blog bearbeiten</router-link>
      <!-- Weitere Links für eingeloggte Benutzer -->
    </div>
    <!-- Optional: Links anzeigen, die für nicht eingeloggte Benutzer sichtbar sein sollen -->
    <!-- <div v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Registrieren</router-link>
  </div> -->
  </div>
</template>

<style scoped>

.sidebar {
    position: fixed;
    top: 0;
    height: 100%;
    width: 20%;
    background-color: rgba(106, 163, 175, 0.38);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.sidebar-links a {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-decoration: none;
    color: rgba(70, 28, 11);
    font-size: 1em;
    padding: 5px 10px;
}

</style>