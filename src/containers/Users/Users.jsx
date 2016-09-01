import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { users as getUsers } from 'redux/modules/users'

@connect(state => ({users: state.users.users}), {getUsers})
class Users extends Component {
  static propTypes = {
    users: PropTypes.array
  };

  constructor (props) {
    super(props)
    this.props.getUsers()
    this.state = {
      searchString: '',
      openUser: false,
      user: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        connected: false,
        phone: ''
      }
    }
  }

  handleSearchbar (e) {
    this.setState({searchString: e.target.value})
  }

  handleOpen (user) {
    this.setState({
      openUser: true,
      user: user
    })
  }

  handleClose () {
    this.setState({openUser: false})
  }
  render () {
    const styles = require('./Users.styl')
    var searchString = this.state.searchString.trim().toLowerCase()
    var users = this.props.users

    const actions = [
      <FlatButton
        label='Fermer'
        primary
        onTouchTap={this.handleClose.bind(this)}
      />
    ]

    if (searchString.length > 0) {
      users = this.props.users.filter(function (user) {
        return user.email.toLowerCase().match(searchString)
      })
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '50%' }}>
          <h3 className={styles.h3users}>Liste des Utilisateurs</h3>
          <TextField className={styles.SearchBar} name='searchString' value={this.state.searchString} onChange={this.handleSearchbar.bind(this)} placeholder='Type here' />
          <List className={styles.usersList}>
            {users && users.map((user) => {
              return (
                <div key={user.id}>
                  <ListItem
                    onTouchTap={() => this.handleOpen(user)}
                    leftAvatar={<Avatar src={user.picture} />}
                    primaryText={user.email}
                  />
                  <Divider inset />
                </div>
              )
            })}
          </List>
          <Dialog
            title='Utilisateur ouvert'
            actions={actions}
            modal
            open={this.state.openUser}
            autoScrollBodyContent
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={this.state.user.picture} />
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TextField id='id' name='id' floatingLabelText='User id' disabled style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.user.id} ref='id' />
                <TextField id='connected' name='connected' floatingLabelText='Connected' disabled style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.user.connected ? 'Online' : 'Offline'} ref='id' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TextField id='firstname' name='firstname' floatingLabelText='Firstname' disabled style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.user.firstname} ref='firstname' />
                <TextField id='lastname' name='lastname' floatingLabelText='Lastname' disabled style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.user.lastname} ref='lastname' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TextField id='email' name='email' floatingLabelText='Email' disabled style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.user.email} ref='email' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TextField id='phone' name='phone' floatingLabelText='Phone' disabled style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.user.phone} ref='phone' />
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ users: state.users.users })

export default connect(mapStateToProps)(Users)
