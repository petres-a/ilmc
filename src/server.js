/*global __DEVELOPMENT__:true webpackIsomorphicTools:true */
import Express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import config from './config'
import favicon from 'serve-favicon'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'
import PrettyError from 'pretty-error'
import http from 'http'
import ms from 'ms'
import helmet from 'helmet'
import morgan from 'morgan'
import axios from 'axios'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'
import { StyleSheetServer } from 'aphrodite'
import { trigger } from 'redial'

import { match, RouterContext, createMemoryHistory } from 'react-router'
import {Provider} from 'react-redux'
import getRoutes from './routes'

const pretty = new PrettyError()
const app = new Express()
const server = new http.Server(app)

app.use(bodyParser.json())
app.use(helmet.hidePoweredBy())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.frameguard('deny'))
app.use(helmet.xssFilter())
app.use(compression())
app.use(cookieParser())
app.use(morgan(__DEVELOPMENT__ ? 'dev' : 'combined', {
  skip: function (req, res) { return req.url === '/status' || /.(?:jpg|gif|png)$/.test(req.url) }
}))
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))

app.use(Express.static(path.join(__dirname, '..', 'static')))

app.get('/status', (req, res) => {
  res.send({message: 'Ok'})
})

app.post('/signin', (req, res) => {
  axios.request({
    method: 'post',
    url: config.apiServer + '/auth/signin',
    auth: req.body
  }).then((response) => {
    res.cookie('token', response.data.token, { maxAge: ms('7d'), secure: false })
    res.send(response.data)
  }, (err) => {
    res.status(err.status).json(err)
  })
})

app.post('/signup', (req, res) => {
  axios.post(config.apiServer + '/auth/signup', req.body).then((response) => {
    res.cookie('token', response.data.token, { maxAge: ms('7d'), secure: false })
    res.send(response.data)
  }, (err) => {
    res.status(err.status).json(err)
  })
})

app.get('/signout', (req, res) => {
  res.clearCookie('token')
  res.clearCookie('states')
  res.json(null)
})

app.get('*', (req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }

  global.navigator = {userAgent: req.headers['user-agent']}
  const client = new ApiClient(req)
  const history = createMemoryHistory(req.originalUrl)
  const assets = webpackIsomorphicTools.assets()

  const store = createStore(history, client, {
    app: req.cookies && req.cookies.states ? JSON.parse(req.cookies.states) : undefined,
    auth: {
      token: req.cookies ? req.cookies.token : null
    }
  })

  function renderStart () {
    const head = Helmet.rewind()

    res.set('Content-Type', 'text/html')
    res.write(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <style>
          html {
            font-size: 100%;
            -ms-overflow-style: scrollbar;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            height: 100%;
          }
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        	  font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;
            font-size: 1rem;
            height: 100%;
            width: 100%;
            margin: 0;
            color: #555;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: hidden;
            background-color: #F2F2F2;
          }

          *, :after, :before {
            box-sizing: border-box;
          }

          a {
            text-decoration: none;
          }

          .Popover-tipShape {
            fill: white;
          }
          .material-icons.white {
            color: white !important;
          }
          .material-icons.gray {
            color: #757575 !important;
          }
          .material-icons.lightgray {
            color: #9e9e9e !important;
          }
          .material-icons.light {
            color: rgba(255,255,255,0.6) !important;
          }
          .material-icons.primary {
            color: #46BDD7 !important;
          }
          .material-icons.primaryHover:hover {
            color: #46BDD7 !important;
          }
          .material-icons.whiteHover:hover {
            color: white !important;
          }
          .material-icons.grayHover:hover {
            color: #757575 !important;
          }
          .gm-style-iw div {
            overflow:visible !important;
          }
          .shadowBottom {
            box-shadow: 0px 4px 6px -3px rgba(0,0,0,0.118);
          }
          .shadowTop {
            box-shadow: 0px 4px 6px 3px rgba(0,0,0,0.118);
          }
          .textLight {
            color: #9E9E9E;
          }
          .boxShadow {
            box-shadow: rgba(0,0,0,0.118) 0px 1px 6px, rgba(0,0,0,0.118) 0px 1px 4px;
          }
          .noOutline:focus {
            outline: 0;
          }
          .noFocus:focus {
            outline: none;
          }
          .inputHolderWhite:placeholder-shown {
            color: white;
          }
          .fullFlex {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
          .centerContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
          }
          .container {
            margin: 0 auto;
            min-width: 70%;
            max-width: 70%;
          }
          .centerElem {
            max-width: 35%;
            display: flex;
            justify-content: center;
            flex-grow: 1;
          }
          .flexSpace {
            flex-grow: 1;
          }
          .absoluteMap {
            display: flex;
            z-index: 1301;
            position: absolute;
            bottom: 40px;
            left: 40px;
            width: 20vw;
            max-width: 300px;
            height: 200px;
            box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
          }
          .material-icons {
            font-family: 'Material Icons';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
          }
          .material-icons.md-18 { font-size: 18px; }
          .material-icons.md-24 { font-size: 24px; }
          .material-icons.md-36 { font-size: 36px; }
          .material-icons.md-48 { font-size: 48px; }
          .material-icons.wd-24 { width: 24px; }
        </style>
    `)
    res.flush()
  }

  function renderEnd (component) {
    const data = StyleSheetServer.renderStatic(() => ReactDOM.renderToString(component))
    res.write(`
        <style data-aphrodite>${data.css.content}</style>
      </head>
        <body>
          <div class='fullFlex' id='content'>${data.html}</div>
          <script charset='UTF-8'>window.__css=${serialize(data.css.renderedClassNames)};</script>
          <script charset='UTF-8'>window.__data=${serialize(store.getState())};</script>
          <script src='${assets.javascript.main}' charset='UTF-8'></script>
        </body>
      </html>
    `)
    res.end()
  }

  match({ routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error))
      res.status(500)
      renderStart()
      renderEnd()
    } else if (renderProps) {
      renderStart()
      const render = () => {
        res.status(200)
        renderEnd(
          <Provider store={store} key='provider'>
            <RouterContext {...renderProps} />
          </Provider>
        )
      }
      const renderFail = (err) => {
        console.log('after fetch fail ==> ', err.message)
        res.status(500)
        renderEnd()
      }
      const state = store.getState()
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        state: state,
        dispatch: store.dispatch
      }
      if (state.auth.token) {
        trigger('fetch', renderProps.components, locals).then(render, renderFail)
      } else {
        render()
      }
    } else {
      res.status(404).send('Not found')
    }
  })
})

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort)
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
