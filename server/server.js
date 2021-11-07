const express = require("express");
const app=express();
const server=require('http').createServer(app);
const WebSocket=require('ws');
const path = require('path');

const port = process.env.PORT || 8080;
const host = process.env.HOST || "::";

// We are using the express server as a server for wss
const wss = new WebSocket.Server({ server: server });


// Renders the page
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname, '../index.html'));
});


// WSS code
wss.on('connection',(ws)=> {
	console.log("New client just connected!");
});

app.listen(port, host, () =>
  console.log(`\nServer runing on port ${port} at http://localhost:${port}`)
);

