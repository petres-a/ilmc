import React, { Component } from 'react'
import { connect } from 'react-redux'

class City extends Component {
  static propTypes = {
  }

  render () {
    return (
      <div>
        NoMatch
      </div>
    )
  }
}

export default connect(null)(City)
