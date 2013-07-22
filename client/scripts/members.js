Session.set('expandedMemberDetails', {});

Template.members.members = function() {
    return Members.find({}, {
        sort: [
            ['joined', 'desc']
        ]
    }).fetch();
};
Template.members.trunc = function(str, n) {
    if(str.length <= n){
        return str;
    }else {
        return str.substring(0, n-3) + '...'; 
    }
};
Template.members.isExpanded = function() {
    return Session.get('expandedMemberDetails')[this._id];
};
Template.members.expandMember = function() {
    var expanded = Session.get('expandedMemberDetails');

    expanded[this._id] = !expanded[this._id];
    Session.set('expandedMemberDetails', expanded);
};

Template.members.events({
    'click .details-btn': function(e) {
        Template.members.expandMember.call(this);
    }
});
