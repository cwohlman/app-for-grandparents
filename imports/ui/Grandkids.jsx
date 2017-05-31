import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import moment from 'moment';
import grandkids from '../collections/grandkids.js';
import {Image} from 'cloudinary-react';

import {
  Link,
  withRouter,
} from 'react-router-dom'
import history from 'history';

class Grandkids extends Component {
  render() {
    return (
      <div>
        <h1>Grandkids</h1>
        {
          this.props.grandkids.map((grandkid) => (
            <Child key={grandkid._id} kid={grandkid} />
          ))
        }
        <AddChildButton />
      </div>
    )
  }
}

class AddChildButtonInner extends Component {
  addChild() {
    var newKid = grandkids.insert({
      userId: Meteor.userId(),
      name: "Grandkid #" + (grandkids.find().count() + 1),
    });
    this.props.history.push('/grandkid/' + newKid);
  }
  render() {
    return (
      <button onClick={this.addChild.bind(this)}>Add Grandkid</button>
    )
  }
}
const AddChildButton = withRouter(AddChildButtonInner);

class Child extends Component {
  hasUpcomingBirthday(kid) {
    var birthdate = kid && kid.birthdate;

    if (birthdate != null) {
      var parsed_date = moment(birthdate, 'M/D/YYYY');
      parsed_date.year(moment().year());
      if (parsed_date.isBefore(moment())) {
        parsed_date.add(1, 'year');
      }
      diff = parsed_date.diff(moment(), 'days')
      if (parsed_date.isValid() && diff <= 30) {
        return true;
      }
    }

    return false;
  }
  hasRecentBirthday(kid) {
    var birthdate = kid && kid.birthdate;

    if (birthdate != null) {
      var parsed_date = moment(birthdate, 'M/D/YYYY');
      parsed_date.year(moment().year());
      if (parsed_date.isAfter(moment())) {
        parsed_date.add(-1, 'year');
      }
      diff = parsed_date.diff(moment(), 'days')
      if (parsed_date.isValid() && diff >= -15) {
        return true;
      }
    }

    return false;
  }
  formattedBirthday(kid) {
    var birthdate = kid && kid.birthdate;
    if (birthdate != null) {
      var parsed_date = moment(birthdate, 'M/D/YYYY');
      parsed_date.year(moment().year());
      if (parsed_date.isBefore(moment().add(-6, 'months'))) {
        parsed_date.add(1, 'year');
      }
      if (parsed_date.isAfter(moment().add(6, 'months'))) {
        parsed_date.add(-1, 'year');
      }
      if (parsed_date.isValid) {
        return parsed_date.calendar(null, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd (MMMM Do)',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd (MMMM Do)',
          sameElse: 'dddd, MMMM Do'
      });
      }
    }
    return birthdate || '';
  }
  render() {
    return (
      <div>
        <Link to={"/grandkid/" + this.props.kid._id}>
          <p>{this.props.kid.name}</p>
          {
            typeof this.props.kid.photo == "string" ?
            (<Image cloudName="grandkids" publicId={this.props.kid.photo} width="300" crop="scale"/>) :
            ''
          }
          {
            this.hasUpcomingBirthday(this.props.kid) ?
            (<p>Birthday coming up: {this.formattedBirthday(this.props.kid)}!</p>) :
            ''
          }
          {
            this.hasRecentBirthday(this.props.kid) ?
            (<p>Birthday was: {this.formattedBirthday(this.props.kid)}!</p>) :
            ''
          }
        </Link>
      </div>
    );
  }
}

export default GrandkidsContainer = createContainer(() => ({ grandkids: grandkids.find().fetch() }), Grandkids)
