const LOAD = 'search/LOAD'
const LOAD_SUCCESS = 'search/LOAD_SUCCESS'
const LOAD_FAIL = 'search/LOAD_FAIL'

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
        result: action.result
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
  return globalState.search && globalState.search.loaded
}

export function search (q, f) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/search?q=${q}&f=${f || ''}`)
  }
}
