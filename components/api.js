import axios from 'axios';

// URL base de la API Strapi
const api = axios.create({
  baseURL: 'http://192.168.53.83:1337/api/flors', // Cambia localhost por tu IP si pruebas en un dispositivo físico
  
});

export default api;