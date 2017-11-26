import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function setLogin(token) {
  cookies.set('login', token, {path: '/'});
}

export function logout() {
  cookies.remove('login');
}

export function getAuthToken() {
  return new Promise((resolve, reject) => {
    resolve(cookies.get('login'));
  });
}
