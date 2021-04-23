
function initmap(){
  var map = L.map('map-template');

  const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  
  const tile = L.tileLayer(tileURL);
  
  map.locate({enableHighAccuracy: true})
  map.on('locationfound', (e) => {
    const coords = [e.latlng.lat, e.latlng.lng];
    return coords;
  });  
};

module.exports = {
  initmap
};

