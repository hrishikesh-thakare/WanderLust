console.log("✓ showMap.js loaded");

// Wait for Leaflet to be available
if (typeof L === "undefined") {
  console.log("⏳ Waiting for Leaflet to load for map...");
  window.addEventListener("load", initMap);
} else {
  initMap();
}

function initMap() {
  console.log("✓ Leaflet loaded, initializing map");

  // Get map element
  const mapDiv = document.getElementById("map");

  if (!mapDiv) {
    console.error("Map div not found");
    return;
  }

  // Get data from data attributes
  const lat = parseFloat(mapDiv.dataset.lat);
  const lng = parseFloat(mapDiv.dataset.lng);
  const location = mapDiv.dataset.location;
  const title = mapDiv.dataset.title;

  console.log("Coordinates:", [lat, lng]);

  // Initialize the map
  const map = L.map("map").setView([lat, lng], 13);

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Add marker
  const marker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>${title}</b><br>${location}`)
    .openPopup();

  console.log("✓ Map loaded successfully!");
}
