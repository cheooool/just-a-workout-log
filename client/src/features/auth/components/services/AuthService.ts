import http from '../../../../lib/http-common';

export type SignData = {
  username: string;
  password: string;
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
};
export default AuthService;
