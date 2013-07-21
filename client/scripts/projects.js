Template.projects.projects = function() {
    return Projects.find();
};

Template.projects.isAuthor = function() {
    if(!Meteor.user()) return;

    return _.find(this.authors, function(author){
        return Meteor.user()._id == author.id;
    });
};

Template.projects.europeanDateFormat = function(ms) {
    return moment(ms).format('D/M/YY');
};