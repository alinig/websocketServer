"use strict";

const webSocketServer = require('websocket').server;
const http = require('http');
const helmet = require('helmet');
const expressApp = require('express')();
const cspHeaders = require('./csp-headers.json');

const webSocketsServerPort = 1337;

expressApp.use(
	helmet({
		contentSecurityPolicy: {
			directives: cspHeaders,
			browserSniff: false
		},
		dnsPrefetchControl: false,
		expectCt: 'enforce',
		frameguard: true,
		hidePoweredBy: true,
		hpkp: false,
		hsts: true,
		ieNoOpen: true,
		noCache: false,
		noSniff: true,
		referrerPolicy: false,
		xssFilter: true
	})
);


const server = http.createServer(expressApp);

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
