"use strict";

var webSocketServer = require('websocket').server;
var http = require('http');

var webSocketsServerPort = 1337;
var server = http.createServer(function(request, response) {});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port "
        + webSocketsServerPort);
});
var wsServer = new webSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin '
        + request.origin + '.');
    var connection = request.accept(null, request.origin); 
    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {
      connection.sendUTF(`Recebi sua mensagem enviada de ${request.origin}` );
      var object = JSON.parse(message.utf8Data);
      if(object.method === 'transactionCreate') {
        var transaction = {'transaction' : 'E1895D681616D4E884411FB1D3CE205E'};
        connection.sendUTF(JSON.stringify(transaction));
      }
    });

    connection.on('close', function(connection) {
      console.log((new Date()) + " Peer "
            + connection.remoteAddress + " disconnected.");
    });
});
