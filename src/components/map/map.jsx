import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapActions from '../../actions/map-actions';
import MapOverlay from './map-overlay';
import MapInformation from './map-information';
import MapHelper from '../../utils/map-helper';
import MapItem from './map-item';
import AddItemWindow from './add-item-window';
import { withRouter } from 'react-router';
import { Icon } from 'semantic-ui-react';
import './map.css';
export default withRouter(
  class CartoMap extends Component {
    static propTypes = {
      currentMap: PropTypes.any.isRequired,
      match: PropTypes.any,
      mapItems: PropTypes.any.isRequired
    };
    constructor(props) {
      super(props);
      this.state = {
        mousePosition: { x: 0, y: 0 },
        addMarkerPosition: null,
        newItemType: '',
        newItemComment: ''
      };
    }
    componentDidMount() {
      MapActions.loadMap(this.props.match.params.mapId);
    }
    mapSize() {
      return {
        mapHeight: this.mapRef ? this.mapRef.offsetHeight : 0,
        mapWidth: this.mapRef ? this.mapRef.offsetWidth : 0
      };
    }
    mapScrolling(e) {
      if (!this.state.addMarkerPosition) {
        if (e.nativeEvent.deltaY <= 0) {
          MapActions.setScale(this.props.currentMap.scale + (this.props.currentMap.scale < 0.5 ? 0.01 : 0.05));
        } else {
          MapActions.setScale(this.props.currentMap.scale - (this.props.currentMap.scale < 0.5 ? 0.01 : 0.05));
        }
      }
    }
    mapMouseMove(e) {
      this.setState({
        mousePosition: { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY }
      });
    }
    renderAddItemWindow() {
      if (this.state.addMarkerPosition) {
        let { mapHeight, mapWidth } = { ...this.mapSize() };
        let position = MapHelper.pointToMapCoords(this.state.addMarkerPosition, this.props.currentMap.scale, mapWidth, mapHeight);
        let style = { position: 'absolute', left: this.state.addMarkerPosition.x - 8, top: this.state.addMarkerPosition.y - 8 };
        return [
          <div key='marker' className='map-item-icon' style={style}>
            <Icon name='bullseye' color='red' />
          </div>,
          <AddItemWindow
            key='window'
            newItemPosition={position}
            mapObjects={this.props.mapItems}
            onAddItem={item => {
              this.setState({
                addMarkerPosition: null
              });
              MapActions.addItem(item);
            }}
          />
        ];
      }
    }
    renderMapItems(scale, mapHeight, mapWidth) {
      let origo = { x: mapWidth / 2, y: mapHeight / 2 };
      return this.props.currentMap.items.map((o, i) => {
        return <MapItem key={i} item={o} scale={this.props.currentMap.scale} origo={origo} onRemove={i => MapActions.removeItem(i)} />;
      });
    }
    render() {
      let { mapHeight, mapWidth } = { ...this.mapSize() };
      return (
        <div className='map-container'>
          <div
            className='map'
            onMouseDown={() => this.setState({ addMarkerPosition: this.state.addMarkerPosition ? null : this.state.mousePosition })}
            onMouseMove={e => this.mapMouseMove(e)}
            onWheel={e => this.mapScrolling(e)}
            ref={mapRef => {
              this.mapRef = mapRef;
            }}
          >
            <MapOverlay mapHeight={mapHeight} mapWidth={mapWidth} scale={this.props.currentMap.scale} />
            {this.renderMapItems(this.props.currentMap.scale, mapHeight, mapWidth)}
          </div>
          {this.renderAddItemWindow()}
          <MapInformation
            scale={this.props.currentMap.scale}
            onResetZoom={() => MapActions.setScale(1)}
            mousePosition={this.state.mousePosition}
            mapWidth={mapWidth}
            mapHeight={mapHeight}
            mapName={this.props.currentMap.name}
          />
        </div>
      );
    }
  }
);
