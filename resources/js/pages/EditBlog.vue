<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import MainContent from '@/components/MainContent.vue';

const router = useRouter();
const route = useRoute();

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
const category_id = ref(null); // Einzelne Kategorie-ID
const categories = ref([]);

const customSpecialOptions = ref([
  { id: 'toilet', label: 'WC', selected: false },
  { id: 'drinking_water', label: 'Trinkwasser', selected: false },
  { id: 'stroller_friendly', label: 'Kinderwagen freundlich', selected: false },
  { id: 'changing_room', label: 'Umkleide', selected: false },
  { id: 'restaurant_shopping', label: 'Restaurant/Einkaufen', selected: false },
]);

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

const getBlog = async (id) => {
  try {
    const response = await axios.get(`/api/blogs/get/${id}`);
    const blog = response.data;
    title.value = blog.title;
    description.value = blog.description;
    content.value = blog.content;
    address.value = blog.address;
    zip.value = blog.zip;
    city.value = blog.city;
    homepage.value = blog.homepage;
    category_id.value = blog.category_id;
    custom_special.value = JSON.parse(blog.custom_special || '[]');
    additionalInfo.value = blog.additional_info;
    thumbnailPreview.value = blog.thumbnail ? `/storage/${blog.thumbnail}` : null;

    // Initialisiere die Checkboxen basierend auf den gespeicherten Werten
    custom_special.value.forEach(id => {
      const option = customSpecialOptions.value.find(option => option.id === id);
      if (option) {
        option.selected = true;
      }
    });
  } catch (error) {
    console.error('Error loading blog:', error);
  }
};

const updateBlog = async () => {
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('content', content.value);
  formData.append('address', address.value);
  formData.append('zip', zip.value);
  formData.append('city', city.value);
  formData.append('homepage', homepage.value);
  formData.append('category_id', category_id.value);

  customSpecialOptions.value.forEach(option => {
    option.selected = custom_special.value.includes(option.id);
  });

  customSpecialOptions.value.push({ id: 'sonstiges', label: sonstiges.value, selected: true });

  formData.append('custom_special', JSON.stringify(customSpecialOptions.value));
  formData.append('additional_info', additionalInfo.value);

  if (thumbnail.value) {
    formData.append('thumbnail', thumbnail.value);
  }

  // Debugging: Log FormData
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  try {
    const response = await axios.post(`/api/blogs/update/${route.params.id}`, formData);
    console.log('Response:', response.data);
    router.push({ name: 'SingleBlog', params: { id: response.data.id } });
  } catch (error) {
    console.error('Error updating blog:', error.response ? error.response.data : error.message);
  }
  console.log('Update Blog:', content.value);
};

onMounted(() => {
  getBlog(route.params.id);
  axios.get('/api/categories')
    .then(response => {
      categories.value = response.data;
    });
});
</script>

<template>
  <MainContent title="Edit Blog">
    <form @submit.prevent="updateBlog">

      <div class="form__group">
        <label for="category">Category</label>
        <select id="category" v-model="category_id" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      
      <div class="form__group">
        <label for="thumbnail">Thumbnail</label>
        <input id="thumbnail" type="file" @change="handleFileUpload" />
        <img v-if="thumbnailPreview" :src="thumbnailPreview" alt="Thumbnail Preview" class="thumbnail-preview" />
      </div>

      <div class="form__group">
        <label for="title">Title</label>
        <input id="title" v-model="title" type="text" required />
      </div>
      <div class="form__group">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <div class="form__group">
        <label for="content">Content</label>
        <textarea id="content" v-model="content" required></textarea>
      </div>
      <div class="form__group">
        <label for="address">Address</label>
        <input id="address" v-model="address" type="text"  />
      </div>
      <div class="form__group">
        <label for="zip">ZIP</label>
        <input id="zip" v-model="zip" type="text"  />
      </div>
      <div class="form__group">
        <label for="city">City</label>
        <input id="city" v-model="city" type="text"  />
      </div>
      <div class="form__group">
        <label for="homepage">Homepage</label>
        <input id="homepage" v-model="homepage" type="text" />
      </div>

      <div class="form__group">
        <label for="custom_special">Ausstattung</label>
        <div class="custom_special">
          <div v-for="option in customSpecialOptions" :key="option.id" class="checkbox_container">
            <label :for="option.id">{{ option.label }}</label>
            <input type="checkbox" :id="option.id" :value="option.id" v-model="custom_special" />
          </div>
        </div>
      </div>
      <div class="form__group">
        <label for="additionalInfo">Additional Info</label>
        <textarea id="additionalInfo" v-model="additionalInfo"></textarea>
      </div>

      <button type="submit">Aktualisieren</button>
    </form>
  </MainContent>
</template>

<style scoped>
.form__group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.custom_special {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

label {
  font-size: larger;
}

input[type="text"],
input[type="url"],
textarea {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(70, 28, 11);
  width: 100%;
  background-color: rgba(29, 27, 21, 0.46) !important;
}

input:focus,
textarea:focus {
  background-color: rgba(29, 27, 21, 0.46) !important;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
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