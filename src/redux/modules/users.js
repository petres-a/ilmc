const LOAD = 'users/LOAD'
const LOAD_SUCCESS = 'users/LOAD_SUCCESS'
const LOAD_FAIL = 'users/LOAD_FAIL'

const initialState = {
  loaded: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    default:
      return state
  }
}

export function isLoaded (globalState) {
  return globalState.users && globalState.users.loaded
}

export function load (cityId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/cities/' + cityId + '/users')
  }
}
