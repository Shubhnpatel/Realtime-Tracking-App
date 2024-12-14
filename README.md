# Real-Time Tracking App

This is a real-time location tracking app built using **Node.js**, **Express**, **Socket.IO**, and **Leaflet.js**. The app tracks and displays the real-time location of users on a map using the geolocation API and Socket.IO for communication between the client and server.

## Features
- Real-time location tracking using the browser's geolocation API.
- Real-time communication between users using WebSockets via Socket.IO.
- Dynamic display of user locations on a map using Leaflet.js.
- Automatically updates the location of users on the map as they move.
- Removes user markers when a user disconnects.

## Tech Stack
- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: HTML, EJS, Leaflet.js, JavaScript
- **Geolocation**: Browser's Geolocation API
- **Map**: OpenStreetMap with Leaflet.js

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Steps to Run the Application
1. **Clone the repository**:
   ```bash
   https://github.com/Shubhnpatel/Realtime-Tracking-App.git
   cd real-time-tracking-app
Install dependencies: Install the required dependencies using npm:

npm install
Start the server: Run the server using:

node server.js
The server will start on port 4000.

Access the application: Open your browser and go to http://localhost:4000 to see the real-time tracking map.

How It Works
Backend (Server Side)
The backend is built with Node.js and Express.
Socket.IO is used for establishing a WebSocket connection with the client for real-time communication.
When a user shares their location, the backend receives the coordinates and broadcasts them to all connected clients.
If a user disconnects, their marker is removed from all clients.
Frontend (Client Side)
The frontend uses Leaflet.js to display the map.
The navigator.geolocation.watchPosition API is used to track the user's location continuously.
The client emits the user's location to the server using Socket.IO.
When the server broadcasts the updated location, the client updates the marker position or adds a new marker if it's a new user.
Key Features
Real-time Location Tracking: The app allows multiple users to share their location in real time.
Dynamic Markers: User locations are displayed as markers on the map, and these markers are updated in real time.
User Disconnection Handling: When a user disconnects, their marker is removed from all users' maps.
