import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import MapHelper from '../../../utils/map-helper';
import { Icon, Modal, Button, Checkbox } from 'semantic-ui-react';
import JSONPretty from 'react-json-pretty';
import CopyToClipboard from 'react-copy-to-clipboard';
import MapActions from '../../../actions/map-actions';
import './map-information.css';
export default class MapInformation extends Component {
  static propTypes = {
    currentMap: PropTypes.any.isRequired,
    mouseCoords: PropTypes.any.isRequired,
    mouseWorldCoords: PropTypes.any.isRequired,
    windowSize: PropTypes.any.isRequired,
    origo: PropTypes.any.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      showSourceDialog: false
    };
  }
  renderSourceModal() {
    return (
      <div className='cool'>
        <Modal open={this.state.showSourceDialog} onClose={() => this.setState({ showSourceDialog: false })}>
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
    let { mouseWorldCoords, mouseCoords, windowSize, origo, currentMap } = { ...this.props };
    return (
      <div className='map-information'>
        <div className='name'>
          <Link className='back' to='/maps'>
            <Icon name='backward' />
          </Link>
          {currentMap.name}
        </div>
        <div className='zoom'>
          <Icon name='zoom' />: {currentMap.scale}
        </div>
        <div className='pos'>
          <Icon name='marker' />: {JSON.stringify(mouseWorldCoords).replace(/"/g, ' ')}
        </div>
        <div className='pos'>
          <Icon name='marker' />: {JSON.stringify(mouseCoords).replace(/"/g, ' ')}
        </div>
        <div className='pos'>
          <Icon name='windows' />: {JSON.stringify(windowSize).replace(/"/g, ' ')}
        </div>
        <div className='pos'>
          <Icon name='bullseye' />: {JSON.stringify(origo).replace(/"/g, ' ')}
        </div>
        <div className='invertion'>
          <span>
            Invert: <Checkbox label='X' checked={currentMap.invert.x == -1 ? true : false} onChange={() => MapActions.invertX()} />
            <Checkbox label='Y' checked={currentMap.invert.y == -1 ? true : false} onChange={() => MapActions.invertY()} />
          </span>
        </div>
        <Button compact size='mini' negative onClick={() => this.setState({ showSourceDialog: true })}>
          Show Source
        </Button>
        {this.renderSourceModal()}
      </div>
    );
  }
}
