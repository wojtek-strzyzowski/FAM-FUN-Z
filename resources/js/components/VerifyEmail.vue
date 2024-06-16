<script setup>

import{ ref } from 'vue';
import axios from 'axios';

const status = ref('');

const resendVerificationEmail = async () => {
  try {
    await axios.post('/email/verification-notification');
    status.value = 'verification-link-sent';
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
    
    <div class="verify-email">
      <h1>Überprüfe deine E-Mail-Adresse</h1>
      <p>Bevor du fortfahren kannst, überprüfe bitte deine E-Mail auf einen Verifizierungslink.</p>
      <p v-if="status === 'verification-link-sent'">Eine neue Verifizierungs-E-Mail wurde an deine E-Mail-Adresse gesendet.</p>
      <button @click="resendVerificationEmail">Verifizierungs-E-Mail erneut senden</button>
    </div>

  </template>

<style scoped>

.verify-email {
  text-align: center;
  padding: 20px;
}
</style>
