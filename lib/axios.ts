import axios from 'axios'
import { getApiBaseUrl } from './config'

const api = axios.create({
  baseURL: typeof window !== 'undefined' ? getApiBaseUrl() : 'https://civic-backend-2.onrender.com'
})

// Add request interceptor to include authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || localStorage.getItem('adminToken')
    const isTokenValid = Boolean(token && token !== 'undefined' && token !== 'null')
    
    if (isTokenValid) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('access_token')
      console.warn('Authentication failed, token cleared')
    }
    // Log detailed error info for debugging
    if (error.code === 'ERR_NETWORK' || !error.response) {
      const currentBaseUrl = typeof window !== 'undefined' ? getApiBaseUrl() : 'https://civic-backend-2.onrender.com'
      console.error('Network error or no response:', error.message, 'API_BASE_URL:', currentBaseUrl)
    }
    return Promise.reject(error)
  }
)

export default api
