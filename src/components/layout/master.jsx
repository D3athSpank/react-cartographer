import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import connectToStores from 'alt-utils/lib/connectToStores';
import './layout.css';

import MapLibrary from '../map-library';
import CartoMap from '../map';
import StartView from './start-view';
import MapStore from '../../stores/map-store';
import MapActions from '../../actions/map-actions';

export default connectToStores(
  class Master extends Component {
    static getStores() {
      return [MapStore];
    }

    static getPropsFromStores() {
      return MapStore.getState();
    }
    componentDidMount() {
      setTimeout(() => MapActions.loadMaps(), 100);
    }
    render() {
      return (
        <div className='app-master-container'>
          <Switch>
            <Route
              exact
              path='/'
              render={props => {
                return <StartView {...this.props} />;
              }}
            />
            <Route
              exact
              path='/maps'
              render={props => {
                return <MapLibrary {...this.props} />;
              }}
            />
            <Route
              path='/map/:mapId'
              render={props => {
                return <CartoMap {...this.props} />;
              }}
            />
          </Switch>
        </div>
      );
    }
  }
);
