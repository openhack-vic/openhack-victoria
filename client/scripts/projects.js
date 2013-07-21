Template.projects.projects = function() {
    return Projects.find().fetch();
};

Template.projects.isAuthor = function() {
    var userId = Meteor.user()._id;

    return _.find(this.authors, function(author){
        return userId == author.id;
    }) ;
};

Template.projects.europeanDateFormat = function(ms) {
    return moment(ms).format('D/M/YY');
};