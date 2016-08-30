import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { create, tickets as getTickets, close } from 'redux/modules/ticket'
import { openTicket } from 'redux/modules/app'
import { SearchBar } from 'containers'

@connect(state => ({ticketCreated: state.ticket.create, tickets: state.ticket.tickets, ticketClosed: state.ticket.close}), {create, getTickets, close, openTicket})
class Tickets extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired,
    tickets: PropTypes.array,
    close: PropTypes.func.isRequired,
    openTicket: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      tickets: this.props.getTickets()
    }
  }

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
    this.props.close().then(response => this.props.getTickets().then(response => this.setState({tickets: response})))
  }

  render () {
    const styles = require('./Tickets.styl')
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '50%' }}>
          <h3 className={styles.h3ticket}>Liste des Tickets</h3>
          <SearchBar tickets={this.props.tickets} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ tickets: state.ticket.tickets })

export default connect(mapStateToProps)(Tickets)
