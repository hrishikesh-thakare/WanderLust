console.log("✓ Geocode.js loaded");

// Wait for Leaflet to be available
if (typeof L === "undefined") {
  console.log("⏳ Waiting for Leaflet to load...");
  window.addEventListener("DOMContentLoaded", initGeocoding);
} else {
  initGeocoding();
}

function initGeocoding() {
  console.log("✓ Leaflet loaded, initializing geocoding");

  // Get the location input field
  const locationInput = document.getElementById("location");
  const coordinatesInput = document.getElementById("coordinates");
  const listingForm = document.getElementById("listing-form");

  // Check if elements exist
  console.log("Location input found:", !!locationInput);
  console.log("Coordinates input found:", !!coordinatesInput);

  // Add geocoding functionality
  const geocoder = L.Control.Geocoder.nominatim();

  // Function to geocode address
  function geocodeAddress(address, callback) {
    geocoder.geocode(address, function (results) {
      console.log("Geocoding results:", results);

      if (results && results.length > 0) {
        const result = results[0];
        const latlng = result.center;

        // Store coordinates in hidden field
        coordinatesInput.value = `${latlng.lng},${latlng.lat}`;

        console.log("✅ Geocoded successfully!");
        console.log("Address:", result.name);
        console.log("Latitude:", latlng.lat);
        console.log("Longitude:", latlng.lng);
        console.log("Coordinates [lng, lat]:", [latlng.lng, latlng.lat]);
        console.log("Stored in hidden field:", coordinatesInput.value);

        if (callback) callback(true);
      } else {
        console.log("❌ Location not found");
        coordinatesInput.value = "";

        if (callback) callback(false);
      }
    });
  }

  // Listen for location input changes (optional - for immediate feedback)
  locationInput.addEventListener("blur", function () {
    const address = this.value.trim();
    console.log("Address entered:", address);

    if (address) {
      geocodeAddress(address);
    }
  });

  // Geocode before form submission
  listingForm.addEventListener("submit", function (e) {
    const address = locationInput.value.trim();

    // If coordinates are already filled (user pressed Tab), submit directly
    if (coordinatesInput.value && coordinatesInput.value !== "") {
      console.log("✓ Coordinates already geocoded, submitting form");
      return true;
    }

    // If location exists but not geocoded yet, geocode first
    if (address) {
      e.preventDefault(); // Stop form submission
      console.log("⏳ Geocoding before submission...");

      geocodeAddress(address, function (success) {
        if (success) {
          console.log("✓ Geocoding complete, submitting form");
          // Submit form after geocoding
          listingForm.submit();
        } else {
          console.log(
            "⚠️ Geocoding failed, submitting with default coordinates"
          );
          // Submit anyway with empty coordinates (will use defaults)
          listingForm.submit();
        }
      });
    }
  });

  // Optional: Trigger on Enter key
  locationInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.blur(); // Trigger the blur event
    }
  });

  console.log("✓ Event listeners attached");
}
