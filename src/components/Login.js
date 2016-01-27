import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { login, logout } from '../actions/auth'

class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    // login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.jwt) {
      this.props.push('/users/1/chats/list');
    }
  }

  render() {
    console.log('Login rerender with user: ', this.props.user);
    let loggedIn = this.props.user.jwt ? 'Logged In' : 'Logged Out';

    return (
      <div>
        {loggedIn}
        <button onClick={this.props.login}>Login</button>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}

// Connect is all about mapping things into props
// The second group get dispatch things
export default connect(
  state => ({ user: state.auth.user }), //mapStateToProps
  Object.assign({},routeActions,{login, logout})
)(Login)
