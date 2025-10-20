const map = L.map("map").setView([19.2403, 73.1305], 12); // center on your location

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([19.2403, 73.1305])
  .addTo(map)
  .bindPopup("<b>Listing Location</b>")
  .openPopup();
