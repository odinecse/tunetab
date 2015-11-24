import React, { Component } from 'react';
import classNames from 'classnames';

import dataStore from '../dataStore';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.editAlias = this.editAlias.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      drowdown: false,
    };
  }

  editAlias(e) {
    dataStore.setEditAlias({editAlias: true});
  }

  toggleDropdown(e) {
    if(!this.state.drowdown) {
      document.addEventListener("click", this.hide);
    }
    this.setState({drowdown: !this.state.drowdown});
  }

  hide() {
    this.setState({drowdown: false});
    document.removeEventListener("click", this.hide);
  }

  render() {
    return (
      <div id="tt-settings">
        <a href="#" onClick={this.toggleDropdown}><i className="fa fa-cogs"></i> Settings</a>
        <div id="tt-settings-dropdown" className={classNames({hidden: !this.state.drowdown})}>
          <a href="#" onClick={this.editAlias}><i className="fa fa-pencil"></i> Edit Alias</a>
        </div>
      </div>

    );
  }
}