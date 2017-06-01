import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import Welcome from './Welcome.jsx'
import Nav from './Nav.jsx'
import Grandkids from './Grandkids.jsx'
import Grandkid from './Grandkid.jsx'

import styles from './styles/theme.js'


class App extends Component {
  render() {
    const renderViewOrLogin = (view) => {
      return (props) => {
        if (this.props.loggingIn) {
          return <p>"Logging in..."</p>;
        }
        if (this.props.userId != null) {
          return view(props);
        }
        return <Welcome />;
      };
    };
    return (
      <Router>
        <div>
          <Nav />
          <div className={styles("App")}>
            <Route exact path="/" render={renderViewOrLogin(() => <Redirect to="/grandkids" />)}/>
            <Route exact path="/grandkids" render={renderViewOrLogin((props) => <Grandkids {...props} />)}/>
            <Route exact path="/grandkid/:_id" render={renderViewOrLogin((props) => <Grandkid {...props} />)}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default AppContainer = createContainer(() => ({ userId: Meteor.userId(), loggingIn: Meteor.loggingIn() }), App);
