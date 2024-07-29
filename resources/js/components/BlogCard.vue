<script setup>
import { defineProps } from 'vue';
import { useAuthStore } from '../stores/AuthStore';
const store = useAuthStore();
const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
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
              <p v-if="store.authUser">Autor: {{ store.authUser.name }}</p>
              <p v-else></p>
            </div>
          </div>
          <div class="front-description">
            <p>{{ blog.title }}</p>
            <!-- <p>{{ blog.category.name }}</p> -->
          </div>
        </div>
      </div>
      <div class="flip-card-back">
        <h1>{{ blog.title }}</h1> 
        <h2>{{ blog.description }}</h2>
        <router-link :to="`/blog/${blog.id}`">Weiterlesen</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

.flip-card {
  background-color: transparent;
  width: 300px;
  height: 450px; /* Feste Höhe für die Karte */
  perspective: 1000px;
  margin: 15px;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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
  overflow: hidden;
}
.flip-card-front {
  background-color:#18629285;
  color: rgba(70, 28, 11);
  border-radius: 5%;
}
.flip-card-back {
  background-color: #18629285;
  color:  rgba(70, 28, 11);
  transform: rotateY(180deg);
  border-radius: 5%;
}
.card-image-container {
  flex: 0 0 auto;
  width: 100%;
  height: 150px; /* Feste Höhe für das Bild */
  overflow: hidden;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Bild an den Container anpassen */
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
  gap: 100px;
}
.front-description {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>