var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 8080;

http.listen(port);

app.use('/',express.static('./sources'));

app.get('/', function (req, res) {
    res.sendFile(__dirname +'/sources/index.html');
});

io.on('connection', function (socket) {
    socket.on('stream', function (chunk) {
        socket.broadcast.emit('stream',chunk);
    });
});
