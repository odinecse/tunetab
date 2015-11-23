import React, { Component } from 'react';
import Cookies from 'js-cookie';

import Chat from './Chat';
import Videoplayer from './Videoplayer';


const roomId = window.TUNETAB_ROOM_ID;
const COOKIE_NAME = 'tunetab_alias';

var socket = io();
var alias = Cookies.get(COOKIE_NAME) || false;

var skipVotes = 0;
var skipThreshold = 1;
var tickInterval = {};
var users = {};
var userCount = 0;
var videos = {};

socket.emit('login', {room: roomId, alias: alias});

socket.on('welcome', function(data){
  console.log('welcome', data);
  alias = data.alias;
  Cookies.set(COOKIE_NAME, data.alias, { expires: 666});
  videos = data.videos;
});

socket.on('usersInfo', function(data){
  console.log('usersInfo', data);
  users = data.users;
  userCount = data.userCount;
  skipVotes = data.skipVotes;
  skipThreshold = data.skipThreshold;
});

function getState() {
  return {
    alias: alias
  }
}

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = getState();
  }

  render() {
    return (
      <div>
        <Videoplayer />
        <Chat alias={this.state.alias} />
      </div>
    );
  }

}