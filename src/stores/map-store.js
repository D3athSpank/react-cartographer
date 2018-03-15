import alt from '../utils/alt';
import MapActions from '../actions/map-actions';
class MapStore {
  constructor() {
    this.state = {
      currentMap: { scale: 1, items: [], name: '' },
      maps: [],
      mapItems: [
        { value: 'pod', text: 'Pod' },
        { value: 'wreck', text: 'Wreck' },
        { value: 'base', text: 'Base' },
        { value: 'cave', text: 'Cave' },
        { value: 'poi', text: 'POI' },
        { value: 'resource', text: 'Resource' }
      ]
    };
    this.bindActions(MapActions);
  }
  onCreateMap(name) {
    let maps = this.state.maps;
    maps.push({
      name: name,
      items: [],
      scale: 0.5
    });
    localStorage.setItem('maps', JSON.stringify(maps));
    this.onLoadMaps();
  }
  onDeleteMap(name) {
    let maps = this.state.maps;
    let mapIndex = maps.findIndex(m => {
      return m.name === name;
    });
    maps.splice(mapIndex, 1);
    localStorage.setItem('maps', JSON.stringify(maps));
    this.onLoadMaps();
  }
  onLoadMaps() {
    let maps = JSON.parse(localStorage.getItem('maps')) || []; //string list
    this.setState({
      maps: maps
    });
  }
  onLoadMap(name) {
    this.onLoadMaps();
    let loadedMap = this.state.maps.find(m => {
      return m.name === name;
    });
    this.setState({ currentMap: loadedMap });
  }

  onAddItem(item) {
    item.x = parseInt(item.x);
    item.y = parseInt(item.y);
    let currentItems = this.state.currentMap.items.slice();
    currentItems.push(item);
    let modified = { ...this.state.currentMap, items: currentItems };
    this.save(modified);
  }
  onRemoveItem(item) {
    let currentItems = this.state.currentMap.items.slice();
    let index = currentItems.findIndex(o => {
      return o.x === item.x && o.y === item.y;
    });
    currentItems.splice(index, 1);
    let modified = { ...this.state.currentMap, items: currentItems };
    this.save(modified);
  }
  onSetScale(scale) {
    scale = parseFloat(scale);
    scale = Math.round(scale * 100) / 100;
    if (scale < 0.02) {
      scale = 0.02;
    }
    if (scale > 5) {
      scale = 5;
    }
    let modified = { ...this.state.currentMap, scale: scale };
    this.save(modified);
  }
  onToggleVisited({ x, y }) {
    let currentItems = this.state.currentMap.items.slice();
    let index = currentItems.findIndex(o => {
      return o.x === x && o.y === y;
    });
    currentItems[index].visited = !currentItems[index].visited;
    let modified = { ...this.state.currentMap, items: currentItems };
    this.save(modified);
  }
  onImportMap(mapToImport) {
    debugger;
    let current = this.state.maps.slice();
    current.push(mapToImport);
    this.setState({
      maps: current
    });
    localStorage.setItem('maps', JSON.stringify(current));
  }
  save(modified) {
    let currentName = this.state.currentMap.name;
    let index = this.state.maps.findIndex(m => {
      return m.name === currentName;
    });
    let maps = [...this.state.maps];
    maps[index] = modified;
    this.setState({
      maps: maps,
      currentMap: { ...modified }
    });
    localStorage.setItem('maps', JSON.stringify(maps));
  }
}
export default alt.createStore(MapStore, 'MapStore');
