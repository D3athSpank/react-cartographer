import alt from '../utils/alt';

class UserActions {
  constructor() {
    this.generateActions('deleteMap', 'createMap', 'loadMaps', 'loadMap', 'setScale', 'addItem', 'removeItem');
  }
}
export default alt.createActions(UserActions);
