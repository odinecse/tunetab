import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Message from './Message';

export default class Messages extends Component {

  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
  }

  componentWillUpdate() {
    let node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }

  componentDidUpdate() {
    let node = {};
    if (this.shouldScrollBottom) {
      node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    let messages = null;
    let userAlias = this.props.alias;
    if(this.props.messages.length > 0) {
      messages = this.props.messages.map(function(msg, i) {
        return (
          <Message  alias={msg.alias}
                    msg={msg.msg}
                    msgType={msg.type}
                    userAlias={userAlias}
                    key={i} />
        );
      });
    }

    return (
      <div id="tt-msg-container" className="tt-overflow-container">  
        <ul id="tt-msg">
          {messages}
        </ul>
      </div>
    );
  }
}

