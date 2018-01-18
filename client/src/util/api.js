import fetch from 'isomorphic-fetch';

const postConfig = (body) => {
    return {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
};

const getConfig = () => {
  return {
    method: 'GET',
    mode: 'no-cors',
    credentials: 'same-origin'
  }
}

const API_BASE = 'http://localhost:3000/api';

const fetchValidation = () => {
  return fetch(`${API_BASE}/validate`);
}

export default {
  fetchValidation,
}
