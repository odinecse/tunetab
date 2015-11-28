import React, { Component } from 'react';

import dataStore from '../../dataStore';

export default class Userinfo extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.editAlias = this.editAlias.bind(this);
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
    const key = e.keyCode;
    const alias = e.target.value.trim();
    if(key === 27) {
      dataStore.toggleEditAlias();
    } else if(key === 13) {
      if(alias !== '') {
        dataStore.setAlias({alias: alias});
      }
    }
  }

  editAlias(e) {
    dataStore.toggleEditAlias();
  }

  render() {
    let user = (
      <div className="pull-right">
        <span className="tt-alias">
          <i className="fa fa-user"></i> {this.state.alias}
        </span>
        <a href="#" className="tt-btn"
                    onClick={this.editAlias}>
          <i className="fa fa-pencil"></i>
          Edit Alias
        </a>
      </div>
    );
    if(this.state.editable) {
      user = (
        <div className="pull-right">
          <input  ref={function(input) {
                    if (input != null) {
                      input.focus();
                    }
                  }}
                  className="tt-user-alias-form"
                  value={this.state.alias}
                  onKeyDown={this.handleOnKeyPress}
                  onChange={this.handleChange}
                  type='text' />
          <a href="#" className="tt-btn" 
                      onClick={this.editAlias}>
            <i className='fa fa-times'></i>
            Cancel
          </a>
        </div>
      )
    }
    return (
      <div>
        {user} 
      </div>
    );
  }
}
