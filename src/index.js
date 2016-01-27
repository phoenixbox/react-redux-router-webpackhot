import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import React from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import createHistory from 'history/lib/createHashHistory'
import { syncHistory, routeReducer } from 'react-router-redux'

// Redux
import * as reducers from './reducers'
// Components
import { App, Home, Chats, List, Login, NoMatch } from './components'
// Styles
require('./less/bootstrap/bootstrap.less');

const history = createHistory()
const middleware = syncHistory(history)
/*
  The required reducers here have their initalState set
  The keys of the initialState are the only ones allowed in the App state
 */
const reducer = combineReducers({
  ...reducers,
  routing: routeReducer
})

/*
  Dev Tools Set Up for application state playback
  TODO: Fence this off to configuration variables
 */
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

/*
  Final store with the redux-router middleware
*/
const finalCreateStore = compose(
  applyMiddleware(middleware),
  DevTools.instrument()
)(createStore)
const store = finalCreateStore(reducer)
middleware.listenForReplays(store)

function requireAuth(state, nextState, replaceState) {
  let appState = state.getState()

  if (!appState.auth.user.jwt) {
    replaceState(null, '/login')
  }
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="users/:userID/chats" component={Chats} onEnter={_.partial(requireAuth, store)}>
            <Route path="list" component={List} />
          </Route>
        </Route>
        <Route path="login" component={Login} />
        <Route path="*" component={NoMatch} />
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)
