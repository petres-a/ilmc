/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill'
import Bluebird from 'bluebird'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'
import { Provider } from 'react-redux'
import { Router, browserHistory as history, match } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import initSocket from './socket'
import { trigger } from 'redial'
import { StyleSheet } from 'aphrodite'

import getRoutes from './routes'

// bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird
// Warnings are useful for user code, but annoying for third party libraries.
Bluebird.config({ warnings: false })

// Needed for onTouchTap that material-ui uses
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const client = new ApiClient()
const dest = document.getElementById('content')
const store = createStore(history, client, window.__data)
StyleSheet.rehydrate(window.__css)

global.socket = initSocket(store)
global.resetSocket = () => {
  global.socket = initSocket(store)
}

const routes = getRoutes(store)

history.listen((location) => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (!error && !redirectLocation) {
      const state = store.getState()
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        state: state,
        dispatch: store.dispatch
      }
      if (window.__data) {
        delete window.__data
      } else {
        if (state.auth.token) {
          trigger('fetch', renderProps.components, locals).catch((err) => { console.error(err) })
        }
      }
      if (state.auth.token) {
        trigger('defer', renderProps.components, locals).catch((err) => { console.error(err) })
      }
    }
  })
})

ReactDOM.render(
  <Provider store={store} key='provider'>
    <Router history={history} routes={routes} />
  </Provider>,
  dest
)
