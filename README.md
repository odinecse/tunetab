# tunetab
A classy youtube with friends "app". Submit videos, chat, skip ones you don't like.

Check it out in the wild here: [tunetab.us](http://tunetab.us/).

Uses node.js, socket.io and react with babel and webpack. Exercise in writing "clean" react code.

### install/run
* `cp config.sample.js config.js` this is gitignored, you need to get a youtube api key and google analytics id
* `npm install` dependencies
* `npm start` starts server
* `npm run build` dev build, watches files for changes
* `npm run build-prod` prod build with some minification and stuff

### fun ideas
- broken
  - [ ] add /bug to send to ga
  - [ ] what to do when playing non-ebedable video...
  - [ ] undefineds on restart if client reestablishes connection after disconnect and serevr restart
  - [x] new rec seems to always skip video on video end twice?
    - [x] make sure skipping can only happen once per current video...
  - [x] users call is broken about current user, just take that out
  - [ ] only works when tab in focus and running adblock, lol?
  - [ ] losing socket connection, waht to do
    - [ ] skipping after a pause?
    - [ ] pausing breaks everthing
- submit
  - [ ] re-submit
  - [ ] playlist format import/export
  - [x] notify room on successful recommendation
    - [x] flash upcoming playlists
  - [x] NO DUPLICATES! - keep a history of videos, dont recommend videos already played, incrememnet rec count, increase rec count...
  - [x] submit by search of youtube api
  - [x] undo last submit
    - [x] take undo submits out of history too
      - [ ] maybe it shouldn't?
    - [ ] undo array?
  - [ ] more advanced version would return a few results you can pick through
  - [x] recommend videos off current video
    - [ ] broad recommendation `/recb` should take random item form history and do a rec based off that...
- rooms
  - [ ] keep rooms alive for 3 days after last user
    - [ ] only save non random rooms? /t/ rooms when you use join or that are "public"
  - [x] list global rooms
  - [ ] join them
- users
  - [x] list current users on login
  - [ ] vote count on vote
- general
  - [ ] chat notification sound?
  - [ ] make into private app, only room creator can skip, etc?
  - [ ] stop recommender, pause problems
  - [ ] save videos you like, export those in json?
  - [x] auto play next functionality for music exploration...
  - [x] add about
  - [x] mute command
  - [ ] more fun commands
  - [x] refocus input on click in chat bar
  - [ ] tests
  - [ ] better deploy
  - [ ] live reloading for react and css
  - [ ] play around with redux for datastore
  - [ ] store room states in db?

### issues
* figure out how to not skip a video if someone is really behind the rest of the clients? general skip syncing issues.
