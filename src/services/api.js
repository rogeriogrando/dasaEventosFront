import axios from 'axios';

const api = axios.create({
  baseURL: 'http://eventos.devjones.com.br',
});

export default api;
