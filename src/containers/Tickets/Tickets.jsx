import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import { create, tickets as getTickets, close } from 'redux/modules/ticket'

@connect(state => ({ticketCreated: state.ticket.create, tickets: state.ticket.tickets, ticketClosed: state.ticket.close}), {create, getTickets, close})
class Tickets extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired,
    tickets: PropTypes.array,
    close: PropTypes.func.isRequired
  };

  create (event) {
    const ticket = {
      title: this.refs.title.value,
      description: this.refs.description.value,
      cityId: '3',
      address: 'whatever',
      location: [100, 60]
    }
    this.props.create(ticket).then(response => this.props.getTickets())
    event.preventDefault()
    this.refs.title.value = ''
    this.refs.description.value = ''
  }

  close (event) {
    event.preventDefault()
    this.props.close().then(response => this.props.getTickets())
  }
  
  render () {
    const styles = require('./Tickets.styl')
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '50%' }}>
          <h3 className={styles.h3ticket}>Liste des Tickets</h3>
          <List className={styles.ticketList}>
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
        <div className={styles.form}>
          <div className={styles.container}>
            <h3 className={styles.title}>Création de ticket</h3>
            <form className={styles.inputGroup} onSubmit={this.create.bind(this)}>
              <div className={styles.inputBox}>
                <input ref='title' type='title' placeholder='Titre' required />
              </div>
              <div className={styles.inputBox}>
                <input ref='description' type='description' placeholder='Description' required />
              </div>
              <input className={styles.inputButton} type='submit' value='Créer' />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ tickets: state.ticket.tickets })

export default connect(mapStateToProps)(Tickets)
