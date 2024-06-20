<script setup>
  import { useAuthStore } from '@/stores/AuthStore';
  import {useRouter} from 'vue-router';

  const router = useRouter();
  const store = useAuthStore();

  console.log(store.LoggedIn);

  const logout = async () => {
      await store.logout().then(() => {
          router.push('/login');
      });
  }
</script>

<template>
    <button
      type="button"
      @click="logout"
       v-if="store.user"
    >Logout
    </button>
  </template>
  

<style scoped>
  
  button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(70, 28, 11);
    background-color: rgba(70, 28, 11, 0.269);
    color: rgba(70, 28, 11);
    font-size: 1em;
    cursor: pointer;
  }

  </style>