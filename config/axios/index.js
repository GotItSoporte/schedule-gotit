import { PersonPinCircleSharp } from '@material-ui/icons';
import axios from 'axios';

const scheduleApi = axios.create({
  baseURL : process.env.BASE_URL,
  headers :  { 'Content-Type': 'application/json' },
});

export { 
  scheduleApi
}