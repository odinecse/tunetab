import React, { Component } from 'react';
import classNames from 'classnames';

import notificationSound   from '../../../files/notification.mp3';

var notification = new Audio(notificationSound);

export default class Message extends Component {

  render() {
    let currentUserTest = this.props.alias === this.props.userAlias ? true : false;
    if(!currentUserTest && this.props.msgType === "user") {
      notification.pause();
      notification.currentTime = 0;
      notification.play();
    }
    return (
      <li className={classNames('tt-msg-item', 'tt-msg-' + this.props.msgType, {
        'tt-msg-alias-self': currentUserTest
      })}>
        <span className="tt-msg-alias">
          {this.props.alias}
        </span>
        {this.props.msg}
      </li>
    );
  }

}
