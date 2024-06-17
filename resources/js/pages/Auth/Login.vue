<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import AuthService from "@/services/AuthService";
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import MainContent from '@/components/MainContent.vue';

const router = useRouter();
const store = useAuthStore();

const user = ref({
    email : '',
    password : ''
});

const errorMessage = ref('');

const login = async() => {

    try {

        await AuthService.login(user.value);

        const authUser = await store.getAuthUser();

        if(authUser) {
          router.push("/dashboard");
        }
        else {
            errorMessage.value = 'Login fehlgeschlagen. Bitte versuchen Sie es erneut.';
        }
    } catch (error) {
        errorMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
        console.error(error);
      }
}

</script>

<template>

    <MainContent class="login-main-content">

        <div class="header">
            <h1 class="login-header">Login</h1>
            <p>Sollten Sie noch keinen Account besitzen können Sie sich</p>
            <router-link to="/register">hier registrieren</router-link>
        </div>
        
        <div class="login-fields">
            <form action="" method="post" @submit.prevent="login">


                <div class="form__group">
                    <label for="">E-Mail:</label>
                    <input type="email" name="email" v-model="user.email" autocomplete="email" required>
                </div>

                <div class="form__group">
                    <label for="">Passwort:</label>
                    <input type="password" name="password" v-model="user.password" autocomplete="current-password" required>
                </div>

                <button type="submit">Login</button>

                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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

input:focus, input:-internal-autofill-selected  {
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