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

### NOTES
- broken
  - [x] varibales like votes and videotime not being properly rest on nextvideo/skip
    - [ ] need to revisit potential other runaway processes
  - [x] wrap long titles in previous upcoming with elipsese
  - [x] on alias update, push out userinfo update action from server to client
  - [ ] undefineds on restart if client reestablishes connection after disconnect and serevr restart
  - [x] new rec seems to always skip video on video end twice?
    - [x] make sure skipping can only happen once per current video...
  - [x] users call is broken about current user, just take that out
  - [ ] only works when tab in focus and running adblock, lol?
  - [ ] losing socket connection, waht to do
    - [ ] skipping after a pause?
    - [ ] pausing breaks everthing
- submit
  - [x] notify who skipping
  - [x] notify room on successful recommendation
    - [x] flash upcoming playlists
  - [x] NO DUPLICATES! - keep a history of videos, dont recommend videos already played, incrememnet rec count, increase rec count...
  - [x] submit by search of youtube api
  - [x] undo last submit
    - [x] take undo submits out of history too
      - [x] maybe it shouldn't?
    - [x] undo array?
  - [ ] more advanced version would return a few results you can pick through
  - [x] recommend videos off current video
    - [ ] broad recommendation `/recb` should take random item form history and do a rec based off that...
- rooms
  - [x] list global rooms
  - [x] join them
- users
  - [x] list current users on login
  - [ ] vote count on vote
- general
  - [ ] make into private voyoristic app, only room creator can skip, etc... ?
    - [ ] a way of telling your friends, hey look at this
  - [ ] stop recommender, pause problems
  - [ ] save videos you like, export those in json?
  - [x] auto play next functionality for music exploration...
  - [x] add about
  - [x] mute command
  - [ ] more fun commands
  - [ ] refocus input on click in chat bar
  - [ ] tests
  - [ ] better deploy
  - [ ] live reloading for react and css
  - [ ] play around with redux for datastore
  - [ ] store room states in db?
