import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MathHelper from '../../../utils/map-helper';
import './map-overlay.css';
export default class MapOverlay extends Component {
  static propTypes = {
    scale: PropTypes.any.isRequired,
    mapWidth: PropTypes.any.isRequired,
    mapHeight: PropTypes.any.isRequired
  };
  render() {
    let { mapHeight, mapWidth, scale } = { ...this.props };
    return [
      <div key='vertical' className='origo-vertical' style={{ left: mapWidth * 0.5, height: mapHeight }}>
        <div className='origo-vertical-marker' style={{ top: mapHeight * 0 }}>
          {MathHelper.pointToMapCoords({ y: mapHeight * 0, x: 0 }, scale, mapWidth, mapHeight).y}
        </div>
        <div className='origo-vertical-marker' style={{ top: mapHeight * 0.25 }}>
          {MathHelper.pointToMapCoords({ y: mapHeight * 0.25, x: 0 }, scale, mapWidth, mapHeight).y}
        </div>
        <div className='origo-vertical-marker' style={{ top: mapHeight * 0.75 }}>
          {MathHelper.pointToMapCoords({ y: mapHeight * 0.75, x: 0 }, scale, mapWidth, mapHeight).y}
        </div>
        <div className='origo-vertical-marker' style={{ top: mapHeight * 0.98 }}>
          {MathHelper.pointToMapCoords({ y: mapHeight * 0.98, x: 0 }, scale, mapWidth, mapHeight).y}
        </div>
      </div>,
      <div key='horizontal' className='origo-horizontal' style={{ top: mapHeight * 0.5, width: mapWidth }}>
        <div className='origo-horizontal-marker' style={{ left: mapWidth * 0 }}>
          {MathHelper.pointToMapCoords({ x: mapWidth * 0, y: 0 }, scale, mapWidth, mapHeight).x}
        </div>
        <div className='origo-horizontal-marker' style={{ left: mapWidth * 0.25 }}>
          {MathHelper.pointToMapCoords({ x: mapWidth * 0.25, y: 0 }, scale, mapWidth, mapHeight).x}
        </div>
        <div className='origo-horizontal-marker' style={{ left: mapWidth * 0.75 }}>
          {MathHelper.pointToMapCoords({ x: mapWidth * 0.75, y: 0 }, scale, mapWidth, mapHeight).x}
        </div>
        <div className='origo-horizontal-marker' style={{ left: mapWidth * 0.98 }}>
          {MathHelper.pointToMapCoords({ x: mapWidth * 0.98, y: 0 }, scale, mapWidth, mapHeight).x}
        </div>
      </div>
    ];
  }
}
