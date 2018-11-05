var express = require('express');
var path = require('path');
var lodash = require('lodash');
var pg = require('pg');

var app = express();

var Subscriptions = require('./subscriptions.js');
var Client = require('./client.js');

const { Pool }= require('pg')
const pool = new Pool()

var subscriptions = new Subscriptions();

const USER_ID = '588dd912ee64490008d2e406'
const ACCOUNT_ID = '4f0defc321ae530001000002'

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

const METRICS_DEFINITION = {
  'metrics': {
    'live-calls': {
      'name': 'Live Calls',
      'query': 'SELECT 1',
      'filters': [
        {
          'name': 'ring_group',
          'filter_query': "ring_group = '$ring_group'",
          'inputs': ['ring_group']
        },
        {
          'name': 'team',
          'filter_query': "team_id = '$team_id'",
          'inputs': ['team_id']
        }
      ],
      'filter-validation': [
        {
          'filter': 'ring_group',
          'queries': ['ring_group_permission_validation'],
        }
      ]
    },
    'live-users': {
      'name': 'Live Users',
      'query': 'SELECT 1',
      'filters': [
        {
          'name': 'ring_group',
          'filter_query': "ring_group = '$ring_group'",
          'inputs': ['ring_group']
        },
        {
          'name': 'team',
          'filter_query': "team_id = '$team_id'",
          'inputs': ['team_id']
        }
      ],
      'filter-validation': [
        {
          'filter': 'ring_group',
          'queries': ['ring_group_permission_validation'],
        }
      ]
    }
  },
  'validation-queries': {
    'ring_group_permission_validation': {
      'description': 'Check existing ring group for user scope',
      'query': "SELECT CASE WHEN json_extract_path_text(permissions_profile, 'dashboard', 'areas', 'metrics', 'scope') = NULL THEN users.tags LIKE '%\"$value\"%' ELSE accounts.ring_groups LIKE '%\"name\":\"$value\"%' END result FROM mongo_general_talkdesk_production_general.users JOIN mongo_general_talkdesk_production_general.accounts on users.account_id = accounts._id WHERE users.account_id = '$account_id' AND users._id = '$user_id'",
      'error-message': 'A value set for ring group filtering is non existing or not visible by the current user.'
    }
  }

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

const processRequest = (metric, filters, accountId, userId, response, client) => {

  const queriesToRun = lodash.flattenDeep( filters.map((filter) => {
    const validation = METRICS_DEFINITION['metrics'][metric]['filter-validation']
      .find((v) => v['filter'] === filter.type) || []

    return filter.values.map((value) => {
      return validation.length === 0 ? [] : validation['queries'].map((query) => {
        return {
          query: METRICS_DEFINITION['validation-queries'][query].query
            .replace(/\$value/g, value)
            .replace(/\$account_id/g, accountId)
            .replace(/\$user_id/g, userId),
          errorDescription: METRICS_DEFINITION['validation-queries'][query]['error-message']
        }
      })
    })
  }))

  var errorMessage;

  const queryPromises = queriesToRun.map((queryObj) =>
    pool.query(queryObj.query)
      .then(val => {
        return {
          success: val.rows[0].result,
          errorDescription: queryObj.errorDescription
        }
      })
  )

  return Promise.all(queryPromises).then((results) => {
    const result = results.find(result => !result.success)

    const statusCode = result ? 500 : 200
    const errorDescription = result && result.errorDescription

    if (!result)
      subscriptions.subscribe(metric, client);

    doResponse(response, statusCode, errorDescription)
  })
}

const doResponse = (res, httpCode, errorDescription) => {
  res.writeHead(httpCode, {
    'Content-Type': 'text/event-stream', // <- Important headers
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    ...(errorDescription && { 'Error-Description': errorDescription }),
  });
  res.end();
}

app.post('/subscribe/:metric', function (req, res) {
  req.socket.setTimeout(Number.MAX_VALUE);

  const accountId = req.headers['x-account-id']
  const userId = req.headers['x-user-id']

  var client = new Client(res);
  let metric = req.params.metric;

  let body = '';
  req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
  });

  req.on('end', () => {
    let filters = JSON.parse(body).filters;

    processRequest(metric, filters, accountId, userId, res, client)
  });

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
  res.send("Submitted metric to " + clients.length + " clients");
});

app.listen(process.env.PORT || 8080, '0.0.0.0');
