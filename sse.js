var express = require('express');
var path = require('path');
var app = express();

var Subscriptions = require('./subscriptions.js');
var Client = require('./client.js');

var subscriptions = new Subscriptions();

const DASHBOARD_LAYOUTS = {
  "lg": [
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "1",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 3,
      "y": 0,
      "i": "2",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 6,
      "y": 0,
      "i": "3",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 9,
      "y": 0,
      "i": "4",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 6,
      "h": 4,
      "x": 0,
      "y": 2,
      "i": "5",
      "minW": 6,
      "minH": 5,
      "moved": false,
      "static": true
    },
    {
      "w": 6,
      "h": 4,
      "x": 6,
      "y": 2,
      "i": "6",
      "minW": 6,
      "minH": 5,
      "moved": false,
      "static": true
    }
  ],
  "md": [
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "1",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 3,
      "y": 0,
      "i": "2",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 2,
      "i": "3",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 3,
      "y": 2,
      "i": "4",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 6,
      "h": 4,
      "x": 0,
      "y": 4,
      "i": "5",
      "minW": 6,
      "minH": 4,
      "moved": false,
      "static": true
    },
    {
      "w": 6,
      "h": 4,
      "x": 0,
      "y": 8,
      "i": "6",
      "minW": 6,
      "minH": 4,
      "moved": false,
      "static": true
    }
  ],
  "sm": [
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "1",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 3,
      "y": 0,
      "i": "2",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 2,
      "i": "3",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 3,
      "y": 2,
      "i": "4",
      "minW": 3,
      "minH": 3,
      "moved": false,
      "static": true
    },
    {
      "w": 6,
      "h": 4,
      "x": 0,
      "y": 4,
      "i": "5",
      "minW": 6,
      "minH": 4,
      "moved": false,
      "static": true
    },
    {
      "w": 6,
      "h": 4,
      "x": 0,
      "y": 8,
      "i": "6",
      "minW": 6,
      "minH": 4,
      "moved": false,
      "static": true
    }
  ],
  "xs": [
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "1",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 2,
      "i": "2",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 4,
      "i": "3",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 6,
      "i": "4",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 8,
      "i": "5",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 10,
      "i": "6",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    }
  ],
  "xxs": [
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 0,
      "i": "1",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 2,
      "i": "2",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 4,
      "i": "3",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 6,
      "i": "4",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 8,
      "i": "5",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    },
    {
      "w": 3,
      "h": 2,
      "x": 0,
      "y": 10,
      "i": "6",
      "minW": 3,
      "minH": 2,
      "moved": false,
      "static": true
    }
  ]
}

const DASHBOARDS = {
  'a-dashboard': { id: 'a-dashboard', name: 'A dashboard' },
  'another-dashboard': { id: 'another-dashboard', name: 'Another dashboard' }
}

const DASHBOARD_DEFINITIONS = {
  'a-dashboard': {
    widgets: {
      '1': {
        id: '1',
        title: 'Live Calls',
        metric: 'live-calls'
      },
      '2': {
        id: '2',
        title: 'Live Calls',
        metric: 'live-calls'
      },
      '3': {
        id: '3',
        title: 'Live Calls',
        metric: 'live-calls'
      },
      '4': {
        id: '4',
        title: 'Live Calls',
        metric: 'live-calls'
      },
      '5': {
        id: '5',
        title: 'Live Calls',
        metric: 'live-calls'
      },
      '6': {
        id: '6',
        title: 'Live Calls',
        metric: 'live-calls'
      }
    },
    layouts: DASHBOARD_LAYOUTS
  },
  'another-dashboard': {
    widgets: {
      '1': {
        id: '1',
        title: 'Live Users',
        metric: 'live-users'
      },
      '2': {
        id: '2',
        title: 'Live Users',
        metric: 'live-users'
      },
      '3': {
        id: '3',
        title: 'Live Users',
        metric: 'live-users'
      },
      '4': {
        id: '4',
        title: 'Live Users',
        metric: 'live-users'
      },
      '5': {
        id: '5',
        title: 'Live Users',
        metric: 'live-users'
      },
      '6': {
        id: '6',
        title: 'Live Calls',
        metric: 'live-calls'
      }
    },
    layouts: DASHBOARD_LAYOUTS
  }
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "sse.html" ));
});

app.get('/dashboards', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(JSON.stringify(DASHBOARDS))
})

app.get('/dashboards/:dashboardId/definition', function(req, res) {
  const dashboardId = req.params.dashboardId
  const definition = DASHBOARD_DEFINITIONS[dashboardId]

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(JSON.stringify(definition))
})

app.get('/subscribe/:metric', function (req, res) {
	req.socket.setTimeout(Number.MAX_VALUE);
	res.writeHead(200, {
		'Content-Type': 'text/event-stream', // <- Important headers
		'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
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

app.listen(process.env.PORT || 8080, '0.0.0.0');
