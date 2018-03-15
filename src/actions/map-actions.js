import alt from '../utils/alt';

class UserActions {
  constructor() {
    this.generateActions('importMap', 'toggleVisited', 'deleteMap', 'createMap', 'loadMaps', 'loadMap', 'setScale', 'addItem', 'removeItem');
  }
}
export default alt.createActions(UserActions);
