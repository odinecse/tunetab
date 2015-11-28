import React, { Component } from 'react';

import Userinfo from './Userinfo';
import Notifications from './Notifications';
import Messages from './Messages';
import Chatform from './Chatform';

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tt-chat" className="tt-grid col-1-3">
        <div id="tt-userbar" className="cf">
          <Userinfo alias={this.props.alias} editAlias={this.props.editAlias} />
        </div>
        <Notifications />
        <Messages messages={this.props.messages} alias={this.props.alias}/>
        <Chatform alias={this.props.alias} editAlias={this.props.editAlias} />
      </div>
    );
  }
}

