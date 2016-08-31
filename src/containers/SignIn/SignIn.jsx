import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import keycode from 'keycode'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { signin } from 'redux/modules/auth'

class SignIn extends Component {
  static propTypes = {
    signin: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.signin = this.signin.bind(this)
  }

  handleKeyDown (event) {
    if (keycode(event) === 'enter') this.signin()
  }

  signin () {
    const { signin } = this.props
    signin({ username: this.refs.email.getValue(), password: this.refs.password.getValue() })
  };

  render () {
    return (
      <div className='centerContainer'>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '32px' }}>
            <h3 style={{ textAlign: 'center', marginTop: 0 }}>Sign In</h3>
            <TextField id='emailsignin' hintText='Email' autoFocus ref='email' hintStyle={{ textAlign: 'center' }} style={{ textAlign: 'center' }} />
            <TextField id='passwordsignin' hintText='Password' type='password' ref='password' onKeyDown={this.handleKeyDown} />
            <RaisedButton style={{ marginTop: '8px' }} label='Sign In' secondary onTouchTap={this.signin} />
          </div>
        </Card>
      </div>
    )
  }
}

export default connect(null, { signin })(SignIn)
