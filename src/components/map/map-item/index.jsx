import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import MapActions from '../../../actions/map-actions';
import './map-item.css';
export default class MapItem extends Component {
  static propTypes = {
    item: PropTypes.any.isRequired,
    position: PropTypes.any.isRequired,
    onRemove: PropTypes.func.isRequired
  };
  getIconData(type, visited) {
    switch (type) {
      case 'poi':
        return { name: 'map pin', color: 'orange' };
      case 'pod':
        return { name: 'selected radio', color: !visited ? 'red' : 'yellow' };
      case 'wreck':
        return { name: 'remove', color: !visited ? 'red' : 'green' };
      case 'base':
        return { name: 'circle thin', color: 'blue' };
      case 'cave':
        return { name: 'angle double down', color: !visited ? 'red' : 'purple' };
      case 'resource':
        return { name: 'registered', color: 'olive' };
      default:
        return { name: 'user', color: 'white' };
    }
  }
  renderAdditionalData(item) {
    switch (item.type) {
      case 'poi':
        return <div style={{ fontSize: 10 }}>{item.comment}</div>;
      case 'pod':
        return <div>{item.comment}</div>;
      default:
        return null;
    }
  }
  renderVisited(item) {
    let { type, visited, x, y } = { ...item };
    if (type === 'wreck' || type === 'cave' || type === 'pod') {
      return <Checkbox style={{ fontSize: 12 }} checked={visited} label='Visited' onChange={() => MapActions.toggleVisited({ x: x, y: y })} />;
    }
  }
  render() {
    let { position, item, onRemove } = { ...this.props };
    let style = { position: 'absolute', left: `${position.x - 8}px`, top: `${position.y - 8}px` };
    let iconData = this.getIconData(item.type, item.visited);
    return (
      <Popup
        hoverable
        key={`${item.type}_${item.x}_${item.y}`}
        trigger={
          <div className='map-item-icon' style={style}>
            <Icon name={iconData.name} color={iconData.color} />
            {this.renderAdditionalData(item)}
          </div>
        }
        content={
          <div className='map-item-container'>
            <div className='map-item-name'>
              <span>{item.name}</span>
              <Icon name='remove' color='red' onClick={() => onRemove(item)} />
            </div>
            <div className='map-item-comment'>{item.comment}</div>
            <div className='map-item-coords' style={{ display: 'flex' }}>
              <div style={{ marginRight: '5px' }}>X: {item.x}</div>
              <div style={{ marginRight: '5px' }}>Y: {item.y}</div>
            </div>
            <div className='map-item-added'>{item.added}</div>
            <div className='map-item-added'>Discovered {moment(item.added).from(moment().format('LLL'))}</div>
            {this.renderVisited(item)}
          </div>
        }
      />
    );
  }
}
