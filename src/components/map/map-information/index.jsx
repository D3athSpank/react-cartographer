import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MapHelper from '../../../utils/map-helper';
import { Icon } from 'semantic-ui-react';
import './map-information.css';
export default class MapInformation extends Component {
  static propTypes = {
    scale: PropTypes.any.isRequired,
    onResetZoom: PropTypes.func.isRequired,
    mousePosition: PropTypes.any.isRequired,
    mapWidth: PropTypes.any.isRequired,
    mapHeight: PropTypes.any.isRequired
  };
  render() {
    let { scale, onResetZoom, mousePosition, mapWidth, mapHeight, mapName } = { ...this.props };
    return (
      <div className='map-information'>
        <div className='name'>{mapName}</div>
        <div className='zoom'>
          Zoom : {Math.round(scale * 100) / 100} <Icon name='remove' color='red' onClick={() => onResetZoom()} />
        </div>
        <div className='pos'>Pos: {JSON.stringify(MapHelper.pointToMapCoords(mousePosition, scale, mapWidth, mapHeight)).replace(/"/g, ' ')}</div>
        <div>
          <Link className='back' to='/'>
            Back
          </Link>
        </div>
      </div>
    );
  }
}
