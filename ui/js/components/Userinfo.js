import React, { Component } from 'react';

export default class Userinfo extends Component {
  render() {
    return (
      <div>
        {this.props.alias}
      </div>
    );
  }
}