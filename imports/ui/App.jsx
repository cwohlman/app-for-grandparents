import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Login from './Login.jsx'
import Welcome from './Welcome.jsx'
import Grandkids from './Grandkids.jsx'
import Grandkid from './Grandkid.jsx'

class App extends Component {
  render() {
    if (this.props.userId != null) {
      // Render the app normally

      return (
        <Router>
          <div>
            {/* TODO: Login button, header, etc */}

            <Route exact path="/" component={Welcome}/>
            <Route exact path="/grandkids" component={Grandkids}/>
            <Route exact path="/grandkid/:_id" component={Grandkid}/>
          </div>
        </Router>
      );
    }
    if (this.props.loggingIn) {
      return (
        <div>
          {/* TODO: style this */}
          <p>
            Logging in...
          </p>
        </div>
      )
    }
    return (
      <Login />
    )
  }
}

export default AppContainer = createContainer(() => ({ userId: Meteor.userId(), loggingIn: Meteor.loggingIn() }), App);
