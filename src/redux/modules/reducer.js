import { combineReducers } from 'redux'
// import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import app from './app'
import users from './users'
import user from './user'
import ticket from './ticket'

const appReducer = combineReducers({
  routing: routerReducer,
  auth: auth,
  app: app,
  users: users,
  user: user,
  ticket: ticket
})

export default (state, action) => {
  if (action.type === 'auth/SIGNOUT_SUCCESS') {
    const { routing } = state
    state = { routing }
  }
  return appReducer(state, action)
}
