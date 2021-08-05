import axios from 'axios';

const scheduleApi = axios.create({
  baseURL : 'https://schedule-got-it.herokuapp.com/schedule/v1',
  headers :  { 'Content-Type': 'application/json' },
});

export { 
  scheduleApi
}