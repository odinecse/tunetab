import React, { Component } from 'react';

import dataStore from '../dataStore';

export default class Userinfo extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.state = {
      alias: '',
      editable: false
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      alias: props.alias,
      editable: props.editAlias
    });
  }

  handleChange(e) {
    this.setState({alias: e.target.value});
  }

  handleOnKeyPress(e) {
    let key = e.charCode;
    let alias = e.target.value.trim();
    if(key === 27) {
      dataStore.setEditAlias({editAlias: false});
    } else if(key === 13) {
      if(alias !== '') {
        dataStore.setAlias({alias: alias});
      }
    }
  }

  render() {
    let user = this.state.alias;
    if(this.state.editable) {
      user = <input ref="query"
                    value={this.state.alias}
                    onKeyPress={this.handleOnKeyPress}
                    onChange={this.handleChange}
                    type='text' />
    }
    return (
      <div>
        {user}
      </div>
    );
  }
}