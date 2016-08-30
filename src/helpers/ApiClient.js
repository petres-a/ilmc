/* global __SERVER__:true */
import config from '../config'
import axios from 'axios'

const methods = ['get', 'post', 'put', 'delete']

function formatUrl (path, local) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return (local ? '' : config.apiServer) + adjustedPath
  }
  return (local ? '' : config.api) + adjustedPath
}

class _ApiClient {
  constructor (req) {
    methods.forEach((method) => {
      this[method] = (path, { local, data } = {}) => {
        let token = ''
        if (__SERVER__) {
          token = req.cookies.token
        } else {
          const cookie = require('js-cookie')
          token = cookie.get('token')
        }

        return axios({
          url: formatUrl(path, local),
          method: method,
          headers: {
            'Authorization': token
          },
          data: data
        }).then((res) => res.data)
      }
    })
  }
}

const ApiClient = _ApiClient

export default ApiClient
