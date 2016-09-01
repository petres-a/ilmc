const LOAD = 'auth/LOAD'
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS'
const LOAD_FAIL = 'auth/LOAD_FAIL'
const SIGNIN = 'auth/SIGNIN'
const SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS'
const SIGNIN_FAIL = 'auth/SIGNIN_FAIL'
const SIGNUP = 'auth/SIGNUP'
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS'
const SIGNUP_FAIL = 'auth/SIGNUP_FAIL'
const SIGNOUT = 'auth/SIGNOUT'
const SIGNOUT_SUCCESS = 'auth/SIGNOUT_SUCCESS'
const SIGNOUT_FAIL = 'auth/SIGNOUT_FAIL'
const UPDATE_USER = 'auth/UPDATE_USER'
const UPDATE_USER_SUCCESS = 'auth/UPDATE_USER_SUCCESS'
const UPDATE_USER_FAIL = 'auth/UPDATE_USER_FAIL'

const initialState = {
  loaded: false,
  friendsLoaded: false,
  wishesLoaded: false,
  wishesInviteLoaded: false
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
    case SIGNIN:
      return {
        ...state,
        signingIn: true
      }
    case SIGNIN_SUCCESS:
      return {
        ...state,
        signingIn: false,
        token: action.result.token || null,
        user: action.result
      }
    case SIGNIN_FAIL:
      return {
        ...state,
        signingIn: false,
        user: null,
        token: null,
        signinError: action.error
      }
    case SIGNUP:
      return {
        ...state,
        signingUp: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        user: action.result,
        token: action.result.token || null
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        signingUp: false,
        user: null,
        token: null,
        signupError: action.error
      }
    case SIGNOUT:
      return {
        ...state,
        signingOut: true
      }
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        signingOut: false,
        loaded: false,
        user: null,
        token: null
      }
    case SIGNOUT_FAIL:
      return {
        ...state,
        signingOut: false,
        signoutError: action.error
      }
    case UPDATE_USER:
      return {
        ...state,
        saveLoading: true,
        saveLoaded: false
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveLoaded: true
      }
    case UPDATE_USER_FAIL:
      return {
        ...state,
        saveLoading: false,
        saveError: action.error
      }
    default:
      return state
  }
}

export function isLoaded (globalState) {
  return globalState && globalState.auth && globalState.auth.loaded
}

export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/me')
  }
}

export function signin (data) {
  return {
    types: [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAIL],
    promise: (client) => client.post('/signin', {
      local: true,
      data: data
    }).then((data) => {
      global.resetSocket()
      return data
    })
  }
}

export function signup (data) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/signup', {
      local: true,
      data: data
    }).then((data) => {
      global.resetSocket()
      return data
    })
  }
}

export function signout () {
  return {
    types: [SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_FAIL],
    promise: (client) => client.get('/signout', {
      local: true
    }).then((data) => {
      global.socket.emit('signout')
      global.resetSocket()
      return data
    })
  }
}

export function updateUser (user) {
  return {
    types: [UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL],
    promise: (client) => client.put('/api/me', { data: user })
  }
}
