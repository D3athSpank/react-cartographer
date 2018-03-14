import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './cartographer.css';
import { Link } from 'react-router-dom';
import MapActions from '../../actions/map-actions';
import { Input, Icon, Button } from 'semantic-ui-react';
class CartoGrapher extends Component {
  static propTypes = {
    maps: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = { mapName: '' };
  }

  renderMapTiles() {
    return this.props.maps.map(m => {
      return (
        <div className='map-tile-container' key={m.name}>
          <div className='header'>
            <Icon name='picture' size='huge' />
            <div>{m.name}</div>
            <div>Items: {m.items.length}</div>
          </div>
          <div className='actions'>
            <Button content={<Link to={`/map/${m.name}`}>Open</Link>} positive icon='folder open' />
            <Button negative content='Delete' icon='remove' onClick={() => MapActions.deleteMap(m.name)} />
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className='cartographer-container'>
        {this.renderMapTiles()}
        <div className='map-tile-container'>
          <div className='header'>
            <Icon name='picture' size='huge' />
          </div>
          <div className='actions'>
            <Input
              style={{ marginBottom: '5px' }}
              placeholder='Enter new map name'
              value={this.state.mapName}
              onChange={(e, { value }) => this.setState({ mapName: value })}
            />
            <Button
              disabled={this.state.mapName.length < 2}
              primary
              content='Add'
              icon='add'
              onClick={() => MapActions.createMap(this.state.mapName)}
            />
          </div>
        </div>
        {/* <CartoMap {...this.props} /> */}
      </div>
    );
  }
}

export default CartoGrapher;
