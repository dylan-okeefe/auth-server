import fetch from 'isomorphic-fetch';

const postConfig = (body) => {
    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
};

const API_BASE = 'http://localhost:3001';

export default {
}
