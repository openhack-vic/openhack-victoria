var github = {

    api: new GitHub({
        version: '3.0.0',
        timeout: 5000
    }),

    pollFrequency: 1000 * 60 * 10, // poll api.github.com every 10 mins

    throttle: 1000 * 2, // 2 seconds between requests

    queue: [],

    getRepo: function repos(opts, oldInfo){
        var Future = Npm.require('fibers/future');
        var fut = new Future();

        this.queue.push(function(){

            console.log('Requesting repo info');
            try{
                github.api.repos.get(opts, function(err, res) {
                    // TODO: find out what happens if the future never returns...
                    // http://stackoverflow.com/questions/16269507/how-to-call-async-method-from-meteor-own-callbacks/
                    console.log('Updating repo info');
                    fut.ret(res);
                });
            }catch(e){
                var errorMsg = "Github explosion?";
                console.log(errorMsg, e);
                console.log('keeping old data')
                fut.ret(oldInfo);
            }
            
        });
        console.log('Queued github request');

        return fut.wait();
    },

    startRequestQueue: function(){
        this.queueIntervalId = Meteor.setInterval(function(){
            var nextRequest = github.queue.shift();
            if(nextRequest){
                nextRequest();
            }
        }, this.throttle);
    }
};

function syncGithubs() {

    console.log('pre proj')
    Projects.find().fetch().forEach(function(doc){
        if(!doc.github) return;

        var info = github.getRepo({ user: doc.github.owner, repo: doc.github.repo}, doc.github.info);
        Projects.update(doc._id, {$set: {'github.info': info}});
    });
}

Meteor.startup(function(){
    github.startRequestQueue();
    syncGithubs();
    Meteor.setInterval(syncGithubs, github.pollFrequency);
});
