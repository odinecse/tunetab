import React, { Component } from 'react';

import Message from './Message';

export default class Messages extends Component {

  render() {
    let messages = null;
    if(this.props.messages.length > 0) {
      messages = this.props.messages.map(function(msg, i) {
        return (
          <Message  alias={msg.alias}
                    msg={msg.msg}
                    msgType={msg.type}
                    key={i} />
        );
      });
    }

    return (
      <ul id="tt-msg">
        {messages}
      </ul>
    );
  }
}

