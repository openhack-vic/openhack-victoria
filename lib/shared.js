
Groups = new Meteor.Collection('groups');

Events = new Meteor.Collection('events');

Photos = new Meteor.Collection('photos');

Members = new Meteor.Collection('members');

Projects = new Meteor.Collection('projects');

Projects.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change projects you submitted
    return doc.owner === userId;
  },
  remove: function (userId, doc) {
    // can only remove projects you submitted
    return doc.owner === userId;
  }
});
