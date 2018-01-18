import * as actionTypes from '../actions';

export default function validation(state = {}, action) {
  switch(action.type){
    case actionTypes.default.VALIDATION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case actionTypes.default.VALIDATION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: [action.error]
      })

    case actionTypes.default.VALIDATION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        recievedAt: action.receivedAt
      })
    default:
      return state;
  }
}
