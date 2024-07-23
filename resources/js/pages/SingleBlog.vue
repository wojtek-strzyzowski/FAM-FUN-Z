<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import MainContent from '@/components/MainContent.vue';

const blog = ref(null);
const category = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    const response = await axios.get(`/api/blog/${route.params.id}`);
    blog.value = response.data;
    console.log('Blog geladen:', response.data); // Konsolenausgabe hinzufügen  

    // Laden der Kategorieinformationen
    const categoryResponse = await axios.get(`/api/categories/${response.data.category_id}`);
    category.value = categoryResponse.data;
    console.log('Kategorie geladen:', categoryResponse.data); // Konsolenausgabe hinzufügen  
  } catch (error) {
    console.error('Error loading blog or category:', error);
  }
});
</script>

<template>
  <MainContent>
    <div v-if="blog">
      <h1>{{ blog.title }}</h1>
      <img :src="`/storage/${blog.thumbnail}`" alt="Thumbnail">
      <p>{{ blog.description }}</p>
      <div v-html="blog.content"></div>
      <div>
        <h3>Kategorie</h3>
        <p v-if="category">{{ category.name }}</p>
        <p v-else>Loading category...</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </MainContent>
</template>