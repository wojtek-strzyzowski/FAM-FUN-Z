<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import MainContent from '@/components/MainContent.vue';
import BlogCard from '@/components/BlogCard.vue';

const latestBlogs = ref([]);
const categories = ref([]);
const selectedCategory = ref('');
const sortOption = ref('desc'); // Standardmäßig nach Erstellungsdatum absteigend sortieren

onMounted(async () => {
  await loadCategories();
  await loadBlogs();
});

const loadCategories = async () => {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
    console.log('Kategorien geladen:', response.data);
  } catch (error) {
    console.error('Error loading categories:', error);
  }
};

const loadBlogs = async () => {
  try {
    const response = await axios.get('/api/blogs', {
      params: {
        category_id: selectedCategory.value,
        sort: sortOption.value,
        limit: 6 // Begrenze die Anzahl der abgerufenen Blogs auf 6
      }
    });
    latestBlogs.value = response.data;
    console.log('Blogs geladen:', response.data);
  } catch (error) {
    console.error('Error loading blogs:', error);
  }
};

watch([selectedCategory, sortOption], async () => {
  await loadBlogs();
});
</script>

<template>
  <MainContent>
    <div class="header">
      <h1>Die neuesten Beiträge</h1>

      <div class="filter">
        <label for="category">Kategorie:</label>
        <select id="category" v-model="selectedCategory">
          <option value="">Alle Kategorien</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="sort">
        <label for="sort">Sortieren nach:</label>
        <select id="sort" v-model="sortOption">
          <option value="desc">Neueste zuerst</option>
          <option value="asc">Älteste zuerst</option>
        </select>
      </div>
    </div>

    <div class="blog-list">
      <BlogCard v-for="blog in latestBlogs" :key="blog.id" :blog="blog" />
    </div>
  </MainContent>
</template>

<style scoped>


.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}

.filter {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.blog-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

</style>