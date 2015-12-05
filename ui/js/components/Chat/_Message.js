import React, { Component } from 'react';
import classNames from 'classnames';

export default class Message extends Component {

  render() {
    let currentUserTest = this.props.alias === this.props.userAlias ? true : false;
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
