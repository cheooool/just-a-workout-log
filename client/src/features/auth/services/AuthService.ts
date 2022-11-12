import http from '../../../lib/http-common';
export type SignData = {
  username: string;
  password: string;
};

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const setToken = (token: string) => {
  if (token) {
    localStorage.setItem('token', token);
    http.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common['authorization'];
  }
};

const hasToken = () => {
  return !!getToken();
};

const signUp = async ({ username, password }: SignData) => {
  return http.post('/auth/signUp', {
    username,
    password,
  });
};

const signIn = async ({ username, password }: SignData) => {
  return http.post<{
    token: string;
  }>('/auth/signIn', {
    username,
    password,
  });
};

const AuthService = {
  signUp,
  signIn,

  getToken,
  setToken,
  hasToken,
};
export default AuthService;
