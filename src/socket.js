import io from 'socket.io-client'
import config from './config'

export default (store) => {
  const socket = io(config.realHost || config.api, {path: '/ws'})

  return socket
}
