import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import { update as updateTicket } from 'redux/modules/ticket'

@connect(state => ({ticketCreated: state.ticket.update}), {updateTicket})
class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchString: '',
      openTicket: false,
      ticketTitle: 'Title',
      ticketDescription: 'Description',
      ticketClosed: false,
      ticketAddress: '',
      ticketCreatorEmail: ''
    }
    this.handleChange.bind(this)
    this.handleOpen.bind(this)
    this.handleClose.bind(this)
    this.handleEdit.bind(this)
  }

  handleChange (e) {
    this.setState({searchString: e.target.value})
  }

  handleOpen (ticket) {
    this.setState({
      openTicket: true,
      ticketTitle: ticket.title,
      ticketDescription: ticket.description,
      ticketClosed: ticket.close,
      ticketAddress: ticket.address,
      ticketCreatorEmail: ticket.creator.email
    })
  }

  handleClose () {
    this.setState({openTicket: false})
  }

  handleEdit (e, ticket) {
    const newTicket = {
      title: e.target.title,
      description: e.target.description,
      close: e.target.checked
    }
    this.setState({openTicket: false})
    this.updateTicket(ticket.id, newTicket)
  }

  render () {
    const styles = require('./SearchBar.styl')
    var searchString = this.state.searchString.trim().toLowerCase()
    var tickets = this.props.tickets

    const actions = [
      <FlatButton
        label='Fermer'
        primary
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label='Sauvegarder'
        primary
        onTouchTap={this.handleEdit.bind(this)}
      />
    ]

    if (searchString.length > 0) {
      tickets = this.props.tickets.filter(function (ticket) {
        return ticket.title.toLowerCase().match(searchString)
      })
    }

    return (
      <div>
        <TextField className={styles.SearchBar} name='SearchBar' value={this.state.searchString} onChange={this.handleChange.bind(this)} placeholder='Type here' />
        <List>
          {tickets && tickets.map((ticket, i) => {
            return (
              <div key={ticket.id} id={ticket.id}>
                <ListItem
                  onTouchTap={() => this.handleOpen(ticket)}
                  leftAvatar={<Avatar src={ticket.creator.picture} />}
                  primaryText={ticket.title}
                />
                <Divider inset />
              </div>
            )
          })}
        </List>
        <Dialog
          title='Dialog With Actions'
          actions={actions}
          modal
          open={this.state.openTicket}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextField id='title' floatingLabelText='Title' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.ticketTitle} ref='title' />
              <TextField id='description' floatingLabelText='Description' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.ticketDescription} ref='description' />
              <Checkbox id='close' label='Ticket closed' defaultChecked={this.state.ticketClosed} style={styles.checkbox} ref='close' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextField id='address' floatingLabelText='address' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} disabled defaultValue={this.state.ticketAddress} ref='address' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextField id='email' floatingLabelText='email' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} disabled defaultValue={this.state.ticketCreatorEmail} ref='email' />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(null)(SearchBar)
