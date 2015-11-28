import React, { Component } from 'react';

import dataStore from '../../dataStore';

export default class Chatform extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.send = this.send.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.state = {
      msg: '',
    }
  }

  handleChange(e) {
    this.setState({msg: e.target.value});
  }

  handleOnKeyPress(e) {
    const key = e.charCode;
    const msg = e.target.value.trim();
    if(key === 13) {
      if(msg !== '') {
        this.send();
      }
    }
  }

  send() {
    const msg = this.state.msg.trim();
    dataStore.emitMsg({
      alias: this.props.alias,
      msg: msg,
      type: 'user'
    });
    this.setState({msg: ''});
  }

  render() {
    let editAlias = !this.props.editAlias || false;
    return (
      <div id="tt-chatform" className="cf">
        <div id="tt-chatform-c">
          <input  id="tt-chatform-input"
                  ref={function(input) {
                    if (input != null && editAlias) {
                      input.focus();
                    }
                  }}
                  value={this.state.msg}
                  onKeyPress={this.handleOnKeyPress}
                  onChange={this.handleChange}
                  type='text'
                  autoComplete="off" />
          <a href="#" id="tt-send-msg" className="tt-user-action tt-btn" 
                      onClick={this.send}>
            <i className="fa fa-paper-plane-o"></i>
            Send
          </a>
        </div>
      </div>
    );
  }
}