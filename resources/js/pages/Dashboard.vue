<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/AuthStore';
import LogoutButton from '@/components/LogoutButton.vue';
import MainContent from '@/components/MainContent.vue';
import BlogCard from '@/components/BlogCard.vue';

const store = useAuthStore();
const blogs = ref([]);

// Methode zum Holen der Blogs des Benutzers
const fetchBlogs = async () => {
    try {
        const response = await axios.get(`/api/users/${store.authUser.id}/blogs`);
        blogs.value = response.data;
        console.log('Blogs geladen:', response.data);
    } catch (error) {
        console.error('Fehler beim Holen der Blogs:', error);
    }
};

onMounted(() => {
    fetchBlogs();
});

</script>

<template>
  <MainContent>
      <span>Dashboard</span>
      <h1>Hallo {{ store.authUser.name }}</h1>
      
      <div v-if="blogs.length">
          <h2>Deine Blogs:</h2>
          <div class="blog-cards-container">
              <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
          </div>
      </div>
      <div v-else>
          <p>Keine Blogs gefunden.</p>
      </div>
  </MainContent>
</template>

<style scoped>

.blog-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>