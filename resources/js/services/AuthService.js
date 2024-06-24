import axios from "axios";
import {useAuthStore} from "@/stores/AuthStore";

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
// authClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     if (
//       error.response &&
//       [401, 419].includes(error.response.status) &&
//       store.getters["auth/authUser"] &&
//       !store.getters["auth/guest"]
//     ) {
//       store.dispatch("auth/logout");
//     }
//     return Promise.reject(error);
//   }
// );

/*
  AUTH METHODS
*/
export default {

  async login(payload) {
    // CSRF-Cookie abrufen
    await authClient.get("/sanctum/csrf-cookie");
    window.axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  };
    // Versuchen, den Benutzer anzumelden
    const response = await authClient.post("/login", payload);

    // Ausgabe der Antwort im Konsolenfenster zur Überprüfung
    console.log(response.data);

    // Überprüfen, ob die Antwort ein Benutzerobjekt enthält
    if (!response.data.user) {
      throw new Error("Die Antwort vom Server enthält kein Benutzerobjekt.");
    }

    // Überprüfen, ob die E-Mail verifiziert ist
    if (!response.data.user.email_verified_at) {
      throw new Error("Bitte verifizieren Sie zuerst Ihre E-Mail-Adresse.");
    }

    // Erfolgreichen Login zurückgeben
    return response.data;
  },

  logout() {
    return authClient.post("/logout");
  },

  async forgotPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/forgot-password", payload);
  },

  getAuthUser() {
    return authClient.get("/users/auth");
  },

  async resetPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/reset-password", payload);
  },

  updatePassword(payload) {
    return authClient.put("/user/password", payload);
  },

  async registerUser(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/register", payload);
  },

  sendVerification(payload) {
    return authClient.post("/email/verification-notification", payload);
  },

  updateUser(payload) {
    return authClient.put("/user/profile-information", payload);
  },
};