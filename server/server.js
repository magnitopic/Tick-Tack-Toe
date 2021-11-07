const express = require('express')
const WebSocket = require('ws');
const path = require('path');

const app = express()
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server:server });
const port = process.env.PORT || 8080;

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    
  });
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
})

server.listen(port, () => console.log(`Lisening on  http://localhost:${port}`))