import React, { Component } from 'react';
import classNames from 'classnames';

export default class Message extends Component {

  render() {
    let currentUserTest = this.props.alias === this.props.userAlias ? true : false;
    return (
      <li className={'tt-msg-item tt-msg-' + this.props.msgType}>
        <span className={
                classNames({
                  'tt-msg-alias': true,
                  'tt-msg-alias-self': currentUserTest
                })
              } >
          {this.props.alias}
        </span>
        {this.props.msg}
      </li>
    );
  }

}
