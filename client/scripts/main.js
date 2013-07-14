Meteor.autosubscribe(function() {
    Meteor.subscribe("userData");
});

// Prioritsed subscribtion... Get the importantThings first.
Meteor.subscribe('importantThings', function() {
    console.log('Got the important things');

    Meteor.subscribe('things', function() {
        console.log('Got the things');
    });
});

Handlebars.registerHelper('log', function(target) {
    return console.log(target);
});

Template.nextMeetup.helpers({
    nextEvent: function() {
        return nextEvent = Events.find({time: { $gt: Date.now() }}, {sort: [['time', 'asc']]}).fetch()[0];
    },
    myRsvp: function() {
        var user = Meteor.user();
        if(!user) return;

        var myRsvp = _.find(this.rsvps, function(rsvp) {
            return rsvp.member.member_id === user.services.meetup.id
        });
        return myRsvp && myRsvp.response;
    },
    rsvpButton: function(rsvp) {
        var button;

        // TODO: there has to be a better way to handle template "cases"
        switch(rsvp){
            case 'yes':
                button = '<a ' + this.event_url + 'class="rsvp btn btn-success pull-right" title="visit event page" target="_blank"><i class="icon-check"></i> I\'m Attending</a>';
            break;
            case 'maybe':
                button = '<a ' + this.event_url + 'class="rsvp btn btn-warning pull-right" title="visit event page" target="_blank"><i class="icon-warning-sign"></i> I might go</a>';
            break;
            case 'no':
                button = '<a ' + this.event_url + 'class="rsvp btn btn-danger pull-right" title="visit event page" target="_blank"><i class="icon-remove"></i> I\'m not going</a>';
            break;
            case 'none':
                button = '<a ' + this.event_url + 'class="rsvp btn btn-inverse pull-right" title="visit event page" target="_blank"><i class="icon-spinner"></i> I havn\'t decided</a>';
            break;
            default:
                button = '<button class="rsvp signIn btn btn-disabled pull-right">Sign in to RSVP</button>';
        }
        return new Handlebars.SafeString(button);
    }
});

Template.nextMeetup.events({
    'click .signIn': function(e) {
        $('.login-button').click();
    }
});

Template.upcomingMeetup.events = function() {
    return Events.find({time: {$gt: Date.now()}}, {sort: [['time', 'asc']], limit: 3}).fetch();
};

Template.previousMeetup.events = function() {
    return Events.find({time: { $lt: Date.now() }}, {sort: [['time', 'desc']]}).fetch();
};

Template.upcomingMeetup.fromNowFormat = function(ms) {
    return moment(ms).fromNow();
};

Template.nextMeetup.isoFormat = function(ms) {
    return moment(ms).format();
};

Template.nextMeetup.dateTimeFormat = function(ms, offset, timezone) {
    var date = moment(ms);
    var localDate = date.add('ms', parseInt(offset, 10));

    timezone = timezone ? ' (' + timezone + ')' : '';
    return localDate.format('MMMM Do YYYY, h:mm a') + timezone;
};

Template.nextMeetup.calandarFormat = function(ms) {
    return moment(ms).calendar();
};

Template.nextMeetup.createMap = function(venue) {

    if (!venue) {
        return;
    }

    var mapId = "venue-" + venue.id;

    setTimeout(function() {

        var mapContainer = document.getElementById(mapId);

        if (!mapContainer || $(mapContainer).hasClass('leaflet-container')) {
            console.info('Not updating map', mapContainer); // TODO: handle venue change. Map should redraw if lat/lng is different
        }

        // TODO: This gets called multiple times, and bombs if the map is already initialised.
        var map = L.map(mapId, {
            zoomControl: false,
            attributionControl: false
        });

        L.tileLayer('http://{s}tile.stamen.com/toner/{z}/{x}/{y}.png', {
            "minZoom": 0,
            "maxZoom": 20,
            "subdomains": ["", "a.", "b.", "c.", "d."],
            "scheme": "xyz"
        }).addTo(map);

        var latlon = [venue.lat, venue.lon];

        var marker = L.marker(latlon, {
            title: venue.name,
            riseOnHover: true
        });

        marker.addTo(map);

        map.setView(latlon, 11);

        map.on('click', function() {
            map.setView(latlon, 16);
        });

        marker.on('click', function() {
            map.setView(latlon, 16);
        });

    }, 1000);

    return '<div id="' + mapId + '" class="map"></div>';
};

Template.previousMeetup.dateFormat = function(ms) {
    return moment(ms).format('MMMM Do YYYY');
};

Template.previousMeetup.toFixed = function(number) {
    return parseFloat(number).toFixed(1); // rounded to 1 decimal place.
};

Template.photos.photos = function() {
    return Photos.find({}, {sort: [['created', 'desc']]}).fetch();
};

Template.members.members = function() {
    return Members.find({}, {
        sort: [
            ['joined', 'desc']
        ]
    }).fetch();
};

Template.members.rendered = function() {
    _.each(this.findAll('img'), function(img) {
        var isHeightLimited = img.height > img.width;

    });
};

Meteor.startup(function() {
    // Connection status indicator... Add the status as a body class, and title attr to logo.
    Deps.autorun(function() {
        var status = Meteor.status().status;
        var statusHolder = $('body');
        statusHolder.removeClass('connected connecting failed waiting');
        statusHolder.addClass(status);
        $('.logo').attr('title', 'Meteor status: ' + status);
    });
});