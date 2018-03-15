import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class StartView extends Component {
  render() {
    return (
      <div style={{ display: 'flex', fontSize: '18px', flexDirection: 'column', color: 'white', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div>Cartographer stores data in browser cache</div>
        <div style={{ margin: '20px' }}>Clear cache and all data is gone :(</div>
        <Link style={{ color: 'white' }} to='/maps'>
          GO!
        </Link>
      </div>
    );
  }
}
