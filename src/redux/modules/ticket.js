const LOAD = 'ticket/LOAD'
const LOAD_SUCCESS = 'ticket/LOAD_SUCCESS'
const LOAD_FAIL = 'ticket/LOAD_FAIL'
const CREATE = 'ticket/CREATE'
const CREATE_SUCCESS = 'ticket/CREATE_SUCCESS'
const CREATE_FAIL = 'ticket/CREATE_FAIL'
const UPDATE = 'ticket/UPDATE'
const UPDATE_SUCCESS = 'ticket/UPDATE_SUCCESS'
const UPDATE_FAIL = 'ticket/UPDATE_FAIL'
const DELETE = 'ticket/DELETE'
const DELETE_SUCCESS = 'ticket/DELETE_SUCCESS'
const DELETE_FAIL = 'ticket/DELETE_FAIL'
const TICKETS = 'ticket/TICKETS'
const TICKETS_SUCCESS = 'ticket/TICKETS_SUCCESS'
const TICKETS_FAIL = 'ticket/TICKET_FAIL'
const CLOSE = 'ticket/CLOSE'
const CLOSE_SUCCESS = 'ticket/CLOSE_SUCCESS'
const CLOSE_FAIL = 'ticket/CLOSE_FAIL'
const MESSAGES = 'ticket/MESSAGES'
const MESSAGES_SUCCESS = 'ticket/MESSAGES_SUCCESS'
const MESSAGES_FAIL = 'ticket/MESSAGES_FAIL'
const CREATE_MESSAGE = 'ticket/CREATE_MESSAGE'
const CREATE_MESSAGE_SUCCESS = 'ticket/CREATE_MESSAGE_SUCCESS'
const CREATE_MESSAGE_FAIL = 'ticket/CREATE_MESSAGE_FAIL'

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
    case CREATE:
      return {
        ...state,
        creating: true
      }
    case CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        ticket: action.result
      }
    case CREATE_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error
      }
    case UPDATE:
      return {
        ...state,
        updating: true
      }
    case UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        ticket: action.result
      }
    case UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        error: action.error
      }
    case DELETE:
      return {
        ...state,
        deleting: true
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        ticket: null
      }
    case DELETE_FAIL:
      return {
        ...state,
        deleting: false,
        error: action.error
      }
    case TICKETS:
      return {
        ...state,
        ticketsLoading: true
      }
    case TICKETS_SUCCESS:
      return {
        ...state,
        ticketsLoading: false,
        ticketsLoaded: true,
        tickets: action.result
      }
    case TICKETS_FAIL:
      return {
        ...state,
        ticketsLoading: false,
        ticketsLoaded: false,
        error: action.error
      }
    case CLOSE:
      return {
        ...state,
        closing: true
      }
    case CLOSE_SUCCESS:
      return {
        ...state,
        closing: false,
        closed: true,
        ticket: action.result
      }
    case CLOSE_FAIL:
      return {
        ...state,
        closing: false,
        closed: false,
        error: action.error
      }
    case MESSAGES:
      return {
        ...state,
        messagesLoading: true
      }
    case MESSAGES_SUCCESS:
      return {
        ...state,
        messagesLoading: false,
        messagesLoaded: true,
        messages: action.result
      }
    case MESSAGES_FAIL:
      return {
        ...state,
        messagesLoading: false,
        messagesLoaded: false,
        error: action.error
      }
    case CREATE_MESSAGE:
      return {
        ...state,
        messageCreating: true
      }
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        messageCreating: false,
        messageCreated: true,
        message: action.result
      }
    case CREATE_MESSAGE_FAIL:
      return {
        ...state,
        messageCreating: false,
        messageCreated: false,
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

export function tickets () {
  return {
    types: [TICKETS, TICKETS_SUCCESS, TICKETS_FAIL],
    promise: (client) => client.get('/api/tickets')
  }
}

export function create (ticket) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/api/tickets', { data: ticket })
  }
}

export function update (id, data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.put('/api/tickets/' + id, { data: data })
  }
}

export function close (id) {
  return {
    types: [CLOSE, CLOSE_SUCCESS, CLOSE_FAIL],
    promise: (client) => client.put('/api/tickets/' + id + '/close')
  }
}

export function del (id) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (client) => client.delete('/api/tickets/' + id)
  }
}

export function messages (id) {
  return {
    types: [MESSAGES, MESSAGES_SUCCESS, MESSAGES_FAIL],
    promise: (client) => client.get('/api/tickets/' + id + '/messages')
  }
}

export function createMessage (id, data) {
  return {
    types: [CREATE_MESSAGE, CREATE_MESSAGE_SUCCESS, CREATE_MESSAGE_FAIL],
    promise: (client) => client.post('/api/tickets/' + id + '/messages', {data: data})
  }
}
