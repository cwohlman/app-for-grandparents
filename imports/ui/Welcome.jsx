import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Grandkids app for Grandparents!</h1>
        <p>
          <Link to="/grandkids">Click here to see your grandkids.</Link>
        </p>
      </div>
    )
  }
}
