import { connect } from 'react-redux'
import { openSettings } from 'redux/modules/app'

const mapStateToProps = (state) => ({user: state.auth.user, owner: true})

const mapDispatchToProps = {openSettings}

export default connect(mapStateToProps, mapDispatchToProps)(() => (<div>Me</div>))
