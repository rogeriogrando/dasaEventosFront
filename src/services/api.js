import axios from 'axios';

const api = axios.create({
  baseURL: 'http://eventos.devjones.com.br:2222',
});

export default api;
