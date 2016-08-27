const TOGGLE_NAV = 'app/TOGGLE_NAV'
const SET_SETTINGS = 'app/SET_SETTINGS'
const SET_NOTIFS = 'app/SET_NOTIFS'
const SET_TICKET = 'app/SET_TICKET'

const initialState = {
  navOpen: false,
  notifsOpen: false,
  settingsOpen: false,
  ticketOpen: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_NAV:
      return {
        ...state,
        navOpen: !state.navOpen
      }
    case SET_SETTINGS:
      return {
        ...state,
        settingsOpen: action.data
      }
    case SET_NOTIFS:
      return {
        ...state,
        notifsOpen: action.data
      }
    case SET_TICKET:
      return {
        ...state,
        ticketOpen: action.data
      }
    default:
      return state
  }
}

export function toggleNav () {
  return { type: TOGGLE_NAV }
}

export function openSettings () {
  return { type: SET_SETTINGS, data: true }
}

export function closeSettings () {
  return { type: SET_SETTINGS, data: false }
}

export function openNotifs () {
  return { type: SET_NOTIFS, data: true }
}

export function closeNotifs () {
  return { type: SET_NOTIFS, data: false }
}

export function openTicket () {
  return { type: SET_TICKET, data: true }
}

export function closeTicket () {
  return { type: SET_TICKET, data: false }
}
