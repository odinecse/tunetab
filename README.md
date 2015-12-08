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
- submit
  - [x] submit by search of youtube api
  - [ ] more advanced version would return a few results you can pick through
  - [x] undo last submit
- general
  - [ ] mute button
  - [ ] more fun commands
  - [ ] refocus input on click in chat bar
  - [x] add about
  - [ ] list current users, return user info on skip votes too
  - [ ] tests
  - [ ] better deploy
  - [ ] live reloading for react and css
  - [ ] play around with redux for datastore
  - [ ] store room states in db?
-  rooms
  [x] list global rooms
  [ ] join them

### issues
* figure out how to not skip a video if someone is really behind the rest of the clients? general skip syncing issues.
