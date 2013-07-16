OpenHack Victoria
=================

An exercise in pulling data from http://api.meetup.com via serverside Meteor.http requests, to terraform a better life.

Forked from: https://github.com/olizilla/meteor-london

Feel free to re-use it for your meetup, hack it or otherwise noodle it to your hearts content, it's [free as in Hugs](http://blog.izs.me/post/48281002063/free-as-in-hugs-licence).

Getting started
---------------

1. [Install Meteor](http://docs.meteor.com/#quickstart) `$ curl https://install.meteor.com | /bin/sh`.
2. Clone this repo `$ git clone https://github.com/Sinetheta/openhack-victoria.git`, 
2. Create a [meetup api key](http://www.meetup.com/meetup_api/key/).
3. Create a [settings.json](https://github.com/Sinetheta/openhack-victoria/blob/master/example-settings.json) file.
4. Launch meteor, passing it the path to the settings.json `meteor --settings settings.json`
or use the handy `run.sh`

If all is well, the app will pull the latest event data for Meteor London from Meetup.com, and render it for you at http://localhost:3000

Deploy to Meteor.com
--------------------

Deploy as usual, passing it the path to the settings.json

```shell
meteor deploy your-fork.meteor.com --settings settings.json
```

or use `deploy.sh`
