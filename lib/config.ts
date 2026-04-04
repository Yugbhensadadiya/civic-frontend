/**
 * Safely get the API base URL with runtime fallback
 * This function is evaluated at runtime, ensuring process.env is always available
 */
export function getApiBaseUrl(): string {
  // NEXT_PUBLIC_* variables are available in browser at runtime
  const envUrl = (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_API_URL : undefined) || 'https://civic-backend-2.onrender.com'
  const productionFallback = 'https://civic-backend-2.onrender.com'
  
  const apiUrl = envUrl || productionFallback
  
  // Debug logging only on client side
  if (typeof window !== 'undefined') {
    console.log('[API Config] Using API URL:', apiUrl)
    if (!envUrl) {
      console.warn('[API Config] NEXT_PUBLIC_API_URL not set, using fallback:', productionFallback)
    }
  }
  
  return apiUrl
}

// Export for use in components
export const API_BASE_URL = typeof window !== 'undefined' 
  ? getApiBaseUrl() 
  : ((typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_API_URL : undefined) || 'https://civic-backend-2.onrender.com')
