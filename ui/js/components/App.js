import React, { Component } from 'react';
import Cookies from 'js-cookie';
import dataStore from '../dataStore';
import incomingActions from '../incomingActions';
import {COOKIE_NAME, ROOM_ID} from '../constants';
import Chat from './Chat/Chat';
import Videoplayer from './Videoplayer/Videoplayer';

var socket = window.io();
// use this to show welcome message too...
var alias = Cookies.get(COOKIE_NAME) || false;
// kicks off handshake, socket events processed in datastore
socket.emit('login', {room: ROOM_ID, alias: alias});

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
                      skipping={this.state.skipping} />
        <Chat alias={this.state.alias}
              messages={this.state.messages}
              users={this.state.users}
              userCount={this.state.userCount} />
      </div>
    );
  }

}