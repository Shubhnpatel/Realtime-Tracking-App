const express = require("express"); // Import the Express framework for creating a web server.
const app = express(); // Create an Express application.

const http = require("http"); // Import the HTTP module to create a server.
const path = require("path"); // Import the Path module to handle and manipulate file paths.

const socketio = require("socket.io"); // Import Socket.IO for real-time bidirectional communication.

const server = http.createServer(app); // Create an HTTP server using the Express app.

const io = socketio(server); // Initialize a new instance of Socket.IO by passing the server.

// Set the view engine for the app to EJS (Embedded JavaScript templates) for rendering dynamic HTML.
app.set("view engine", "ejs");

// Serve static files (e.g., CSS, JavaScript, images) from the "public" directory.
app.use(express.static(path.join(__dirname, "public")));

// Listen for new client connections via Socket.IO.
io.on("connection", function (socket) {
    // Event listener for "send-location" event sent by clients.
    socket.on("send-location", function (data) {
        // Broadcast the received location data to all connected clients, including the sender.
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Event listener for client disconnection.
    socket.on("disconnect", function () {
        // Notify all connected clients that a user has disconnected, using the socket ID.
        io.emit("user-disconnected", socket.id);
    });

    console.log("connected"); // Log a message to the server console when a new client connects.
});

// Define a route for the root URL ("/") that renders the "index" EJS view.
app.get('/', function (req, res) {
    res.render("index");
});

// Start the server on port 4000 and log a confirmation message.
server.listen(4000, () => {
    console.log("server started successfully");
});
