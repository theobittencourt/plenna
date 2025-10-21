import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    initialized: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    currentUser: (state) => state.user
  },

  actions: {
    async login(credentials) {
      this.loading = true
      try {
        const { data } = await api.post('/auth/login', credentials)
        this.token = data.access_token || data.token
        this.user = data.user
        localStorage.setItem('token', this.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return data
      } catch (error) {
        if (error.response?.status !== 401 || error.response?.data?.message !== 'Conta não ativada') {
          this.logout()
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      try {
        const { data } = await api.post('/auth/register', userData)
        this.token = data.access_token
        this.user = data.user
        localStorage.setItem('token', data.access_token)
        api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
        return data
      } catch (error) {
        this.logout()
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const { data } = await api.get('/users/profile')
        this.user = data
        return data
      } catch (error) {
        this.logout()
        throw error
      }
    },

    async fetchBalance() {
      if (!this.token) return
      try {
        const { data } = await api.get('/users/balance')
        if (this.user) {
          this.user.balance = data.balance
        }
        return data
      } catch (error) {
        console.error('Error fetching balance:', error)
      }
    },

    async updateProfile(profileData) {
      this.loading = true
      try {
        const { data } = await api.put('/users/profile', profileData)
        this.user = { ...this.user, ...data }
        return data
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async initializeAuth() {
      if (this.initialized) return
      
      if (this.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        try {
          await this.fetchUser()
          await this.fetchBalance()
        } catch (error) {
          this.logout()
        }
      }
      
      this.initialized = true
    },

    logout() {
      this.user = null
      this.token = null
      this.loading = false
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
  }
})
