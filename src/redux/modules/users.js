const LOAD = 'users/LOAD'
const LOAD_SUCCESS = 'users/LOAD_SUCCESS'
const LOAD_FAIL = 'users/LOAD_FAIL'
const USERS = 'users/USERS'
const USERS_SUCCESS = 'users/USERS_SUCCESS'
const USERS_FAIL = 'users/USERS_FAIL'
const CITIZENS = 'user/CITIZENS'
const CITIZENS_SUCCESS = 'user/CITIZENS_SUCESS'
const CITIZENS_FAIL = 'user/CITIZENS_FAIL'

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
        users: action.result
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    case USERS:
      return {
        ...state,
        usersLoading: true
      }
    case USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        usersLoaded: true,
        users: action.result
      }
    case USERS_FAIL:
      return {
        ...state,
        usersLoading: false,
        usersLoaded: false,
        error: action.error
      }
    case CITIZENS:
      return {
        ...state,
        loadingCitizens: true
      }
    case CITIZENS_SUCCESS:
      return {
        ...state,
        loadingCitizens: false,
        loadedCitizens: true,
        users: action.result
      }
    case CITIZENS_FAIL:
      return {
        ...state,
        loadingCitizens: false,
        loadedCitizens: false,
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
    promise: (client) => client.get('/api/cities/' + cityId + '/citizens')
  }
}

export function users () {
  return {
    types: [USERS, USERS_SUCCESS, USERS_FAIL],
    promise: (client) => client.get('/api/users')
  }
}

export function citizens (cityId) {
  return {
    types: [CITIZENS, CITIZENS_SUCCESS, CITIZENS_FAIL],
    promise: (client) => client.get('/api/cities/' + cityId + '/citizens')
  }
}
