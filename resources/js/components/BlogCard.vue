<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { defineProps } from 'vue';

const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
});

const authorName = ref('');

onMounted(async () => {
  try {
    const userResponse = await axios.get(`/api/users/${props.blog.user_id}`);
    authorName.value = userResponse.data.name;
  } catch (error) {
    console.error('Error loading user:', error);
  }
});
</script>

<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="card-image-container">
          <img v-if="blog.thumbnail" :src="`/storage/${blog.thumbnail}`" alt="Card" class="card-image">
          <div v-else class="no-thumbnail">
            <img src="/public/images/violett-gold.png" alt="No Thumbnail" class="card-image">
          </div>
        </div>
        <div class="front-text">
          <div class="created"> 
            <div class="Date">  
              <p>Erstellt am: {{ new Date(blog.created_at).toLocaleDateString('de-DE') }}</p>
            </div>
            <div class="User"> 
              <p>Autor: {{ authorName }}</p>
            </div>
          </div>
          <div class="front-description">
            <p>{{ blog.title }}</p>
          </div>
        </div>
      </div>
      <div class="flip-card-back">
        <h1>{{ blog.title }}</h1> 
        <p>{{ blog.description }}</p>
        <router-link :to="`/blog/${blog.id}`">Weiterlesen</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 450px;
  perspective: 1000px;
  margin: 15px;
  border-radius: 15px; /* Abgerundete Ecken */
  box-shadow: 0 10px 20px rgba(0,0,0,0.15); /* Tieferer Schatten */
  overflow: hidden; /* Überlauf verstecken */
  transition: transform 0.6s; /* Sanfter Übergang bei Hover */
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px;
}

.flip-card-front {
  background: linear-gradient(125deg, rgba(255, 174, 0, 0.692), rgba(100, 85, 236, 0.767)); /* Farbverlauf */
  color: rgba(70, 28, 11); /* Weißer Text */
  border-radius: 15px; /* Gleiche abgerundete Ecken */
}

.flip-card-back {
  background: linear-gradient(90deg, rgba(33, 212, 248, 0.664), rgba(106, 163, 175, 0.38)); /* Umgekehrter Farbverlauf */
  color: rgba(70, 28, 11);
  transform: rotateY(180deg);
  border-radius: 15px; /* Gleiche abgerundete Ecken */
}

.card-image-container {
  flex: 0 0 auto;
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 15px 15px 0 0; /* Abgerundete obere Ecken */
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.front-text {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}

.created {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px; /* Kleinere Lücke */
}

.front-description {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.no-thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff; /* Hintergrundfarbe für fehlende Thumbnails */
  height: 100%;
}

.no-thumbnail img {
  width: 50%; /* Bildgröße anpassen */
}
</style>