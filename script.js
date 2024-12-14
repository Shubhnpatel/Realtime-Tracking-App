const socket = io(); // Establish a WebSocket connection with the server using Socket.IO.

// Check if the browser supports geolocation.
if (navigator.geolocation) {
  // Continuously watch the user's geolocation and send updates to the server.
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords; // Extract latitude and longitude from the position object.
      socket.emit("send-location", { latitude, longitude }); // Emit the user's location to the server via the "send-location" event.
    },
    (error) => {
      console.error(error); // Log any errors encountered while trying to fetch geolocation.
    },
    {
      enableHighAccuracy: true, // Request high accuracy for geolocation (e.g., GPS).
      timeout: 5000, // Timeout after 5 seconds if geolocation is not obtained.
      maximumAge: 0, // Ensure fresh location data is always retrieved (no caching).
    }
  );
}

// Initialize a Leaflet map with a default view at coordinates [0, 0] and zoom level 10.
const map = L.map("map").setView([0, 0], 10);

// Add a tile layer to the map using OpenStreetMap tiles.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "openstreetmap", // Credit OpenStreetMap for the tile data.
}).addTo(map);

// Object to keep track of markers for each connected user, identified by their socket ID.
const markers = {};

// Listen for the "receive-location" event from the server when a user's location is updated.
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data; // Extract user ID and location data from the event payload.

  // Center the map view to the latest location with a zoom level of 16.
  map.setView([latitude, longitude], 16);

  // Check if a marker already exists for the user.
  if (markers[id]) {
    // If the marker exists, update its position.
    markers[id].setLatLng([latitude, longitude]);
  } else {
    // If no marker exists, create a new one and add it to the map.
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

// Listen for the "user-disconnected" event to remove the marker of a disconnected user.
socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    // Remove the marker from the map.
    map.removeLayer(markers[id]);

    // Delete the marker from the `markers` object.
    delete markers[id];
  }
});
