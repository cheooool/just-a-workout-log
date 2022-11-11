import axios from 'axios';
import AuthService from '../features/auth/components/services/AuthService';

export default axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AuthService.getToken()}`,
  },
});
