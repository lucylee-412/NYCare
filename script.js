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

var colors = {
  clothing_charities:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  food_pantries:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  food_scraps:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  homeless_shelters:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  senior_centers:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  snap_centers:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  soup_kitchens:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  volunteer:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
};

// load data from a specific json using input id
function loadJSON(id) {
  fetch(`./data/${id}.json`)
    .then((response) => response.json())
    .then((json) => {
      markers[id] = [];
      var icon = new L.Icon({
        iconUrl: `${colors[id]}`,
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      // display markers
      for (obj of json) {
        var marker = new L.marker([obj.lat, obj.lng], { icon: icon });
        marker
          .bindPopup(
            `<div class="info-name">${obj["Name"]}</div>
             <div class="info"><strong style="color:#555;">Address:</strong> ${obj["Address"]}, ${obj["Borough"]}, ${obj["Zip Code"]}</div>
             <div class="info"><strong style="color:#555;">Phone Number:</strong> ${obj["Phone Number"]}</div>
            `
          )
          .openPopup();
        map.addLayer(marker);

        markers[id].push(marker);
      }
    });
}

const submitForm = () => {
  const zip = document.getElementById("zipcode").value;
  const url = `https://thezipcodes.com/api/v1/search?zipCode=${zip}&countryCode=US&apiKey=f79320cb90ef3cfb0a1c4de0f92ad554`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.location === undefined || json.location == 0) {
        alert("Invalid zipcode!");
      } else if (!json.success) {
        alert("Zipcode lookup failed!");
      }
      map.setView([json.location[0].latitude, json.location[0].longitude], 14);
    });
};
