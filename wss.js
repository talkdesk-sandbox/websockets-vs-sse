var express = require('express');
var path = require('path');
var app = express();
var expressWs = require('express-ws')(app);
 
var Subscriptions = require('./subscriptions.js');
var Client = require('./client.js');

var subscriptions = new Subscriptions();

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "wss.html" ));
});

app.post("/push/:metric/:value", function(req, res) {
  let metric = req.params.metric;
  let value = req.params.value;
  let clients = subscriptions.subscribers(metric);
  clients.forEach(client => {
    client.conn.send(value);
  });
  res.send("Submited metric to " + clients.length + " clients");
});
 
app.ws('/', function(ws, req) {
  console.log("New connection");
  var client = new Client(ws);

  ws.on('message', function(msg) {
    let subscription = JSON.parse(msg);
    let metric = subscription.metric;
    subscriptions.subscribe(metric, client);
    console.log("New subscription to " + metric);

    ws.on('close', function close() {
      console.log("Client " + client.id + " disconnected");
      subscriptions.unsubscribe(metric, client);
    });
    
  });
});
 
app.listen(process.env.PORT || 8081, '0.0.0.0');