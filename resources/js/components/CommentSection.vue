<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  blogId: {
    type: Number,
    required: true
  }
});

const comments = ref([]);
const newComment = ref('');
let pollingInterval = null;

onMounted(async () => {
  await fetchComments();
  startPolling();
});

onUnmounted(() => {
  stopPolling();
});

watch(() => props.blogId, async () => {
  await fetchComments();
  stopPolling();
  startPolling();
});

const fetchComments = async () => {
  try {
    const response = await axios.get(`/api/comments?blog_id=${props.blogId}`);
    comments.value = response.data;
    console.log('Kommentare geladen:', response.data);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const submitComment = async () => {
  if (newComment.value.trim() === '') return;

  try {
    const response = await axios.post('/api/comments/store', {
      blog_id: props.blogId,
      content: newComment.value,
    });
    comments.value.push(response.data);
    newComment.value = '';
    await fetchComments(); // Kommentare nach dem Speichern neu laden
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};

const startPolling = () => {
  pollingInterval = setInterval(fetchComments, 5000); // Alle 5 Sekunden Kommentare abrufen
};

const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
};
</script>

<template>
  <div class="comment-section">
    <h2>Kommentare</h2>
    <div v-if="comments.length === 0">Keine Kommentare vorhanden.</div>
    <div v-else>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <p>{{ comment.content }}</p>
      </div>
    </div>
    <div class="new-comment">
      <textarea v-model="newComment" placeholder="Schreibe einen Kommentar..."></textarea>
      <button @click="submitComment">Kommentar hinzufügen</button>
    </div>
  </div>
</template>

<style scoped>
.comment-section {
  margin-top: 40px;
  max-height: 400px; /* Setze eine maximale Höhe */
  overflow-y: auto; /* Ermögliche vertikales Scrollen */
}

.comment {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.new-comment {
  margin-top: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>