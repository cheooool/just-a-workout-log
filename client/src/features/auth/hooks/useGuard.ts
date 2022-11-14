import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function useGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (AuthService.hasToken()) {
      navigate('/', {
        replace: true,
      });
    }
  }, [navigate]);
}

export default useGuard;
