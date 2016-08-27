import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { update as updateTicket, close as deleteTicket } from 'redux/modules/ticket'
import { closeTicket } from 'redux/modules/app'

const mapStateToProps = (state) => ({ticket: state.ticket.update, ticketOpen: state.app.ticketOpen})

const mapDispatchToProps = { closeTicket, updateTicket, deleteTicket }

class Ticket extends Component {
  static propTypes = {
    ticket: PropTypes.object,
    updateTicket: PropTypes.func.isRequired,
    ticketOpen: PropTypes.bool.isRequired,
    closeTicket: PropTypes.func.isRequired,
    deleteTicket: PropTypes.func.isRequired
  }

  render () {
    const { ticket, ticketOpen, closeTicket, updateTicket } = this.props

    if (!ticket) return null

    const actions = [
      <FlatButton
        label='Fermer'
        onTouchTap={closeTicket}
      />,
      <FlatButton
        label='Sauvegarder'
        onTouchTap={updateTicket}
      />
    ]

    return (
      <Dialog open={ticketOpen} modal={false} actions={actions} onRequestClose={closeTicket} title='Ticket' contentStyle={{ padding: '0 24px 24px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField id='titleticket' floatingLabelText='Titre' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={ticket.title} ref='title' />
            <TextField id='descriptionticket' floatingLabelText='Description' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={ticket.description} ref='description' />
            <TextField id='addressticket' floatingLabelText='Adresse' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={ticket.address} ref='address' />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket)
