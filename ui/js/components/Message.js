import React, { Component } from 'react';

export default class Message extends Component {

  render() {
    return (
      <li className="tt-msg-{this.props.msgType}">
        <span className="tt-msg-alias">{this.props.alias}</span>
        {this.props.msg}
      </li>
    );
  }
}
