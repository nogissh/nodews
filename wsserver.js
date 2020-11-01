/**
 * Websocket server sample.
 */
const WebSocket = require('ws');
const ws = require('ws');

function verify(ws) {
  return ws.protocol === 'token';
}

const wsserver = new ws.Server({
  port: 5001,
});

wsserver.on('connection', function (ws) {
  if (!verify(ws)) {
    ws.close();
  }

  ws.on('message', function (message) {
    console.log(message);

    if (message === 'close') {
      ws.close();
      return;
    }

    wsserver.clients.forEach(function (client) {
      client.send(message);
    });
  });

  ws.on('close', function () {
    console.log('connection close');
  });
});
