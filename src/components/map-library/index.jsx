import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './map-library.css';
import { withRouter } from 'react-router-dom';
import MapActions from '../../actions/map-actions';
import { Input, Icon, Button, TextArea } from 'semantic-ui-react';

export default withRouter(
  class MapLibrary extends Component {
    static propTypes = {
      maps: PropTypes.any
    };

    constructor(props) {
      super(props);
      this.state = { mapName: '', importMap: '' };
    }
    isValidJson() {
      if (
        /^[\],:{}\s]*$/.test(
          this.state.importMap
            .replace(/\\["\\\/bfnrtu]/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
    renderMapTiles() {
      return this.props.maps.map(m => {
        return (
          <div className='map-tile-container' key={m.name}>
            <div className='header'>
              <Icon name='map outline' size='huge' />
              <div>{m.name}</div>
              <div>Items: {m.items.length}</div>
            </div>
            <div className='actions'>
              <Button content='Open' positive icon='folder open' onClick={() => this.props.history.push(`/map/${m.name}`)} />
              <Button negative content='Delete' icon='remove' onClick={() => MapActions.deleteMap(m.name)} />
            </div>
          </div>
        );
      });
    }
    render() {
      return (
        <div className='map-library-container'>
          {this.renderMapTiles()}
          <div className='map-tile-container'>
            <div className='header'>
              <Icon name='map outline' size='huge' />
            </div>
            <div className='actions'>
              <Input style={{ marginBottom: '5px' }} placeholder='Enter new map name' value={this.state.mapName} onChange={(e, { value }) => this.setState({ mapName: value })} />
              <Button disabled={this.state.mapName.length < 2} primary content='Add' icon='add' onClick={() => MapActions.createMap(this.state.mapName)} />
            </div>
          </div>
          <div className='map-tile-container'>
            <div className='header'>
              <Icon name='map outline' size='huge' />
            </div>
            <div className='actions'>
              <TextArea
                style={{ marginBottom: '5px', fontSize: '10px' }}
                placeholder='Paste json here'
                value={this.state.importMap}
                onChange={(e, { value }) => this.setState({ importMap: value })}
              />
              <Button
                disabled={!this.isValidJson() || this.state.importMap.length < 2}
                primary
                content='Import'
                icon='add'
                onClick={() => MapActions.importMap(JSON.parse(this.state.importMap))}
              />
            </div>
          </div>
        </div>
      );
    }
  }
);
