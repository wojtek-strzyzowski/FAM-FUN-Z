<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MainContent from '@/components/MainContent.vue';
import BlogCard from '@/components/BlogCard.vue';

const latestBlogs = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/blogs?limit=6&sort=desc'); // Beispiel-API-Endpunkt mit Limit und Sortierung
    latestBlogs.value = response.data;
    console.log('Letzte Blogs geladen:', response.data);
  } catch (error) {
    console.error('Error loading latest blogs:', error);
  }
});
</script>

<template>
  <MainContent>
    <div class="header">
      <h1>Letzte Blogs</h1>
    </div>
    <div class="blog-list">
      <BlogCard v-for="blog in latestBlogs" :key="blog.id" :blog="blog" />
    </div>
  </MainContent>
</template>

<style scoped>
.blog-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
