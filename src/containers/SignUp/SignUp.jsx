import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import keycode from 'keycode'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { signup } from 'redux/modules/auth'

class SignUp extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.signup = this.signup.bind(this)
  }

  handleKeyDown (event) {
    if (keycode(event) === 'enter') this.signup()
  }

  signup () {
    const { signup } = this.props
    signup({ name: this.refs.cityname.getValue(), firstname: this.refs.firstname.getValue(), lastname: this.refs.lastname.getValue(), email: this.refs.email.getValue(), password: this.refs.password.getValue() })
  }

  render () {
    return (
      <div className='centerContainer'>
        <Card>
          <div style={{display: 'flex', flexDirection: 'column', padding: '32px'}}>
            <h3 style={{ textAlign: 'center', marginTop: 0 }}>Inscription</h3>
            <TextField id='citynamesignup' hintText='Nom de la ville' autoFocus ref='cityname' />
            <TextField id='firstnamesignup' hintText='Prénom' ref='firstname' />
            <TextField id='lastnamesignup' hintText='Nom' ref='lastname' />
            <TextField id='emailsignup' hintText='Email' ref='email' />
            <TextField id='passwordsignup' hintText='Mot de passe' type='password' ref='password' onKeyDown={this.handleKeyDown} />
            <RaisedButton style={{ marginTop: '8px' }} label='Inscription' secondary onTouchTap={this.signup} />
          </div>
        </Card>
      </div>
    )
  }
}

export default connect(null, { signup })(SignUp)
