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
    const key = e.keyCode;
    const msg = e.target.value.trim();
    if(key === 13) {
      this.send(msg);
    }
  }

  send(msg) {
    if(msg !== '') {
      dataStore.emitMsg({
        alias: this.props.alias,
        msg: msg,
        type: 'user'
      });
      this.setState({msg: ''});
    }
  }

  render() {
    return (
      <div id="tt-chatform" className="cf">
          <span id="tt-chatform-alias">
            <span className="tt-alias">{this.props.alias}</span>
            <i className="fa fa-chevron-right"></i>
          </span>
          <input  id="tt-chatform-input"
                  ref={function(input) {
                    if (input != null) {
                      input.focus();
                    }
                  }}
                  value={this.state.msg}
                  className="tt-input"
                  onKeyPress={this.handleOnKeyPress}
                  onChange={this.handleChange}
                  type='text'
                  autoComplete="off" />
      </div>
    );
  }
}