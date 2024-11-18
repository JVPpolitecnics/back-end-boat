const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
    console.log('Client connected');

    // Listen for messages from the client
    socket.on('message', message => {
        const decodedMessage = message.toString('utf-8');
        console.log('Message received from client:', decodedMessage);
        
        // Optional: Broadcast the message to all connected clients
        server.clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(decodedMessage);
            }
        });
    });

    // Handle client disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});
