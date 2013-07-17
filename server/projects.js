if(!Projects.find().fetch().length) {
    Projects.insert({
        name: 'OpenHack Victoria website',
        authors: [{
            id: '7Y8Wpzsy5YKkDGMM5',
            name: "Kevin Attfield",
            meetupId: 87893122
        }],
        github: {
            user: 'Sinetheta',
            repo: 'openhack-victoria'
        },
        description: 'A homepage for [OpenHack Victoria](http://openhack-victoria.meteor.com/)',
        created: 1373353200000
    });
}