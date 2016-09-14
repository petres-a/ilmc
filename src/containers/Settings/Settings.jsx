import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { closeSettings } from 'redux/modules/app'
import { updateUser } from 'redux/modules/auth'

const mapStateToProps = (state) => ({user: state.auth.user, settingsOpen: state.app.settingsOpen})

const mapDispatchToProps = { closeSettings, updateUser }

class Settings extends Component {
  static propTypes = {
    user: PropTypes.object,
    settingsOpen: PropTypes.bool.isRequired,
    closeSettings: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
  }

  render () {
    const { user, settingsOpen, closeSettings, updateUser } = this.props

    if (!user) return null

    const actions = [
      <FlatButton
        label='Fermer'
        onTouchTap={closeSettings}
      />,
      <FlatButton
        label='Sauvegarder'
        secondary
        onTouchTap={updateUser}
      />
    ]

    return (
      <Dialog open={settingsOpen} modal={false} actions={actions} onRequestClose={closeSettings} title='Settings' contentStyle={{ padding: '0 24px 24px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField id='firstnamesettings' floatingLabelText='Prénom' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={user.firstname} ref='firstname' />
            <TextField id='lastnamesettings' floatingLabelText='Nom' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={user.lastname} ref='lastname' />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField id='emailsettings' floatingLabelText='Email' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={user.email} ref='email' />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
