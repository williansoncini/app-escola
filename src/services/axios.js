import axios from 'axios';

export default axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://35.215.255.138',
  baseURL: 'http://localhost:3001',
});
