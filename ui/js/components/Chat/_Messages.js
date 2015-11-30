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
    this.domNode = ReactDOM.findDOMNode(this);
    this.shouldScroll = this.domNode.scrollTop + this.domNode.offsetHeight === this.domNode.scrollHeight;
  }

  componentDidUpdate() {
    if(this.shouldScroll) {
      this.domNode.scrollTop = this.domNode.scrollHeight;
    }
  }

  render() {
    let messages = null;
    if(this.props.messages.length > 0) {
      messages = this.props.messages.map(function(msg, i) {
        return (
          <Message  alias={msg.alias}
                    msg={msg.msg}
                    msgType={msg.type}
                    userAlias={this.props.alias}
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

