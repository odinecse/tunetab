import React, { Component } from 'react';
import Cookies from 'js-cookie';
import dataStore from '../dataStore';
import incomingActions from '../actions/incomingActions';
import {COOKIE_NAME, ROOM_ID} from '../constants';
import Chat from './Chat/Chat';
import Videoplayer from './Videoplayer/Videoplayer';

var socket = window.io();
var cookie = Cookies.get(COOKIE_NAME) || false;
var cookieData = {
  alias: false,
  muted: true
};

if(cookie) {
  cookieData = JSON.parse(cookie);
}
/***
    kicks off handshake, socket responds with 'welcome' message
      see incomingActions.js
**/
socket.emit('login', {room: ROOM_ID, alias: cookieData.alias});
dataStore.setMuted({muted: cookieData.muted});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.state = dataStore.getData();
  }

  onStoreChange() {
    this.setState(dataStore.getData());
  }

  componentWillMount() {
    dataStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    dataStore.removeChangeListener(this.onStoreChange);
  }

  render() {
    return (
      <div id="tt-container">
        <Videoplayer  videos={this.state.videos}
                      muted={this.state.muted}
                      submitted={this.state.submitted} />
        <Chat alias={this.state.alias}
              messages={this.state.messages} />
      </div>
    );
  }

}
