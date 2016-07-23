import React, { Component } from 'react'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'

class Tickets extends Component {
  render () {
    console.log(this.props.tickets)
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '50%' }}>
          <List>
            {this.props.tickets && this.props.tickets.map((ticket) => {
              return (
                <div key={ticket.id}>
                  <ListItem
                    leftAvatar={<Avatar src='msilo.png' />}
                    primaryText={ticket.title}
                  />
                  <Divider inset />
                </div>
              )
            })}
          </List>
        </div>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flexBasis: '50%' }}>
          Ticket content
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ tickets: state.ticket.tickets })

export default connect(mapStateToProps)(Tickets)
