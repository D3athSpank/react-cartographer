import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MapActions from '../../actions/map-actions';
import MapOverlay from './map-overlay';
import MapInformation from './map-information';
import MapItem from './map-item';
import AddItemWindow from './add-item-window';
import { withRouter } from 'react-router';
import { Icon } from 'semantic-ui-react';
import './map.css';
export default withRouter(
  class MapView extends Component {
    static propTypes = {
      match: PropTypes.any.isRequired,
      currentMap: PropTypes.any.isRequired,
      mapObjects: PropTypes.any.isRequired
    };
    constructor(props) {
      super(props);
      this.state = {
        windowSize: {
          height: 0,
          width: 0
        },
        dragging: false,
        clientX: 0,
        clientY: 0,
        mouseCoords: {
          x: 0,
          y: 0
        },
        mouseWorldCoords: {
          x: 0,
          y: 0
        }
      };
    }
    componentDidMount() {
      window.onresize = e => {
        this.setWindowSize();
      };
      window.oncontextmenu = e => {
        e.preventDefault();
      };
      MapActions.loadMap(this.props.match.params.mapId);
      setTimeout(() => {
        this.setWindowSize();
        this.mapRef.scrollLeft = this.origo().x - this.state.windowSize.width / 2;
        this.mapRef.scrollTop = this.origo().y - this.state.windowSize.height / 2;
      }, 200);
    }
    setWindowSize() {
      this.setState({
        windowSize: {
          height: this.mapRef ? this.mapRef.offsetHeight : 0,
          width: this.mapRef ? this.mapRef.offsetWidth : 0
        }
      });
    }
    _mouseWheel(e) {
      e.preventDefault();
      let newScale = this.props.currentMap.scale < 1 ? 0.005 : 0.05;
      if (e.nativeEvent.deltaY >= 0) {
        newScale = newScale * -1;
      }
      MapActions.setScale(this.props.currentMap.scale + newScale);
      // this.mapRef.scrollLeft = this.origo().x / this.props.currentMap.scale * (this.props.currentMap.scale + newScale) - this.state.windowSize.width / 2;
      // this.mapRef.scrollTop = this.origo().y / this.props.currentMap.scale * (this.props.currentMap.scale + newScale) - this.state.windowSize.height / 2;
    }
    _mouseUp(e) {
      if (e.nativeEvent.button == 2) {
        e.preventDefault();
        this.setState({
          dragging: false,
          clientX: 0,
          clientY: 0
        });
      }
    }
    _mouseDown(e) {
      if (e.nativeEvent.button == 2) {
        e.preventDefault();
        const { scrollLeft, scrollTop } = this.mapRef;
        this.setState({
          dragging: true,
          scrollLeft,
          scrollTop,
          clientX: e.clientX,
          clientY: e.clientY
        });
      } else {
        this.setState({
          addMarkerPosition: this.state.addMarkerPosition ? null : this.state.mouseCoords
        });
      }
    }
    _mouseMove(e) {
      if (this.state.dragging) {
        const { clientX, scrollLeft, scrollTop, clientY } = this.state;
        this.mapRef.scrollLeft = scrollLeft - clientX + e.clientX;
        this.mapRef.scrollTop = scrollTop - clientY + e.clientY;
      }
      let origo = this.origo();
      this.setState({
        mouseCoords: {
          x: e.clientX,
          y: e.clientY
        },
        mouseWorldCoords: {
          x:
            parseInt((e.clientX + this.mapRef.scrollLeft - origo.x) / this.props.currentMap.scale) *
            this.props.currentMap.invert.x,
          y:
            parseInt((e.clientY + this.mapRef.scrollTop - origo.y) / this.props.currentMap.scale) *
            this.props.currentMap.invert.y
        }
      });
    }
    pointToScreen(point, origo) {
      return {
        x: point.x * this.props.currentMap.scale * this.props.currentMap.invert.x + origo.x,
        y: point.y * this.props.currentMap.scale * this.props.currentMap.invert.y + origo.y
      };
    }
    origo() {
      let maxX =
        _.maxBy(this.props.currentMap.items, s => {
          return Math.abs(s.x);
        }) || this.state.windowSize.width / 2;
      let maxY =
        _.maxBy(this.props.currentMap.items, s => {
          return Math.abs(s.y);
        }) || this.state.windowSize.height / 2;

      let origo = {
        x: parseInt(Math.abs(maxX.x) * this.props.currentMap.scale),
        y: parseInt(Math.abs(maxY.y) * this.props.currentMap.scale)
      };
      if (origo.y * 2 + 10 < this.state.windowSize.height) {
        origo.y = origo.y + (this.state.windowSize.height - origo.y * 2) / 2;
      }
      if (origo.x * 2 + 10 < this.state.windowSize.width) {
        origo.x = origo.x + (this.state.windowSize.width - origo.x * 2) / 2;
      }
      return origo;
    }
    renderAddItemWindow() {
      if (this.state.addMarkerPosition) {
        let style = {
          position: 'absolute',
          left: this.state.addMarkerPosition.x - 8,
          top: this.state.addMarkerPosition.y - 8
        };
        return [
          <div key='marker' className='map-item-icon' style={style}>
            <Icon name='bullseye' color='red' />
          </div>,
          <AddItemWindow
            key='window'
            newItemPosition={this.state.mouseWorldCoords}
            mapObjects={this.props.mapObjects}
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
    render() {
      let origo = this.origo();
      return [
        <div
          key='map'
          className='map-container'
          onMouseDown={e => this._mouseDown(e)}
          onMouseUp={e => this._mouseUp(e)}
          onMouseMove={e => this._mouseMove(e)}
          onMouseLeave={e => this._mouseUp(e)}
          onWheel={e => this._mouseWheel(e)}
          ref={mapRef => {
            this.mapRef = mapRef;
          }}
        >
          <MapOverlay
            origo={origo}
            invert={this.props.currentMap.invert}
            scale={this.props.currentMap.scale}
          />

          {this.props.currentMap.items.map((i, index) => {
            let position = this.pointToScreen({ x: i.x, y: i.y }, origo);
            return (
              <MapItem
                key={index}
                item={i}
                position={position}
                onRemove={i => MapActions.removeItem(i)}
              />
            );
          })}
        </div>,
        <MapInformation key='info' {...this.props} {...this.state} origo={origo} />,
        this.renderAddItemWindow()
      ];
    }
  }
);
