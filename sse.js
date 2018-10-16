var express = require('express');
var path = require('path');
var app = express();

var Subscriptions = require('./subscriptions.js');
var Client = require('./client.js');

var subscriptions = new Subscriptions();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "sse.html" ));
});

app.get('/subscribe/:metric', function (req, res) {
	req.socket.setTimeout(Number.MAX_VALUE);
	res.writeHead(200, {
		'Content-Type': 'text/event-stream', // <- Important headers
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
  res.write('\n');
  
  var client = new Client(res);
  let metric = req.params.metric;
  subscriptions.subscribe(metric, client);
  req.on("close", function() {
    console.log("Client " + client.id + " disconnected");
    subscriptions.unsubscribe(metric, client);
  });
});

app.post("/push/:metric/:value", function(req, res) {
  let metric = req.params.metric;
  let value = req.params.value;
  let clients = subscriptions.subscribers(metric);
  clients.forEach(client => {
    client.conn.write("data:" + value + "\n\n");
  });
  res.send("Submited metric to " + clients.length + " clients");
});

app.listen(8080);