import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './map-overlay.css';
import RawMap from './image.jpg';

export default class MapOverlay extends Component {
  static propTypes = {
    origo: PropTypes.any.isRequired,
    invert: PropTypes.any.isRequired,
    scale: PropTypes.any.isRequired
  };
  screenToMap(p) {
    return {
      x: parseInt((p.x - this.props.origo.x) / (this.props.scale * this.props.invert.x)),
      y: parseInt((p.y - this.props.origo.y) / (this.props.scale * this.props.invert.y))
    };
  }
  render() {
    let { origo } = { ...this.props };

    return [
      <div
        key='img'
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          overflow: 'hidden'
        }}
      >
        <img
          src={RawMap}
          width={`${100 * (this.props.scale / 0.645)}%`}
          style={{ position: 'absolute', opacity: 0.5 }}
        />
      </div>,
      <div
        key='vertical'
        className='origo-vertical'
        style={{ left: origo.x || 0, height: (origo.y || 0) * 2 }}
      >
        <div
          className='origo-vertical-marker'
          style={{ position: 'absolute', left: 0, top: (origo.y || 0) * 0 }}
        >
          {this.screenToMap({ x: 0, y: origo.y * 0 }).y}
        </div>
        <div
          className='origo-vertical-marker'
          style={{ position: 'absolute', left: 0, top: (origo.y || 0) * 0.25 }}
        >
          {this.screenToMap({ x: 0, y: origo.y * 0.25 }).y}
        </div>
        <div
          className='origo-vertical-marker'
          style={{ position: 'absolute', left: 0, top: (origo.y || 0) * 0.5 }}
        >
          {this.screenToMap({ x: 0, y: origo.y * 0.5 }).y}
        </div>
        <div
          className='origo-vertical-marker'
          style={{ position: 'absolute', left: 0, top: (origo.y || 0) * 0.75 }}
        >
          {this.screenToMap({ x: 0, y: origo.y * 0.75 }).y}
        </div>

        <div
          className='origo-vertical-marker'
          style={{ position: 'absolute', left: 0, top: (origo.y || 0) * 1.25 }}
        >
          {this.screenToMap({ x: 0, y: origo.y * 1.25 }).y}
        </div>
        <div
          className='origo-vertical-marker'
          style={{ position: 'absolute', left: 0, top: (origo.y || 0) * 1.5 }}
        >
          {this.screenToMap({ x: 0, y: origo.y * 1.5 }).y}
        </div>
        <div
          className='origo-vertical-marker'
          style={{ position: 'absolute', left: 0, top: (origo.y || 0) * 1.75 }}
        >
          {this.screenToMap({ x: 0, y: origo.y * 1.75 }).y}
        </div>
        <div className='origo-vertical-marker' style={{ position: 'absolute', left: 0, bottom: 0 }}>
          {this.screenToMap({ x: 0, y: origo.y * 2 }).y}
        </div>
      </div>,
      <div
        key='horizontal'
        className='origo-horizontal'
        style={{ top: origo.y || 0, width: (origo.x || 0) * 2 }}
      >
        <div className='origo-horizontal-marker' style={{ position: 'absolute', left: 0, top: 0 }}>
          {this.screenToMap({ x: origo.x * 0, y: 0 }).x}
        </div>
        <div
          className='origo-horizontal-marker'
          style={{ position: 'absolute', left: (origo.x || 0) * 0.25, top: 0 }}
        >
          {this.screenToMap({ x: origo.x * 0.25, y: 0 }).x}
        </div>
        <div
          className='origo-horizontal-marker'
          style={{ position: 'absolute', left: (origo.x || 0) * 0.5, top: 0 }}
        >
          {this.screenToMap({ x: origo.x * 0.5, y: 0 }).x}
        </div>
        <div
          className='origo-horizontal-marker'
          style={{ position: 'absolute', left: (origo.x || 0) * 0.75, top: 0 }}
        >
          {this.screenToMap({ x: origo.x * 0.75, y: 0 }).x}
        </div>

        <div
          className='origo-horizontal-marker'
          style={{ position: 'absolute', left: (origo.x || 0) * 1.25, top: 0 }}
        >
          {this.screenToMap({ x: origo.x * 1.25, y: 0 }).x}
        </div>
        <div
          className='origo-horizontal-marker'
          style={{ position: 'absolute', left: (origo.x || 0) * 1.5, top: 0 }}
        >
          {this.screenToMap({ x: origo.x * 1.5, y: 0 }).x}
        </div>
        <div
          className='origo-horizontal-marker'
          style={{ position: 'absolute', left: (origo.x || 0) * 1.75, top: 0 }}
        >
          {this.screenToMap({ x: origo.x * 1.75, y: 0 }).x}
        </div>
        <div className='origo-horizontal-marker' style={{ position: 'absolute', right: 0, top: 0 }}>
          {this.screenToMap({ x: origo.x * 2, y: 0 }).x}
        </div>
      </div>
    ];
  }
}
