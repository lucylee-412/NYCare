var map = L.map("map").setView([40.7306, -73.9352], 13);

// access token pk.eyJ1Ijoic2VhbnlhcCIsImEiOiJja253cHNjeDUwdHNuMm9zN3JpdW5pMjh1In0.tPRrVItbczIscL75Q50Hfw

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

L.marker([40.7306, -73.9352])
  .addTo(map)
  .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  .openPopup();

document.getElementById("resource1").addEventListener("click", displayMarker);
document.getElementById("resource2").addEventListener("click", displayMarker);
document.getElementById("resource3").addEventListener("click", displayMarker);
document.getElementById("resource4").addEventListener("click", displayMarker);
document.getElementById("resource5").addEventListener("click", displayMarker);
document.getElementById("resource6").addEventListener("click", displayMarker);
document.getElementById("resource7").addEventListener("click", displayMarker);
document.getElementById("resource8").addEventListener("click", displayMarker);

function displayMarker() {
}
