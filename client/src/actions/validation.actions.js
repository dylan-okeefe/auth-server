import api from './../util/api';

export const VALIDATION_REQUEST = 'VALIDATION_REQUEST';
export const VALIDATION_SUCCESS = 'VALIDATION_SUCCESS';
export const VALIDATION_FAILURE = 'VALIDATION_FAILURE';

function receiveValidation(json) {
  console.log(json);
  return {
    type: VALIDATION_SUCCESS,
    data: json,
    receivedAt: Date.now()
  }
}

function requestValidation() {
  return {
    type: VALIDATION_REQUEST
  }
}

function failureValidation(error) {
  return {
    type: VALIDATION_FAILURE,
    data: error,
    receivedAt: Date.now()
  }
}

function fetchValidation() {
  return dispatch => {
    dispatch(requestValidation())
    return api.fetchValidation()
      .then( response => response.json())
      .then(json => dispatch(receiveValidation(json)))
      .catch(error => dispatch(failureValidation(error)))
  }
}

export function fetchValidationIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(fetchValidation());
  }
}
