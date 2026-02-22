import axios from 'axios'

export default axios.create({
    baseURL: 'https://heartos-production.up.railway.app/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})