import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { App, Tickets, Me, Profile, Landing, SignUp, SignIn, NoMatch, Users } from './containers'

export default (store) => {
  const requireLogin = (nextState, replace) => {
    const {auth: { token }} = store.getState()
    if (!token) {
      // oops, not logged in, so can't be here!
      return replace('/signin')
    }
    return
  }

  const alreadyLogin = (nextState, replace) => {
    const {auth: { token }} = store.getState()
    if (token) {
      // oops, already logged in, so can't be here!
      return replace('/city')
    }
    return
  }

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Landing} onEnter={alreadyLogin} />
      <Route path='tickets' component={Tickets} onEnter={requireLogin} />
      <Route path='users' component={Users} onEnter={requireLogin} />
      <Route path='profile' onEnter={requireLogin}>
        <IndexRoute component={Me} />
        <Route path=':id' component={Profile} />
      </Route>
      <Route path='signin' component={SignIn} onEnter={alreadyLogin} />
      <Route path='signup' component={SignUp} onEnter={alreadyLogin} />
      <Route path='*' component={NoMatch} status={404} />
    </Route>
  )
}
