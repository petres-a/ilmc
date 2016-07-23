import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import { ListItem } from 'material-ui/List'
import Drawer from 'material-ui/Drawer'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { closeNotifs } from 'redux/modules/app'

const mapStateToProps = (state) => ({open: state.app.notifsOpen})

const mapDispatchToProps = { closeNotifs }

class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.array,
    open: PropTypes.bool,
    closeNotifs: PropTypes.func.isRequired
  }

  render () {
    let { notifications, open, closeNotifs } = this.props

    notifications = [
      {
        id: '1',
        title: 'Sophie Dujardin',
        detail: 'Description'
      },
      {
        id: '2',
        title: 'Natalie Dujardin',
        detail: 'Description'
      }
    ]

    const notificationList = []
    if (notifications) {
      for (const notification of notifications) {
        notificationList.push(
          <ListItem
            leftAvatar={<Link to='/profile/fad2691e-bdb8-451f-bb45-b2a81aa95c61'><img src='/fsilo.png' style={{ width: '40px', height: '40px', borderRadius: '50%' }} /></Link>}
            rightIcon={<ActionInfo />}
            primaryText={notification.title}
            secondaryText={notification.detail}
            key={notification.id}
          />
        )
      }
    }

    return (
      <Drawer overlayStyle={{ zIndex: 1400 }} containerStyle={{ zIndex: 1400 }} open={open} docked={false} openSecondary onRequestChange={closeNotifs}>
        <AppBar title='Notifications' showMenuIconButton={false} />
        {notificationList}
      </Drawer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
