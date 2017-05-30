import grandkids from '../imports/collections/grandkids.js';

grandkids.allow({
  insert: (userId, doc) => doc.userId == userId,
  update: (userId, doc) => doc.userId == userId,
  remove: (userId, doc) => doc.userId == userId,
});

Meteor.publish(null, function () {
  return grandkids.find({ userId: this.userId });
});
