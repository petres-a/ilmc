import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchBar } from 'containers'

@connect(state => ({ticketCreated: state.ticket.creating, tickets: state.ticket.tickets}))
class Tickets extends Component {

  render () {
    const styles = require('./Tickets.styl')

    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 5 }}>
        <div key='list' style={{ display: 'flex', flexDirection: 'column', flexBasis: '50%' }}>
          <h3 className={styles.h3ticket}>Liste des Tickets</h3>
          <SearchBar />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ tickets: state.ticket.tickets })

export default connect(mapStateToProps)(Tickets)
