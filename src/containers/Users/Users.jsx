import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import { users as getUsers } from 'redux/modules/users'

@connect(state => ({users: state.users.users}), {getUsers})
class Users extends Component {
  static propTypes = {
    users: PropTypes.array
  };

  render () {
    const styles = require('./Users.styl')
    this.props.getUsers()
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '50%' }}>
          <h3 className={styles.h3users}>Liste des Utilisateurs</h3>
          <List className={styles.usersList}>
            {this.props.users && this.props.users.map((user) => {
              return (
                <div key={user.id}>F
                  <ListItem
                    leftAvatar={<Avatar src='msilo.png' />}
                    primaryText={user.firstname}
                  />
                  <Divider inset />
                </div>
              )
            })}
          </List>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ users: state.users.users })

export default connect(mapStateToProps)(Users)
