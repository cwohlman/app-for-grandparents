import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import grandkids from '../collections/grandkids.js';
import {
  Link
} from 'react-router-dom'
import {Image} from 'cloudinary-react';
import ClickToEdit from './ClickToEdit.jsx';
import { cloudinary_config } from '../client/secrets.js';

class Grandkid extends Component {
  uploadPhoto() {
    cloudinary.openUploadWidget({ cloud_name: cloudinary_config.cloud_name, upload_preset: cloudinary_config.upload_preset}, (error, result) => {
      console.log(error,result)
      grandkids.update(this.props.kid._id, { $set: { photo: result[0].public_id }})
    });
  }
  updateName(name) {
    grandkids.update(this.props.kid._id, { $set: { name: name } });
  }
  render() {
    if (this.props.kid == null) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
    return (
      <div>
        <h1><ClickToEdit onChange={this.updateName.bind(this)} value={this.props.kid.name} /></h1>
        <div onClick={this.uploadPhoto.bind(this)}>
          {
            typeof this.props.kid.photo == "string" ?
            (<Image cloudName="grandkids" publicId={this.props.kid.photo} width="300" crop="scale"/>) :
            ''
          }
          <p>Click to upload a photo</p>
        </div>
      </div>
    )
  }
}

export default GrandkidContainer = createContainer(({ match }) => ({ kid: grandkids.findOne(match.params._id) }), Grandkid);
