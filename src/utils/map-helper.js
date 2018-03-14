export default class MapHelper {
  static pointToMapCoords(point, scale, mapWidth, mapHeight) {
    return {
      x: parseInt((point.x - mapWidth * 0.5) / scale),
      y: parseInt((point.y - mapHeight * 0.5) / scale)
    };
  }
}
