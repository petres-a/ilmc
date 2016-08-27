require('babel-polyfill')

// const DOCKER_HOST = process.env.DOCKER_HOST

const environment = {
  development: {
    isProduction: false,
    api: /* DOCKER_HOST ? 'http://' + DOCKER_HOST.match(/([0-9]+\.)+([0-9]+)/g)[0] + ':3030' :*/ 'http://api.ilovemycity.fr',
    apiServer: /* DOCKER_HOST ? 'http://' + DOCKER_HOST.match(/([0-9]+\.)+([0-9]+)/g)[0] + ':3030' :*/ 'http://api.ilovemycity.fr'
  },
  production: {
    isProduction: true,
    api: 'http://api.ilovemycity.fr',
    apiServer: 'http://api-service',
    realHost: '104.155.49.70:30030'
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  app: {
    title: 'ILoveMyCity',
    description: 'ILoveMyCity Intranet City.',
    head: {
      title: 'ILoveMyCity',
      titleTemplate: 'ILoveMyCity: %s'
    }
  }
}, environment)
