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

Template.members.events({
    'click .details-btn': function(e) {
        var member = $(e.target).closest('.member');
        var isExpanded = !member.data('expanded');

        member.data('expanded', isExpanded);
        member.toggleClass('expanded');
        member.find('.details-btn').toggleClass('btn-primary btn-inverse');
        member.find('.member-bio')[isExpanded? 'slideDown': 'slideUp']();
    }
});
