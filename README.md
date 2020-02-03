# Derelict project, would take some work to get this running again...

---

## tunetab
A classy youtube with friends "app". Submit videos, chat, skip ones you don't like.

### install/run
* `cp config.sample.js config.js` this is gitignored, you need to get a youtube api key and google analytics id
* `npm install` dependencies
* `npm start` starts server
* `npm run build` dev build, watches files for changes
* `npm run build-prod` prod build with some minification and stuff

### NOTES
- submit
  - [ ] edit upcoming playlist via ids
- rooms
  - [ ] add ability to lock room (user id) (alert room)
  - [ ] private room flag (not broadcast when run `/rooms`) (alert room)
  - [ ] have way of autorunning rooms
- general
  - [ ] add unique token on login, store in cookie, use this for room locking, private rooms, further moderation functions
  - [ ] REDIS datastore for non destructive deploys
  - [ ] redo css with flexbox and BEM
  - [ ] update title with current video, play icon for older browsers
  - [ ] better deploy
  - [ ] tests
  - [ ] refocus input on click in chat bar
- deploy note for me...
  - [ ] `sudo apt-get install build-essential g++`
  - [ ] `iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`
