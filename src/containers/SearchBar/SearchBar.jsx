import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import SvgIcon from 'material-ui/SvgIcon'
import RaisedButton from 'material-ui/RaisedButton'
import { update as updateTicket, del as deleteTicket, close as closeTicket, tickets as getTickets, createMessage, messages as getMessages } from 'redux/modules/ticket'
import { blue300, green500 } from 'material-ui/styles/colors'

@connect(state => ({state: state}), {updateTicket, deleteTicket, closeTicket, getTickets, createMessage, getMessages})
class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchString: '',
      openTicket: false,
      tickets: this.props.tickets,
      ticket: {
        id: '',
        title: '',
        description: '',
        address: '',
        creator: {
          email: ''
        }
      },
      title: '',
      description: '',
      status: 'o',
      messages: [],
      message: '',
      value: 1
    }
  }

  handleSearchbar (e) {
    this.setState({searchString: e.target.value})
  }

  handleChange (e) {
    var state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  handleOpen (ticket) {
    var value = 1

    if (ticket.status === 'o') {
      value = 1
    } else if (ticket.status === 'p') {
      value = 2
    } else if (ticket.status === 'c') {
      value = 3
    }

    var state = {
      openTicket: true,
      ticket: ticket,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      value: value
    }
    this.setState(state)
    this.props.getMessages(ticket.id).then(response => this.setState({messages: response}))
  }

  handleClose () {
    this.setState({openTicket: false})
  }

  handleEdit () {
    const newTicket = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status
    }
    this.props.updateTicket(this.state.ticket.id, newTicket).then(response => this.props.getTickets().then(response => this.setState({tickets: response, openTicket: false})))
  }

  handleChangeMessage (e) {
    this.setState({message: e.target.value})
  }

  handleMessage () {
    const newMessage = {
      text: this.state.message
    }
    this.props.createMessage(this.state.ticket.id, newMessage).then(response => this.props.getMessages(this.state.ticket.id).then(response => this.setState({messages: response, message: ''})))
  }

  handleStatus (e, index, value) {
    if (value === 1) {
      this.setState({value: value, status: 'o'})
    } else if (value === 2) {
      this.setState({value: value, status: 'p'})
    } else if (value === 3) {
      this.setState({value: value, status: 'c'})
    }
  }

  render () {
    const styles = require('./SearchBar.styl')

    var searchString = this.state.searchString.trim().toLowerCase()
    var tickets = this.state.tickets
    var messages = this.state.messages

    const actions = [
      <FlatButton
        label='Sauvegarder'
        secondary
        onTouchTap={this.handleEdit.bind(this)}
      />,
      <FlatButton
        label='Fermer'
        primary
        onTouchTap={this.handleClose.bind(this)}
      />
    ]

    if (searchString.length > 0) {
      tickets = this.props.tickets.filter(function (ticket) {
        return ticket.title.toLowerCase().match(searchString)
      })
    }

    return (
      <div>
        <TextField className={styles.SearchBar} name='searchString' value={this.state.searchString} onChange={this.handleSearchbar.bind(this)} placeholder='Type here' />
        <List className={styles.ticketList}>
          {tickets && tickets.map((ticket, i) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <ListItem
                  key={ticket.id}
                  id={ticket.id}
                  onTouchTap={() => this.handleOpen(ticket)}
                  leftAvatar={<Avatar src={ticket.pictures} />}
                  primaryText={ticket.title}
                />
                <Chip
                  backgroundColor={blue300}
                  style={styles.chip}
                >
                  {ticket.votes} Votes
                </Chip>
                <Divider inset />
              </div>
            )
          })}
        </List>
        <Dialog
          title='Ticket ouvert'
          actions={actions}
          open={this.state.openTicket}
          autoScrollBodyContent
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {this.state.ticket.pictures && this.state.ticket.pictures.map((picture, i) => {
              return (
                <img src={picture} />
                )
            })}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextField id='title' name='title' floatingLabelText='Title' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.ticket.title} onChange={this.handleChange.bind(this)} ref='title' />
              <TextField id='description' name='description' floatingLabelText='Description' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.ticket.description} onChange={this.handleChange.bind(this)} ref='description' />
              <SelectField value={this.state.value} onChange={this.handleStatus.bind(this)}>
                <MenuItem value={1} primaryText='Open' />
                <MenuItem value={2} primaryText='Pending' />
                <MenuItem value={3} primaryText='Closed' />
              </SelectField>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextField id='address' name='address' floatingLabelText='address' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} disabled defaultValue={this.state.ticket.address} ref='address' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextField id='email' name='email' floatingLabelText='email' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} disabled defaultValue={this.state.ticket.creator.email} ref='email' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextField id='message' name='message' floatingLabelText='Message' style={{ flexGrow: 1 }} floatingLabelStyle={{ color: 'black' }} defaultValue={this.state.message} onChange={this.handleChangeMessage.bind(this)} ref='message' />
              <RaisedButton label='Envoyer' primary onTouchTap={this.handleMessage.bind(this)} />
            </div>
            <List>
              {messages && messages.map((message, i) => {
                return (
                  <div>
                    <ListItem
                      key={message.id}
                      id={message.id}
                      leftAvatar={<Avatar src={message.creator.picture} />}
                      primaryText={message.creator.firstname + ' : ' + message.text}
                    />
                    <Divider inset />
                  </div>
                )
              })}
            </List>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(null)(SearchBar)
