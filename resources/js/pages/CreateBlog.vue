<script setup>
import { ref } from 'vue';
import axios from 'axios';
import MainContent from '@/components/MainContent.vue';

const title = ref('');
const description = ref('');
const content = ref('');
const thumbnail = ref(null);
const thumbnailPreview = ref(null);
const address = ref('');
const zip = ref('');
const city = ref('');

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  thumbnail.value = file;

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      thumbnailPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
const userId = ref(''); // Beispiel für die Benutzer-ID, normalerweise dynamisch

const submitForm = async () => {
  const formData = new FormData();
  formData.append('user_id', userId.value); // Füge user_id hinzu
  formData.append('title', title.value);
  formData.append('description', description.value);
  // Hinzugefügt: Adresse, PLZ und Stadt zum FormData hinzufügen
  formData.append('address', address.value);
  formData.append('zip', zip.value);
  formData.append('city', city.value);
  try {
    const contentJson = JSON.stringify(content.value);
    formData.append('content', contentJson);
  } catch (e) {
    console.error('Content ist kein gültiges JSON');
    return;
  }
  if (thumbnail.value) {
    formData.append('thumbnail', thumbnail.value);
  }

  try {
    const response = await axios.post('/api/blog/store', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    });
    console.log(response.data.message);
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};
</script>

<template>
    <MainContent title="Create Blog">
        <div class="header">
            <h1>Beitrag erstellen</h1>
        </div>

        <div class="blog-fields">
            <form method="POST" action="/blog/store" enctype="multipart/form-data" @submit.prevent="submitForm">
                <div class="form__group">
                    <label for="thumbnail" class="form-label">Bild hochladen:</label>
                    <input type="file" class="form-control" id="thumbnail" @change="handleFileUpload" name="thumbnail">
                </div>

                <div v-if="thumbnailPreview" class="form__group">
                    <label class="form-label">Bildvorschau:</label>
                    <img :src="thumbnailPreview" alt="Thumbnail Preview" class="thumbnail-preview">
                </div>
    
                <div class="form__group">
                    <label for="title" class="form-label">Titel</label>
                    <input type="text" class="form-control" id="title" v-model="title" name="title">
                </div>

                <div class="form__group">
                    <label for="description" class="form-label">Kurzbeschreibung:</label>
                    <input type="text" class="form-control" id="description" v-model="description" name="description">
                </div>

                <div class="form__group">
                    <label for="content" class="form-label">Inhalt:</label>
                    <textarea class="form-control" id="content" v-model="content" name="content"></textarea>
                </div>

                <div class="form__group">
                    <label for="adress" class="form-label">Adresse:</label>
                    <input v-model="address" type="text" placeholder="Adresse" class="form-control">
                    <label for="zip" class="form-label">Postleizahl:</label>
                    <input v-model="zip" type="text" placeholder="PLZ" class="form-control">
                    <label for="city" class="form-label">Stadt:</label>
                    <input v-model="city" type="text" placeholder="Stadt" class="form-control">
                </div>

                <button type="submit" class="btn btn-primary">Beitrag erstellen</button>
            </form>
        </div>
    </MainContent>
</template>

<style scoped>

.main-content {
    display: flex;
    align-items: center;
}

h1 {
    color: rgba(70, 28, 11);
}

.form__group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label {
    margin-bottom: 5px;
    font-size: larger;
}

input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(70, 28, 11);
    width: 300px;
    background-color: rgba(29, 27, 21, 0.46) !important;
}

input:focus, textarea:focus {
    background-color: rgba(29, 27, 21, 0.46) !important;
}

textarea {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(70, 28, 11);
    width: 300px;
    height: 500px;
    background-color: rgba(29, 27, 21, 0.46) !important;
}

form {
    text-align: center;
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

.thumbnail-preview {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
}
</style>
