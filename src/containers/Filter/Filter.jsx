import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField'
import { load as loadTickets } from 'redux/modules/ticket'

@connect(state => ({tickets: state.ticket.tickets}), {loadTickets})
class Filter extends Component {
  static propTypes = {
    loadTickets: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      orderValue: 'Date de création'
    }
  }

  handleChange = (event, value) => {
    this.setState({
      orderValue: value
    })
  }

  render () {
    const order = [
      'Date de création',
      'Date de mise à jour',
      'Nombre de votes'
    ]

    return (
      <div>
        <SelectField value={this.state.orderValue} onChange={this.handleChange} maxHeight={200}>
          {order}
        </SelectField>
      </div>
    )
  }
}

export default connect(null)(Filter)
