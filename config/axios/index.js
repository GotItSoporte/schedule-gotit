import axios from 'axios';

const scheduleApi = axios.create({
  baseURL : 'http://localhost:3977/schedule/v1',
  headers :  { 'Content-Type': 'application/json' },
});

export { scheduleApi }