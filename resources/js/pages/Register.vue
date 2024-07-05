<script setup>

import { ref } from 'vue';
import axios from 'axios';
import MainContent from '@/components/MainContent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const register = async () => {
    try {
        const response = await axios.post('/api/register', {
            name: name.value,
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        });

        console.log(response.data); // Hier solltest du die Rückgabe des Servers sehen

        // Optional: Weiterleitung zur nächsten Seite oder Anzeige einer Erfolgsmeldung
        router.push('/verify-email');
    } catch (error) {
        if (error.response) {
            console.error(error.response.data); // Handle error
        } else {
            console.error(error.message);
        }
    }
};

</script>

<template>

    <MainContent>

        <div class="header">
            <h1>Registrieren</h1>
        </div>

        <div class="register-fields">
            <form @submit.prevent="register" action="" method="post">

                <div class="form__group">
                    <label for="">Benutzername:</label>
                    <input type="text" v-model="name" name="name" autocomplete="benutzername" required>
                </div>

                <div class="form__group">
                    <label for="">Vorname:</label>
                    <input type="text" v-model="firstname" name="vorname" autocomplete="vorname" required>
                </div>

                <div class="form__group">
                    <label for="">Nachname:</label>
                    <input type="text" v-model="lastname" name="nachname" autocomplete="nachname" required>
                </div>

                <div class="form__group">
                    <label for="">E-Mail:</label>
                    <input type="email" v-model="email" name="email" autocomplete="email" required>
                </div>

                <div class="form__group">
                    <label for="">Passwort:</label>
                    <input type="password" v-model="password" name="password" autocomplete="new-password" required>
                </div>

                <div class="form__group">
                    <label for="">Passwort bestätigen:</label>
                    <input type="password" v-model="password_confirmation" name="password_confirmation" autocomplete="new-password" required>
                </div>

                <button type="submit">Registrieren</button>

            </form>
        </div>

    </MainContent>

</template>

<style scoped>

.main-content {
    display: flex;
    align-items: center;
    /* justify-content: center; */
}

h1 {
    color: rgba(70, 28, 11);
}

.login-header {
    text-align: center;
}

.header p {
    text-align: center;
    font-size:larger
}

.login-fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
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
    width: 300px; /* Adjust as needed */
    height: 40px; /* Adjust as needed */
    background-color: rgba(29, 27, 21, 0.46) !important;
}

input:focus {
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


</style>