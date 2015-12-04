import React, { Component } from 'react';

import Messages from './_Messages';
import Chatform from './_Chatform';

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tt-chat-container">
        <div id="tt-chat">
          <Messages messages={this.props.messages} alias={this.props.alias} />
          <Chatform alias={this.props.alias} />
        </div>
      </div>
    );
  }
}
