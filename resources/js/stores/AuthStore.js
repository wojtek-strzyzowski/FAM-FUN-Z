
import { defineStore } from 'pinia'
import AuthService from "@/services/AuthService";


export const useAuthStore = defineStore('AuthStore', {
  
  state: () => {
    return {
        user: null
    }
  },

  
  actions: {

    async getAuthUser(){
        try{
          let response = await AuthService.getAuthUser();
        
          this.user = await response.data;
          return this.user;
        }
        catch(error){
          this.user = null;
        }
    },

    async login(payload){
      return AuthService.login(payload).then(response => {
        this.user = response.data.user;
        return response;
      });
    },

    async logout(){
      return AuthService.logout().then(() => {
        this.user = null;
      });
    }

  },


  // get Elements from store
  getters: {

    authUser: (state) => state.user,
  },


})