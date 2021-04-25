// add map into dom
var map = L.map("map").setView([40.7306, -73.9352], 13);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoic2VhbnlhcCIsImEiOiJja253cHNjeDUwdHNuMm9zN3JpdW5pMjh1In0.tPRrVItbczIscL75Q50Hfw",
  }
).addTo(map);

// L.marker([40.7306, -73.9352])
//   .addTo(map)
//   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
//   .openPopup();

// loop through all the resources box and add event listeners
for (idx = 1; idx < 9; idx++) {
  document.getElementById(`resource${idx}`).addEventListener("change", (e) => {
    // check if checkbox is checked
    if (e.target.checked) {
      // console.log(e.path[1].id);
      // pass in the id
      displayMarkers(e.path[1].id);
    } else {
      removeMarkers(e.path[1].id);
    }
  });
}

var markers = {}; // an obj that maps a specific resource to an array

function displayMarkers(id) {
  if (!markers[id]) loadJSON(id);
}

function removeMarkers(id) {
  markers[id].forEach((item) => {
    map.removeLayer(item);
  });
  // remove prop from markers
  delete markers[id];
}

// load data from a specific json using input id
function loadJSON(id) {
  fetch(`./data/${id}.json`)
    .then((response) => response.json())
    .then((json) => {
      markers[id] = [];
      // display markers
      for (obj of json) {
        var marker = new L.marker([obj.lat, obj.lng]);
        map.addLayer(marker);

        markers[id].push(marker);
      }
    });
}
