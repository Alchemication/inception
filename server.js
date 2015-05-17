/* global require, process, __dirname */

// set up ======================================================================
var express        = require('express');
var port  	       = process.env.PORT || 3001; 				// set the port
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var morgan         = require('morgan');
var app            = require('express')();
var http           = require('http').Server(app);
var io             = require('socket.io')(http);
var _              = require('underscore');

// configure app
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// sockets =====================================================================

io.on('connection', function (socket) {

    var clientId = socket.id;
    console.log('Client connected, id: ' + clientId);

});

// routes ======================================================================

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + "/public/index.html"); // load view
});

// listen (start app with node server.js) ======================================
http.listen(port, function() {
    console.log('listening on *:' + port);
});
