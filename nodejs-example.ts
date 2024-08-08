// Importing necessary modules from the Node.js standard library
import http from "http";

// Define the port number where the server will listen
const PORT = 3000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response header to indicate content type
  res.writeHead(200, { "Content-Type": "text/plain" });
  // Send a response to the client
  res.end("Hello, Node.js with TypeScript!");
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
