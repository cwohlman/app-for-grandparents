import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
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
        </Link>
      </div>
    );
  }
}

export default GrandkidsContainer = createContainer(() => ({ grandkids: grandkids.find().fetch() }), Grandkids)
