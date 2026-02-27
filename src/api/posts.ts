import axios from 'axios'

const api = axios.create({
    baseURL: 'https://heartos-production.up.railway.app/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = '/auth/login'
        }
        return Promise.reject(error)
    }
)

export default api