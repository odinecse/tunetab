import React, { Component } from 'react';
import Cookies from 'js-cookie';
import dataStore from '../dataStore';
import {COOKIE_NAME, ROOM_ID} from '../constants';
import Chat from './Chat';
import Videoplayer from './Videoplayer';

var socket = window.io();
var alias = Cookies.get(COOKIE_NAME) || false;

socket.emit('login', {room: ROOM_ID, alias: alias});

socket.on('welcome', function(data){
  console.log('welcome', data);
  dataStore.setAlias({alias: data.alias});
  Cookies.set(COOKIE_NAME, data.alias, { expires: 666});
  dataStore.setVideos({videos: data.videos});
});

socket.on('usersInfo', function(data){
  console.log('usersInfo', data);
  dataStore.setUsers({
    users: data.users,
    userCount: data.userCount,
    skipVotes: data.skipVotes,
    skipThreshold: data.skipThreshold
  });
});

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
      <div className="main-container">
        <Videoplayer />
        <Chat alias={this.state.alias}
              editAlias={this.state.editAlias}
              settingsDropdown={this.state.settingsDropdown}
              messages={this.state.messages} />
      </div>
    );
  }

}