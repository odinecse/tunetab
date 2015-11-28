import React, { Component } from 'react';

import Message from './Message';

export default class Messages extends Component {

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    // if(typeof this.messages !== "undefined") {
    //   this.messages.scrollTop(this.messages.scrollTop);  
    // } 
  }

  render() {
    let messages = null;
    let userAlias = this.props.alias;
    if(this.props.messages.length > 0) {
      messages = this.props.messages.map(function(msg, i) {
        return (
          <Message  ref={(messages) => {
                      console.log(messages);
                      // if(messages !== null) {
                      //   this.messages = messages
                      // }
                    }}
                    alias={msg.alias}
                    msg={msg.msg}
                    msgType={msg.type}
                    userAlias={userAlias}
                    key={i} />
        );
      });
    }

    return (
      <div id="tt-msg-c">  
        <ul id="tt-msg">
          {messages}
        </ul>
      </div>
    );
  }
}

