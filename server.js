"use strict";

const helmet = require('helmet');
const expressApp = require('express')();
const expressWs = require('express-ws')(expressApp);
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

expressApp.listen(webSocketsServerPort);

expressApp.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
      var object = JSON.parse(msg);
      if(object.method === 'transactionCreate') {
        var transaction = {'transaction' : 'E1895D681616D4E884411FB1D3CE205E'};
        ws.send(JSON.stringify(transaction));
      }
  });
  //console.log('socket', req);
});
 

