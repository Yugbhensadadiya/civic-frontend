import axios from 'axios'

// Ensure API base URL is always defined with production fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://civic-backend-2.onrender.com'

// Debug log to verify API base URL
if (typeof window !== 'undefined') {
  console.log('API BASE URL:', API_BASE_URL)
}

const api = axios.create({
  baseURL: API_BASE_URL
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
      console.error('Network error or no response:', error.message, 'API_BASE_URL:', API_BASE_URL)
    }
    return Promise.reject(error)
  }
)

export default api
