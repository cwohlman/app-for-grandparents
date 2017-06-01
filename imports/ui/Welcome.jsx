import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import Login from './Login.jsx'
import styles from './styles/theme.js'

export default class Welcome extends Component {
  render() {
    return (
      <div className={styles("Welcome")}>
        <h1>Welcome to the Grandkids app for Grandparents!</h1>
        <p>
          Login to get started!
        </p>
        <Login />
      </div>
    )
  }
}
