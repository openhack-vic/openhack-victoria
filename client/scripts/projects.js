Template.projects.projects = function() {
    return Projects.find().fetch();
};

Template.projects.europeanDateFormat = function(ms) {
    console.log(ms)
    return moment(ms).format('D/M/YY');
};