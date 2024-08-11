<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import MainContent from '@/components/MainContent.vue';

const blog = ref(null);
const category = ref(null);
const user = ref(null);
const route = useRoute();
const router = useRouter();

const selectedSpecials = computed(() => {
  if (!blog.value || !blog.value.custom_special) return [];
  let specials;
  try {
    specials = JSON.parse(blog.value.custom_special);
  } catch (e) {
    console.error('Error parsing custom_special:', e);
    return [];
  }
  return specials.filter(special => special.selected);
});

onMounted(async () => {
  try {
    const response = await axios.get(`/api/blog/${route.params.id}`);
    blog.value = response.data;
    console.log('styso geladen:', response.data);
    console.log(blog.value.custom_special); 

    const categoryResponse = await axios.get(`/api/categories/${response.data.category_id}`);
    category.value = categoryResponse.data;
    console.log('Kategorie geladen:', categoryResponse.data);

    const userResponse = await axios.get(`/api/users/${response.data.user_id}`);
    user.value = userResponse.data;
    console.log('Benutzer geladen:', userResponse.data);

    console.log('Ausgewählte Specials:', selectedSpecials.value);
  } catch (error) {
    console.error('Error loading blog, category, or user:', error);
  }
});

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
};

const editBlog = () => {
  router.push(`/edit-blog/${route.params.id}`);
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

      <div v-if="selectedSpecials && selectedSpecials.length > 0">
        <h3>Ausstattung und Besonderheiten:</h3>
        <ul>
          <li v-for="(special, index) in selectedSpecials" :key="index">
            {{ special.label }} 
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Keine Specials ausgewählt.</p>
      </div>
      <div class="content" v-html="blog.content"></div>
    </div>
    
    <div v-else>
      <p>Loading...</p>
    </div>
    <button @click="editBlog">Editieren</button>
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
  gap: 20px;
  align-items: center;
}

.title, .description {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.address-thumbnail {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
}

.address {
  margin-top: 20px;
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
  margin-top: 20px;
}

button {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(70, 28, 11);
    background-color: rgba(70, 28, 11, 0.269);
    color: rgba(70, 28, 11);
    font-size: larger;
    cursor: pointer;
}

</style>