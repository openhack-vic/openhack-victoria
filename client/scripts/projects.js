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
    return ms? moment(ms).format('D/M/YY'): 'N/A';
};

Template.projects.events = {
    'click .create': function() {
        var modal = Template.editModal({action: 'Create'});

        $(modal).modal()
            .on('hidden', function () {
                $(this).remove();
            })
            .on('click', '.submit-project', submitProject);
    },
    'click .edit': function() {
        var project = this;
        this.action = 'Edit';
        var modal = Template.editModal(project);

        $(modal).modal()
            .on('hidden', function () {
                $(this).remove();
            })
            .on('click', '.save-project', this, saveProject);
    }
};

function saveProject(e) {
    var currentUser = Meteor.user();
    var oldProject = e.data;
    var updatedProject = {
        title: $('#inputTitle').val(),
        github: {
            owner: $('#inputOwner').val(),
            repo: $('#inputRepo').val(),
        },
        description: $('#inputDescription').val()
    };

    Projects.update({_id: oldProject._id}, {$set: updatedProject});

    $(this).closest('.modal').modal('hide');
}
function submitProject(e) {
    var currentUser = Meteor.user();
    var newProject = {
        title: $('#inputTitle').val(),
        github: {
            owner: $('#inputOwner').val(),
            repo: $('#inputRepo').val(),
        },
        description: $('#inputDescription').val(),
        owner: currentUser._id,
        authors: [{
            id: currentUser._id,
            name: currentUser.profile.name,
            meetupId: currentUser.services.meetup.id
        }]
    };
    Projects.insert(newProject);

    $(this).closest('.modal').modal('hide');
}