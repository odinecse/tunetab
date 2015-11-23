import React, { Component } from 'react';

import Userinfo from './Userinfo';
import Settings from './Settings';
import Notifications from './Notifications';
import Messages from './Messages';
import Chatform from './Chatform';

export default class Chat extends Component {
  render() {
    return (
      <div id="tt-chat" className="tt-grid col-1-3">
        <div id="tt-userbar">
          <Userinfo alias={this.props.alias} />
          <Settings />
        </div>
        <Notifications />
        <Messages />
        <Chatform />
      </div>
    );
  }
}

