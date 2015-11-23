import React, { Component } from 'react';
import Chat from './Chat';
import Videoplayer from './Videoplayer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Videoplayer />
        <Chat />
      </div>
    );
  }
}