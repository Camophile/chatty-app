// server.js

const express = require('express');
// const WebSocketServer = require('ws').Server; // Opens the server object
const WebSocket = require('ws') // Gives us access to the whole WebSocket framework
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const socket_server = new WebSocket.Server({ server });

socket_server.broadcast = function(data) {
  socket_server.clients.forEach((socket) =>{
    if(socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      console.log("broadcasted:", data, "\n");
    }
  });
}

function updateClientCount() {
  socket_server.broadcast({clients_online: socket_server.clients.size});
}

function getRandomColour() {
  const COLOURS = ["red", "tomato", "blue", "green"];
  return COLOURS[Math.floor(Math.random()*COLOURS.length)];
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// Code to handle socket messages - setup callback
// when message received from client
socket_server.on('connection', (socket) => {
 //socket connect to the client
  console.log('Server message: Client Connected\n');
  updateClientCount();

  socket.on('message', (data) => {

    var message = JSON.parse(data); //data is JSON string to be decoded to actual message

    if(message.type === "postMessage") {
      message.id = uuid.v4();
      message.type = "incomingMessage";
      message.colour = socket.colour;
      socket_server.broadcast(message);
    }

    if(message.type === "postNotification"){
       message.type = "incomingNotification";
       socket_server.broadcast(message);
    }
  });

  const newColour = getRandomColour();

  socket.send(JSON.stringify({type: "change_color", colour: newColour}));
  console.log('connection');

  socket.colour = newColour;

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => {
    console.log('Client disconnected')
    updateClientCount();
  });
});