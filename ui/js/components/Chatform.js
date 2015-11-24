import React, { Component } from 'react';

import dataStore from '../dataStore';

export default class Chatform extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
        console.log(this.props.alias);
        dataStore.sendMsg({
          alias: this.props.alias,
          msg: msg,
          type: 'user'
        });
        this.setState({msg: ''});
      }
    }
  }

  render() {
    return (
      <div id="tt-chatform">
        <input  ref={function(input) {
                  if (input != null) {
                    input.focus();
                  }
                }}
                value={this.state.msg}
                onKeyPress={this.handleOnKeyPress}
                onChange={this.handleChange}
                type='text'
                autoComplete="off" />
      </div>
    );
  }
}