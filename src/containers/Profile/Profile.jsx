import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import { addFriend } from 'redux/modules/auth'
import { load as loadUser, openSettings } from 'redux/modules/user'

const hooks = {
  fetch: ({ dispatch, params: { id } }) => dispatch(loadUser(id))
}

const mapStateToProps = (state) => ({user: state.user.user, authUser: state.auth.user})

const mapDispatchToProps = { addFriend, openSettings }

export default provideHooks(hooks)(connect(mapStateToProps, mapDispatchToProps)(() => (<div>Profile</div>)))
