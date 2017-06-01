import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import styles from './styles/theme.js'

export default class Welcome extends Component {
  render() {
    return (
      <nav className={styles("Nav")}>
        <div className={styles("Nav > Container")}>
          <Link to="/" className={styles("Nav > Home")}>Grandkids</Link>
          <ul className={styles("Nav > Right")}>
            <li><a onClick={() => Meteor.logout()} href="">Logout</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}
