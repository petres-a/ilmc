/*global __DEVELOPMENT__:true */
import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import clientMiddleware from './middleware/clientMiddleware'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

export default function createStore (history, client, data) {
  const middleware = [clientMiddleware(client), routerMiddleware(history)]
  const reducer = require('./modules/reducer')
  const store = _createStore(reducer, data, compose(
    applyMiddleware(...middleware),
    __DEVELOPMENT__ && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
  ))

  history = syncHistoryWithStore(history, store)

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'))
    })
  }

  return store
}
