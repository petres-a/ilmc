const LOAD = 'ticket/LOAD'
const LOAD_SUCCESS = 'ticket/LOAD_SUCCESS'
const LOAD_FAIL = 'ticket/LOAD_FAIL'

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
        tickets: action.result
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
  return globalState.ticket && globalState.ticket.loaded
}

export function load (cityId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/cities/' + cityId + '/tickets')
  }
}
