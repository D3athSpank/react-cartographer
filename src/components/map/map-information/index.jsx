import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MapHelper from '../../../utils/map-helper';
import { Icon, Modal, Button, Popup } from 'semantic-ui-react';
import JSONPretty from 'react-json-pretty';
import CopyToClipboard from 'react-copy-to-clipboard';
import './map-information.css';
export default class MapInformation extends Component {
  static propTypes = {
    currentMap: PropTypes.any.isRequired,
    onResetZoom: PropTypes.func.isRequired,
    mousePosition: PropTypes.any.isRequired,
    mapWidth: PropTypes.any.isRequired,
    mapHeight: PropTypes.any.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      showSourceDialog: false
    };
  }
  renderSourceModal() {
    return (
      <div className='cool' ref={ref => (this.tk = ref)}>
        <Modal mountNode={this.tk} open={this.state.showSourceDialog} onClose={() => this.setState({ showSourceDialog: false })}>
          <Modal.Header>Source of {this.props.currentMap.name}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <CopyToClipboard text={JSON.stringify(this.props.currentMap)} onCopy={() => this.setState({ copied: true })}>
                <Button negative icon='copy' content='Copy to clipboard' />
              </CopyToClipboard>
              <div style={{ color: 'black', fontSize: '12px' }}>
                <JSONPretty id='json-pretty' json={this.props.currentMap} />
              </div>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
  render() {
    let { onResetZoom, mousePosition, mapWidth, mapHeight, currentMap } = { ...this.props };
    return (
      <div className='map-information'>
        <div className='name'>
          <Link className='back' to='/maps'>
            <Icon name='backward' />
          </Link>
          {currentMap.name}
        </div>
        <div className='zoom'>
          <Icon name='zoom' />: {Math.round(currentMap.scale * 100) / 100} <Icon name='remove' color='red' onClick={() => onResetZoom()} />
        </div>
        <div className='pos'>
          <Icon name='marker' />: {JSON.stringify(MapHelper.pointToMapCoords(mousePosition, currentMap.scale, mapWidth, mapHeight)).replace(/"/g, ' ')}
        </div>
        <Button compact size='mini' negative onClick={() => this.setState({ showSourceDialog: true })}>
          Show Source
        </Button>
        {this.renderSourceModal()}
      </div>
    );
  }
}
