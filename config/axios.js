import axios from 'axios';

exports. scheduleApi = axios.create({
  baseURL : 'https://localhost:3977',
  headers :  { 'Content-Type': 'application/json' },
});
