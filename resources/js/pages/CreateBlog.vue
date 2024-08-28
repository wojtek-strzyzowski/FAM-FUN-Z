<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MainContent from '@/components/MainContent.vue';
import { useRouter } from 'vue-router';

const router = useRouter(); 

const title = ref('');
const description = ref('');
const content = ref('');
const thumbnail = ref(null);
const thumbnailPreview = ref(null);
const address = ref('');
const zip = ref('');
const city = ref('');
const homepage = ref('');
const custom_special = ref([]);
const additionalInfo = ref('');
const sonstiges = ref('');
const category_id = ref([]);
// const selectedCategories = ref([]);

const categories = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/categories');
    console.log('Kategorien geladen:', response.data); // Konsolenausgabe hinzufügen
    categories.value = response.data;
  } catch (error) {
    console.error('Error loading categories:', error);
  }
});


const customSpecialOptions = [
  { id: 'toilet', label: 'WC' , selected:false},
  { id: 'drinking_water', label: 'Trinkwasser', selected:false },
  { id: 'stroller_friendly', label: 'Kinderwagen freundlich', selected:false},
  { id: 'changing_room', label: 'Umkleide', selected:false },
  { id: 'restaurant_shopping', label: 'Restaurant/Einkaufen', selected:false },
];

const updateCustomSpecial = (id) => {
  const index = custom_special.value.indexOf(id);
  if (index > -1) {
    custom_special.value.splice(index, 1);
  } else {
    custom_special.value.push(id);
  }
};

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
  formData.append('user_id', userId.value);
  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('content', content.value);
  formData.append('address', address.value);
  formData.append('zip', zip.value);
  formData.append('city', city.value);
  formData.append('homepage', homepage.value);
  formData.append('category_id', category_id.value);

  // Custom special as JSON array
  custom_special.value.forEach((item) => {
    customSpecialOptions.forEach((option) => {
      if (item === option.id) {
        option.selected = true;
      }
    });
  });

  customSpecialOptions.push({'id':'sonstiges','label': sonstiges.value, 'selected':true });

  formData.append('custom_special', JSON.stringify(customSpecialOptions)); 
  console.log(JSON.stringify(customSpecialOptions));
  formData.append('additional_info', additionalInfo.value);

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
    console.log('API Response:', response.data); // Konsolenausgabe hinzufügen
    console.log(response.data.message);
    router.push({ name: 'SingleBlog', params: { id: response.data.id } });
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
                  <label for="categories" class="form-label">Kategorien:</label>
                  <select id="categories" class="form-control" v-model="category_id" multiple>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>

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

                <div class="form-style">
                <div class="form__group spacing">
                  <div class="header">
                    <h2>Adresse:</h2>
                  </div>
                    <label for="adress" class="form-label">Adresse:</label>
                    <input v-model="address" type="text" placeholder="Adresse" class="form-control">
                    <label for="zip" class="form-label">Postleizahl:</label>
                    <input v-model="zip" type="text" placeholder="PLZ" class="form-control">
                    <label for="city" class="form-label">Stadt:</label>
                    <input v-model="city" type="text" placeholder="Stadt" class="form-control">
                    <label for="homepage" class="form-label">Homepage:</label>
                    <input v-model="homepage" type="text" placeholder="homepage" class="form-control">
                </div>

                <div class="form_group">
                  <h2>Ausstattung:</h2>
                  <div class="big-container">
                    <div class="checkbox_container" v-for="(item, index) in customSpecialOptions" :key="index">
                      <div class="label">
                        <label :for="item.id">{{ item.label }}</label>
                      </div>
                      <div class="checkbox">
                        <input type="checkbox" :id="item.id" :value="item.id" @change="updateCustomSpecial(item.id)">
                      </div>
                    </div>
                    <div>
                        <label for="sonstiges" class="form-label">Sonstiges:</label>
                        <input v-model="sonstiges" type="text" placeholder="Sonstiges" class="form-control">
                      </div>
                  </div>
                </div>
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

.custom_special {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

label {
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
  font-size: larger;
}

input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(70, 28, 11);
  width: 100%;
  background-color: rgba(29, 27, 21, 0.46) !important;
}

input:focus, textarea:focus {
  background-color: rgba(29, 27, 21, 0.46) !important;
}

textarea {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(70, 28, 11);
  width: 100%;
  height: 500px;
  background-color: rgba(29, 27, 21, 0.46) !important;
}

form {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  text-align: center;
}

.checkbox_container {
  display: flex;
  flex-direction: row; /* Behält die horizontale Ausrichtung bei */
  align-items: center; /* Zentriert die Inhalte vertikal */
  margin-bottom: 15px; /* Fügt Abstand zwischen den Checkbox-Containern hinzu */
}

.checkbox {
  margin-left: 20px; /* Verschiebt die Checkboxen nach rechts */
  display: flex;
  align-items: center; /* Zentriert den Text neben der Checkbox */
}

.label {
  flex-grow: 1; /* Lässt das Label den verfügbaren Platz ausfüllen */
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