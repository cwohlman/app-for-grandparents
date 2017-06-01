import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import grandkids from '../collections/grandkids.js';
import {
  Link
} from 'react-router-dom'
import { Image, Transformation } from 'cloudinary-react';
import ClickToEdit from './ClickToEdit.jsx';
import { cloudinary_config } from '../client/secrets.js';
import styles from './styles/theme.js'

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
  updateBirthday(birthdate) {
    grandkids.update(this.props.kid._id, { $set: { birthdate: birthdate } });
  }
  updateNotes(notes) {
    grandkids.update(this.props.kid._id, { $set: { notes: notes } });
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
        <h1 className={styles("Grandkid > Heading")}><ClickToEdit onChange={this.updateName.bind(this)} value={this.props.kid.name} /></h1>
        <div className={styles("Grandkid > PhotoContainer")}>
          {
            typeof this.props.kid.photo == "string" ?
            (
              <Image className={styles("Grandkid > Photo")} cloudName="grandkids" publicId={this.props.kid.photo} />
            ) :
            ''
          }
          <p
            className={typeof this.props.kid.photo == "string" ? styles("Grandkid > UploadButton") : styles("Grandkid > UploadContainer")}
            onClick={this.uploadPhoto.bind(this)}
            >Click to upload {typeof this.props.kid.photo == "string" ? "" : "new"} photo</p>
        </div>
        <p>
          Birthday: <ClickToEdit onChange={this.updateBirthday.bind(this)} value={this.props.kid.birthdate} />
        </p>
        <p>
          Notes: <ClickToEdit onChange={this.updateNotes.bind(this)} value={this.props.kid.notes} type="textarea"/>
        </p>
      </div>
    )
  }
}

export default GrandkidContainer = createContainer(({ match }) => ({ kid: grandkids.findOne(match.params._id) }), Grandkid);
