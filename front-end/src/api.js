import axios from 'axios'

const api_address = 'http://localhost:8000/';

function get_header(authToken) {
  return {
    headers: {
      Authorization: 'Token ' + authToken,
    }
  };
}

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
  let config = get_header(authToken);
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

export function add_cashflow(authToken, newCashflow) {
  let config = get_header(authToken);
  return new Promise((resolve, reject) => {
    axios.post(api_address+'entries/', newCashflow, config)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    });
  });
}

export function delete_cashflow(authToken, id) {
  let config = get_header(authToken);
  return new Promise((resolve, reject) => {
    axios.delete(api_address+'entries/'+id, config)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    });
  });
}
