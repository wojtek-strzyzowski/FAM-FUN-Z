<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import MainContent from '@/components/MainContent.vue';

const blog = ref(null);
const category = ref(null);
const user = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    const response = await axios.get(`/api/blog/${route.params.id}`);
    blog.value = response.data;
    console.log('Blog geladen:', response.data);

    const categoryResponse = await axios.get(`/api/categories/${response.data.category_id}`);
    category.value = categoryResponse.data;
    console.log('Kategorie geladen:', categoryResponse.data);

    const userResponse = await axios.get(`/api/users/${response.data.user_id}`);
    user.value = userResponse.data;
    console.log('Benutzer geladen:', userResponse.data);
  } catch (error) {
    console.error('Error loading blog, category, or user:', error);
  }
});

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
};
</script>

<template>
    <MainContent>

      <div v-if="blog" class="blog">

        <div class="header">
            <div class="meta-info">
                <p>{{ formatDate(blog.created_at) }}</p>
                <p v-if="category">{{ category.name }}</p>
                <p v-if="user">{{ user.name }}</p>
            </div>
            <div class="description">
                <p>{{ blog.description }}</p>
            </div>
        </div>

        <div class="title">
                <h1>{{ blog.title }}</h1>
        </div>



        <div class="address-thumbnail">
          <div class="address">
            <p>{{ blog.address }}</p>
            <p>{{ blog.city }}, {{ blog.zip }}</p>
            <a :href="blog.homepage" target="_blank">{{ blog.homepage }}</a>
          </div>
    
          <slot class="google_maps"></slot>

            <img :src="`/storage/${blog.thumbnail}`" alt="Thumbnail">
        </div>
        <div class="content" v-html="blog.content"></div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </MainContent>
  </template>
  
  <style scoped>

  .main-content {
    display: flex;
    align-items: center;
  }
  
  .meta-info {
    display: flex;
    justify-content: center;
    gap: 20px; /* Abstand zwischen den Elementen */
    align-items: center;
  }
  
  .address-thumbnail {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 10px;
  }
  
  .address {
    flex: 1;
  }
  
  .address p {
    margin: 0;
  }
  
  .address-thumbnail img {
    max-width: 200px;
    margin-left: 20px;
  }

  .content {
  margin-top: 20px; /* Abstand zum Content */
}

  </style>