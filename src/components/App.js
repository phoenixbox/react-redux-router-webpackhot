import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

export default connect(
  (state) => ({user: state.auth.user}), // mapStateToProps
  routeActions
)(class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    push: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div>
        <header>
          Links:
          {' '}
          <Link to="/">Home</Link>
          {' '}
          <Link to="/users/1/chats/list">Chat List</Link>
          {' '}
          <Link to="/login">Login</Link>
        </header>
        <div>
          <button onClick={() => this.props.push('/foo')}>Go to /foo</button>
        </div>
        <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
      </div>
    )
  }
})
