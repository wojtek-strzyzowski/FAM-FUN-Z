<script setup>
    import { useAuthStore } from '../stores/AuthStore';
    import LogoutButton from '@/components/LogoutButton.vue';
    import MainContent from '@/components/MainContent.vue';

    const store = useAuthStore();

</script>


<template>
    
    <MainContent>

        <span>Dashboard</span>
        <h1>Hallo {{ store.authUser.name }}</h1>
    </MainContent>

</template>