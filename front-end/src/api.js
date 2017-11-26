import axios from 'axios'

const api_address = 'http://localhost:8000/';

export function login_request(userData) {
  return new Promise((resolve, reject) => {
    axios.post(api_address+'accounts/get_auth_token/', {
      'username': userData.username,
      'password': userData.password,
    })
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    });
  });
}

export function get_cashflows(authToken) {
  let config = {
    headers: {
      Authorization: 'Token ' + authToken,
    }
  };
  return new Promise((resolve, reject) => {
    axios.get(api_address+'entries/', config)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    });
  });
}
