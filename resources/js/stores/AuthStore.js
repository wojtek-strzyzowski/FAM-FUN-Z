import { defineStore } from 'pinia';
import AuthService from "@/services/AuthService";

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      user: null
    };
  },

  actions: {
    async getAuthUser() {
      try {
        let response = await AuthService.getAuthUser();
        console.log('AuthUser:', response.data);
        this.user = response.data;
        return this.user;
      } catch (error) {
        this.user = null;
        return null; // Rückgabe im Fehlerfall
      }
    },

    async login(payload) {
      return AuthService.login(payload).then(response => {
        this.user = response.data.user;
        return response;
      });
    },

    async logout() {
      return AuthService.logout().then(() => {
        this.user = null;
      });
    }
  },

  getters: {
    authUser: (state) => state.user,
  },
});