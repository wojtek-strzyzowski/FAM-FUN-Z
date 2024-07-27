<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MainContent from '@/components/MainContent.vue';
import BlogCard from '@/components/BlogCard.vue';

const blogs = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/blogs');
    blogs.value = response.data;
    console.log('Blogs geladen:', response.data);
  } catch (error) {
    console.error('Error loading blogs:', error);
  }
});
</script>

<template>
  <MainContent>
    <div class="header">
      <h1>Alle Blogs</h1>
    </div>
    <div class="blog-list">
      <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
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
