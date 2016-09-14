import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import DefaultTheme from 'utils/defaultTheme'
import { Settings, Notifications } from 'containers'
import { isLoaded as isAuthLoaded, load as loadAuth, signout } from 'redux/modules/auth'
import { isLoaded as isTicketsLoaded, load as loadTickets } from 'redux/modules/ticket'
import { isLoaded as isUsersLoaded, load as loadUsers } from 'redux/modules/users'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { toggleNav, openSettings } from 'redux/modules/app'
import config from '../../config'
import AppBar from 'material-ui/AppBar'
import { provideHooks } from 'redial'
import { push } from 'react-router-redux'
import { StyleSheet, css } from 'aphrodite'

const hooks = {
  fetch: ({ state, dispatch }) => {
    const promises = []
    if (!isAuthLoaded(state)) {
      promises.push(dispatch(loadAuth()).then((user) => {
        if (!isTicketsLoaded(state)) {
          return dispatch(loadTickets(user.cityId))
        }
      }))
      promises.push(dispatch(loadAuth()).then((user) => {
        if (!isUsersLoaded(state)) {
          return dispatch(loadUsers(user.cityId))
        }
      }))
    }
    return Promise.all(promises)
  }
}

const mapStateToProps = (state) => ({user: state.auth.user, navOpen: state.app.navOpen, userLoaded: state.auth.loaded})

const mapDispatchToProps = { push, toggleNav, openSettings, signout }

const robotoLight = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '300',
  src: `url(${require('./Roboto-Light.ttf')}) format('truetype')`
}
const robotoRegular = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '700',
  src: `url(${require('./Roboto-Regular.ttf')}) format('truetype')`
}
const robotoMedium = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '700',
  src: `url(${require('./Roboto-Medium.ttf')}) format('truetype')`
}
const robotoBold = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '700',
  src: `url(${require('./Roboto-Bold.ttf')}) format('truetype')`
}
const materialIcons = {
  fontFamily: 'Material Icons',
  fontStyle: 'normal',
  fontWeight: '400',
  src: `local('Material Icons'), local('MaterialIcons-Regular'), url(${require('./MaterialIcons.ttf')}) format('truetype')`
}

const styles = StyleSheet.create({
  app: {
    fontFamily: [robotoRegular, robotoLight, robotoMedium, robotoBold, materialIcons],
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    user: PropTypes.object,
    push: PropTypes.func.isRequired,
    toggleNav: PropTypes.func.isRequired,
    openSettings: PropTypes.func.isRequired,
    navOpen: PropTypes.bool
  }

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.renderLanding = this.renderLanding.bind(this)
    this.renderConnected = this.renderConnected.bind(this)
  }

  getChildContext () {
    return {
      muiTheme: getMuiTheme(DefaultTheme, { userAgent: navigator.userAgent })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.push('/users')
    } else if (this.props.user && !nextProps.user) {
      this.props.push('/signin')
    }
  }

  renderLanding () {
    return (
      <div className={css(styles.app)}>
        <AppBar title='ILoveMyCity Intranet' showMenuIconButton={false} />
        {this.props.children}
      </div>
    )
  }

  renderConnected () {
    const { children, toggleNav, push, navOpen, openSettings, signout } = this.props
    return (
      <div className={css(styles.app)}>
        <Helmet {...config.app.head} />
        <AppBar
          title='ILoveMyCity Intranet'
          onLeftIconButtonTouchTap={toggleNav}
          onTitleTouchTap={() => { push('/tickets') }}
          titleStyle={{ cursor: 'pointer' }} />
        <Drawer docked={false} open={navOpen} onRequestChange={toggleNav}>
          <MenuItem onTouchTap={() => { push('/tickets'); toggleNav() }} style={{ cursor: 'pointer' }}>Tickets</MenuItem>
          <MenuItem onTouchTap={() => { push('/city'); toggleNav() }} style={{ cursor: 'pointer' }}>Mairie</MenuItem>
          <MenuItem onTouchTap={() => { push('/users'); toggleNav() }} style={{ cursor: 'pointer' }}>Utilisateurs</MenuItem>
          <MenuItem onTouchTap={() => { openSettings(); toggleNav() }} style={{ cursor: 'pointer' }}>Paramètres</MenuItem>
          <MenuItem onTouchTap={() => { signout(); toggleNav() }} style={{ cursor: 'pointer' }}>Déconnexion</MenuItem>
        </Drawer>
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          {children}
        </div>
        <Notifications />
        <Settings />
      </div>
    )
  }

  render () {
    return this.props.user ? this.renderConnected() : this.renderLanding()
  }
}

export default provideHooks(hooks)(connect(mapStateToProps, mapDispatchToProps)(withRouter(App)))
