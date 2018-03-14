import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input, Button } from 'semantic-ui-react';
import _ from 'lodash';
import './add-item-window.css';
import moment from 'moment';
export default class AddItemWindow extends Component {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
    newItemPosition: PropTypes.any.isRequired,
    mapObjects: PropTypes.array.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      newItemType: '',
      newItemName: '',
      newItemComment: '',
      newItemCoords: props.newItemPosition
    };
  }
  canAdd() {
    if (this.state.newItemType === 'poi' && this.state.newItemComment.length <= 0) {
      return false;
    }
    return this.state.newItemType.length > 0;
  }
  getPlaceHolderText(type) {
    switch (type) {
      case 'poi':
        return 'Add notes for POI';
      case 'resource':
        return 'Add resources here, separated with \',\'';
      case 'pod':
        return 'Add Pod number here';
      default:
        return 'Comment';
    }
  }
  render() {
    let { mapObjects, onAddItem } = { ...this.props };
    return (
      <div className='add-item-window'>
        <div className='input-container'>
          <Dropdown
            style={{ maxWidth: '50px' }}
            text={this.state.newItemType.length > 0 ? _.find(mapObjects, ['type', this.state.newItemType]) : 'Type'}
            selection
            options={mapObjects}
            onChange={(e, control) => {
              let newItemText = control.options.find(o => {
                return o.value == control.value;
              }).text;
              this.setState({
                newItemName: newItemText,
                newItemType: control.value
              });
            }}
          />
          <Input
            style={{ width: '350px', margin: '0px 10px' }}
            placeholder={this.getPlaceHolderText(this.state.newItemType)}
            value={this.state.newItemComment}
            onChange={(e, { value }) =>
              this.setState({
                newItemComment: value
              })
            }
          />
          <Button
            content='Add'
            primary
            disabled={!this.canAdd()}
            onClick={() => {
              onAddItem({
                type: this.state.newItemType,
                name: this.state.newItemName,
                x: this.state.newItemCoords.x,
                y: this.state.newItemCoords.y,
                comment: this.state.newItemComment,
                added: moment().format('LLL'),
                visited: false
              });
            }}
          />
        </div>
        <div className='input-container'>
          <Input
            style={{ width: '160px', marginRight: '46px' }}
            label='X:'
            type='number'
            value={this.state.newItemCoords.x}
            onChange={(e, { value }) =>
              this.setState({
                newItemCoords: { ...this.state.newItemCoords, x: parseInt(value) }
              })
            }
          />
          <Input
            style={{ width: '150px', margin: '10px 0px' }}
            label='Y:'
            type='number'
            value={this.state.newItemCoords.y}
            onChange={(e, { value }) =>
              this.setState({
                newItemCoords: { ...this.state.newItemCoords, y: parseInt(value) }
              })
            }
          />
        </div>
      </div>
    );
  }
}
